const jwt = require("jsonwebtoken");
const UserService = require("./userService");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../utils/url");

class AuthService {
  constructor() {}

  generateTokenService = (user) => {
    try {
      const payload = { id: user.id, username: user.username };
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "[AuthService generateTokenService error]:",
          error.message
        );
        throw error;
      } else {
        console.error("[AuthService generateTokenService unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  verifyTokenService = (token) => {
    try {
      const decode = jwt.verify(token, JWT_SECRET);
      if (!decode) {
        throw new Error(`Token is not valid!`);
      }
      return decode;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[AuthService verifyTokenService error]:", error.message);
        throw error;
      } else {
        console.error("[AuthService verifyTokenService unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  loginService = async ({ email, password }) => {
    try {
      if (!email || !password)
        throw new Error("Username/email and password are required");

      let user = await UserService.findUserByUsernameService(email);
      if (!user) {
        user = await UserService.findUserByEmailService(email);
      } else if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await UserService.validatePasswordService(
        user,
        password
      );
      if (!isPasswordValid) throw new Error("Invalid password");

      const token = this.generateTokenService(user);

      return { user, token };
    } catch (error) {
      if (error instanceof Error) {
        console.error("[AuthService loginService error]:", error.message);
        throw error;
      } else {
        console.error("[AuthService loginService unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  logoutService = async () => {
    try {
      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[AuthService logoutService error]:", error.message);
        throw error;
      } else {
        console.error("[AuthService logoutService unknown error]");
        throw new Error("Unknown error");
      }
    }
  };
}

module.exports = new AuthService();
