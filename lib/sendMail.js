const nodemailer = require("nodemailer");
const sendMail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject,
    text
  })
}

module.exports = sendMail