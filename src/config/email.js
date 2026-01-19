const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.resolve(".env") });

const transporter = nodemailer.createTransport({
  host: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const envio = async (to, subject, text, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
};

module.exports = envio;
