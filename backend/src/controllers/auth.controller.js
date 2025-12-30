import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User.model.js';
import sendEmail from '../utils/email.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const createSendToken = (req, user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  if (req?.session) {
    req.session.userId = user._id.toString();
  }

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const register = catchAsync(async (req, res, next) => {
  try {
    console.log('Registering new user with data:', {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role || 'user'
    });

    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.passwordConfirm) {
      console.error('Missing required fields');
      return next(new AppError('Please provide name, email, password, and password confirmation', 400));
    }

    // Check if passwords match
    if (req.body.password !== req.body.passwordConfirm) {
      console.error('Passwords do not match');
      return next(new AppError('Passwords do not match', 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.error('User already exists with email:', req.body.email);
      return next(new AppError('Email already in use', 400));
    }

    // Create new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role || 'user',
    });

    console.log('User created successfully:', {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role
    });

    // Generate email verification token
    const verificationToken = newUser.getEmailVerificationToken();
    await newUser.save({ validateBeforeSave: false });

    // Create verification URL
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${verificationToken}`;

    // Send welcome email with verification link
    try {
      await sendEmail({
        email: newUser.email,
        subject: 'Verify your email',
        message: `Please verify your email by clicking on the following link: ${verificationUrl}`,
      });

      console.log('Verification email sent to:', newUser.email);
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      // Don't fail the registration if email sending fails
    }

    // Send response
    createSendToken(req, newUser, 201, res);
  } catch (error) {
    console.error('Error in user registration:', error);
    next(error);
  }
});
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) Check if email is verified
  if (!user.isEmailVerified) {
    return next(
      new AppError('Please verify your email before logging in', 401)
    );
  }

  // 4) If everything ok, send token to client
  createSendToken(req, user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  // 1) If session exists, prefer it
  if (req.session?.userId) {
    const currentUser = await User.findById(req.session.userId);
    if (!currentUser) {
      req.session.userId = undefined;
      return next(
        new AppError('Your session is invalid. Please log in again.', 401)
      );
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    return next();
  }

  // 2) Fallback to JWT
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // NOTE: keep existing behavior (if changedPasswordAfter is implemented)
  if (typeof currentUser.changedPasswordAfter === 'function') {
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  return next();
});

// Only for rendered pages, no errors!
export const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(req, user, 200, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.matchPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(req, user, 200, res);
});

export const verifyEmail = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  // 2) If token has not expired, verify the email
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;
  await user.save({ validateBeforeSave: false });

  // 3) Log the user in, send JWT
  createSendToken(req, user, 200, res);
});

export const resendVerificationEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return next(new AppError('Please provide an email address', 400));
  }

  const user = await User.findOne({ email });
  
  if (!user) {
    return next(new AppError('No user found with that email address', 404));
  }

  if (user.isEmailVerified) {
    return next(new AppError('Email is already verified', 400));
  }

  // Generate new verification token
  const verificationToken = user.getEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Create verification URL
  const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${verificationToken}`;

  // Send verification email
  const message = `Welcome to BeyondBeaches! Please verify your email by clicking on this link: \n${verificationUrl}\n\nIf you didn't create an account, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Verify your email address (valid for 24 hours)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Verification email sent! Please check your email.',
    });
  } catch (err) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the verification email. Please try again later.', 500)
    );
  }
});

export const logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie(process.env.SESSION_COOKIE_NAME || 'bb.sid');
    });
  }
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
