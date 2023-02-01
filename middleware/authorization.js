class Authorization {
  static async employee(req, res, next) {
    try {
      const { currentUser, method, params } = req;
      switch (currentUser.role) {
        case "admin":
          next();
          break;
        case "dp":
        case "pm":
          if (method === "GET") {
            next();
            break;
          } else {
            console.log("masuk sana");
            throw { name: "Forbidden" };
          }
        case "field":
          if (params.id && params.id === currentUser.id && method === "GET") {
            next();
            break;
          }
          throw { name: "Forbidden" };
        default:
          console.log("masuk sini");
          throw { name: "Forbidden" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async project(req, _, next) {
    try {
      // const { currentUser, method } = req;
      // switch (currentUser.role) {
      //   case "admin":
      //     next();
      //     break;
      //   case "dp":
      //   case "pm":
      //     if (method === "GET" || method === "PUT") {
      //       next();
      //       break;
      //     }
      //     throw { name: "Forbidden" };
      //   case "field":
      //     if (method === "GET") {
      //       next();
      //       break;
      //     }
      //     throw { name: "Forbidden" };
      //   default:
      //     throw { name: "Forbidden" };
      // }

      next();
    } catch (error) {
      next(error);
    }
  }

  static async task(req, _, next) {
    try {
      // const { currentUser, method } = req;
      // switch (currentUser.role) {
      //   case "admin":
      //   case "pm":
      //     next();
      //     break;
      //   case "dp":
      //     if (method === "GET") {
      //       next();
      //     }
      //     throw { name: "Forbidden" };
      //   case "field":
      //     if (method === "GET" || method === "PUT") {
      //       next();
      //     }
      //     throw { name: "Forbidden" };
      //   default:
      //     throw { name: "Forbidden" };
      // }
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Authorization;
