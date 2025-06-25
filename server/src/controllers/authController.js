const AuthService = require("../services/authService");

class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  loginController = async (req, res) => {
    try {
      const { usernameOrEmail, password } = req.body;
      const { user, token } = await this.authService.loginService({
        usernameOrEmail,
        password,
      });
      res.json({ user, token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  };

  verifyTokenController = (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "Token is required" });

      const decoded = this.authService.verifyTokenService(token);
      res.json({ decoded });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  };

  logoutController = async (req, res) => {
    try {
      await this.authService.logoutService();
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  };
}

module.exports = new AuthController();
