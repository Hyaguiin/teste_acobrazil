const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

class UserService {
  constructor() {}

  encryptPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      if (error instanceof Error) {
        console.error("[UserService encryptPassword error]:", error.message);
        throw error;
      } else {
        console.error("[UserService encryptPassword unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  createUserService = async ({ username, email, password }) => {
    try {
      if (!username || !email || !password) {
        throw new Error("Username, email and password are required");
      }

      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        throw new Error("Username already taken");
      }

      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        throw new Error("Email already in use");
      }

      const passwordHash = await this.encryptPassword(password);

      const user = await User.create({
        username,
        email,
        password: passwordHash,
      });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[UserService createUser error]:", error.message);
        throw error;
      } else {
        console.error("[UserService createUser unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  findUserByUsernameService = async (username) => {
    try {
      if (!username) throw new Error("Username is required");
      return await User.findOne({ where: { username } });
    } catch (error) {
      if (error instanceof Error) {
        console.error("[UserService findUserByUsername error]:", error.message);
        throw error;
      } else {
        console.error("[UserService findUserByUsername unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  findUserByEmailService = async (email) => {
    try {
      if (!email) throw new Error("Email is required");
      return await User.findOne({ where: { email } });
    } catch (error) {
      if (error instanceof Error) {
        console.error("[UserService findUserByEmail error]:", error.message);
        throw error;
      } else {
        console.error("[UserService findUserByEmail unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  findUserByIdService = async (id) => {
    try {
      if (!id) throw new Error("User ID is required");
      return await User.findByPk(id);
    } catch (error) {
      if (error instanceof Error) {
        console.error("[UserService findUserById error]:", error.message);
        throw error;
      } else {
        console.error("[UserService findUserById unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  validatePasswordService = async (user, plainPassword) => {
    try {
      if (!user || !plainPassword)
        throw new Error("User and password are required");
      return await bcrypt.compare(plainPassword, user.password);
    } catch (error) {
      if (error instanceof Error) {
        console.error("[UserService validatePassword error]:", error.message);
        throw error;
      } else {
        console.error("[UserService validatePassword unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  updateUserByIdService = async (id, { username, email, password }) => {
    try {
      if (!id) throw new Error("User ID is required");

      const user = await this.findUserByIdService(id);
      if (!user) throw new Error("User not found");

      if (username && username !== user.username) {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) throw new Error("Username already taken");
        user.username = username;
      }

      if (email && email !== user.email) {
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) throw new Error("Email already in use");
        user.email = email;
      }

      if (password) {
        const passwordHash = await this.encryptPassword(password);
        user.password = passwordHash;
      }

      await user.save();

      return user;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[UserService updateUser error]:", error.message);
        throw error;
      } else {
        console.error("[UserService updateUser unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  deleteUserService = async (id) => {
    try {
      if (!id) throw new Error("User ID is required");

      const user = await this.findUserByIdService(id);
      if (!user) throw new Error("User not found");

      await user.destroy();

      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[UserService deleteUser error]:", error.message);
        throw error;
      } else {
        console.error("[UserService deleteUser unknown error]");
        throw new Error("Unknown error");
      }
    }
  };
}

module.exports = new UserService();
