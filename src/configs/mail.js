const nodemailer =require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "334f18de1f31e0",
      pass: "f16ba1e9945cf3",
    },
  });