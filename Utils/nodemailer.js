"use strict";
const nodemailer = require("nodemailer");
const env = require("dotenv");

env.config();

async function main({ to, subject, text }) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL, // generated ethereal user
      pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "<noreply.journeybuilder@gmail.com>",
    to: to,
    subject: subject,
    text: text,
  });

  // console.log("Message sent: %s", info.messageId);

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = main;
