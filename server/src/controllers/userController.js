const UserService = require("../services/userService");

class UserController {
  constructor() {
    this.userService = UserService;
  }

  createUserController = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await this.userService.createUserService({
        username,
        email,
        password,
      });
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  };

  getUserByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userService.findUserByIdService(id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  };

  getUserByUsernameController = async (req, res) => {
    try {
      const { username } = req.params;
      const user = await this.userService.findUserByUsernameService(username);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  };

  getUserByEmailController = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await this.userService.findUserByEmailService(email);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  };

  updateUserController = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
      const user = await this.userService.updateUserService(id, {
        username,
        email,
        password,
      });
      res.json({ message: "User updated successfully", user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  };

  deleteUserController = async (req, res) => {
    try {
      const { id } = req.params;
      await this.userService.deleteUserService(id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  };
}

module.exports = new UserController();
