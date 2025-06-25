const Checklist = require("../models/checkListModel");
const UserService = require("./userService");

class ChecklistService {
  constructor() {}

  createChecklistService = async ({ type, tiresOk, brakesOk, lightsOk, observations, userId }) => {
    try {
      if (!type || typeof tiresOk !== "boolean" || typeof brakesOk !== "boolean" || typeof lightsOk !== "boolean" || !userId) {
        throw new Error("Missing required fields or invalid data types");
      }

      const user = await UserService.findUserByIdService(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const checklist = await Checklist.create({
        type,
        tiresOk,
        brakesOk,
        lightsOk,
        observations,
        userId,
      });

      return checklist;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[ChecklistService createChecklistService error]:", error.message);
        throw error;
      } else {
        console.error("[ChecklistService createChecklistService unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  findChecklistByIdService = async (id) => {
    try {
      if (!id) throw new Error("Checklist ID is required");

      const checklist = await Checklist.findByPk(id);
      if (!checklist) throw new Error("Checklist not found");

      return checklist;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[ChecklistService findChecklistByIdService error]:", error.message);
        throw error;
      } else {
        console.error("[ChecklistService findChecklistByIdService unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  findAllChecklistsByUserIdService = async (userId) => {
    try {
      if (!userId) throw new Error("User ID is required");

      const checklists = await Checklist.findAll({ where: { userId } });

      return checklists;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[ChecklistService findAllChecklistsByUserIdService error]:", error.message);
        throw error;
      } else {
        console.error("[ChecklistService findAllChecklistsByUserIdService unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  updateChecklistService = async (id, { type, tiresOk, brakesOk, lightsOk, observations }) => {
    try {
      if (!id) throw new Error("Checklist ID is required");

      const checklist = await this.findChecklistByIdService(id);
      if (!checklist) throw new Error("Checklist not found");

      if (type) checklist.type = type;
      if (typeof tiresOk === "boolean") checklist.tiresOk = tiresOk;
      if (typeof brakesOk === "boolean") checklist.brakesOk = brakesOk;
      if (typeof lightsOk === "boolean") checklist.lightsOk = lightsOk;
      if (observations !== undefined) checklist.observations = observations;

      await checklist.save();

      return checklist;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[ChecklistService updateChecklistService error]:", error.message);
        throw error;
      } else {
        console.error("[ChecklistService updateChecklistService unknown error]");
        throw new Error("Unknown error");
      }
    }
  };

  deleteChecklistService = async (id) => {
    try {
      if (!id) throw new Error("Checklist ID is required");

      const checklist = await this.findChecklistByIdService(id);
      if (!checklist) throw new Error("Checklist not found");

      await checklist.destroy();

      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[ChecklistService deleteChecklistService error]:", error.message);
        throw error;
      } else {
        console.error("[ChecklistService deleteChecklistService unknown error]");
        throw new Error("Unknown error");
      }
    }
  };
}

module.exports = new ChecklistService();
