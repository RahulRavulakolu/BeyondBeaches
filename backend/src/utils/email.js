import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: process.env.SMTP_FROM_NAME,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html, // For HTML formatted emails
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
