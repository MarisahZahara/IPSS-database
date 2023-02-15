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
    return jwt.sign(payload.toString(), process.env.SECRET_KEY, {
      //   expiresIn: "600s",
    });
  };
  static verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
  };
  static sendOTPEmail = async (OTP, receiver) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL, // generated ethereal user
          pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: "OTP Verification <noreply.journeybuilder@gmail.com>", // sender address
        to: receiver, // list of receivers
        subject: "OTP ✔", // Subject line
        text: `OTP: ${OTP}`, // plain text body
      });
    } catch (error) {
      console.log("error nodemailer", error);
    }
  };
}

module.exports = Utils;
