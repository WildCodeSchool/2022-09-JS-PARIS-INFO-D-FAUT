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
      from: "info défaut <vieira_wcs@hotmail.com>",
      to: "vieira_wcs@hotmail.com",
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
