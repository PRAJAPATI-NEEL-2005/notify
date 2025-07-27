const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async (to, text) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"App Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset OTP",
    text,
  });
};

module.exports = sendEmail;
