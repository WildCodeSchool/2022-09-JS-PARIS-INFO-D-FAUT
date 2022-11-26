const nodemailer = require("nodemailer");

async function email(req, res) {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    service: " outlook",
    port: 587,
    secure: false,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "info défaut <mchateau3003@gmail.com>",
      to: "mchateau3003@gmail.com",
      subject: "Un nouveau défaut",
      text: "Info défaut",
      html: `<b>Un nouveau défaut à été posté</b>`,
    });
    res.status(200);
  } catch (error) {
    console.warn(error);
  }
}

module.exports = {
  email,
};
