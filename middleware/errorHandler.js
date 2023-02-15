const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "JsonWebTokenError":
      res.status(401).json({ err });
      break;
    case "TokenExpiredError":
      res.status(401).json({ message: "Token Expired" });
      break;
    case "OTPExpiredError":
      res.status(401).json({ message: "OTP Expired" });
      break;
    case "InvalidOTPError":
      res.status(401).json({ message: "Invalid OTP" });
      break;
    case "InvalidAccess":
      res.status(401).json({ message: "Invalid access" });
      break;
    case "LoginError":
      res.status(401).json({ message: "Invalid email or password" });
      break;
    case "EmployeeNotFound":
      res.status(404).json({ message: "Employee not found!" });
      break;
    case "FavNotFound":
      res.status(404).json({ message: "Favorite not found" });
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      // const error = err.errors.map((el) => el.message);
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "EmptyEmail":
      res.status(400).json({ message: "Email is required" });
      break;
    case "EmptyPassword":
      res.status(400).json({ message: "Password is required" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "Unauthorized" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error!" });
      break;
  }
};

module.exports = errorHandler;
