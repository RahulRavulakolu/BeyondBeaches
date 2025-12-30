import User from '../models/User.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// Helper function to filter fields that are allowed to be updated
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-password.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'phone',
    'bio',
    'photo'
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Admin only routes
export const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getGuides = catchAsync(async (req, res, next) => {
  const guides = await User.find({ role: 'guide' }).select('name photo role email');

  res.status(200).json({
    status: 'success',
    results: guides.length,
    data: {
      guides,
    },
  });
});

export const getAgencies = catchAsync(async (req, res, next) => {
  const agencies = await User.find({ role: 'agency' }).select('name photo role email phone');

  res.status(200).json({
    status: 'success',
    results: agencies.length,
    data: {
      agencies,
    },
  });
});

export const uploadUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload a file', 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      photo: req.file.filename,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
