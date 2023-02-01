const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = process.env.BCRYPT_SALT;
const nodemailer = require("nodemailer");

class Utils {
  static createHash = (password) => {
    return bcrypt.hashSync(password, +salt);
  };
  static compareHashWithPlain = (password, hash) => {
    return bcrypt.compareSync(password, hash);
  };
  static createToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {
      //   expiresIn: "600s",
    });
  };
  static verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
  };
  static sendOTPEmail = async (OTP, receiver) => {
    try {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL, // generated ethereal user
          pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: "OTP Verification", // sender address
        to: receiver, // list of receivers
        subject: "OTP ✔", // Subject line
        text: `Hello world? OTP: ${OTP}`, // plain text body
      });

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log("error nodemailer", error);
    }
  };
}

module.exports = Utils;
