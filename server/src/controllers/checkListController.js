const ChecklistService = require('../services/checkListService');

class ChecklistController {
  constructor() {
    this.checklistService = ChecklistService;
  }

  createChecklistController = async (req, res) => {
    try {
      const { type, tiresOk, brakesOk, lightsOk, observations, userId } = req.body;
      const checklist = await this.checklistService.createChecklistService({
        type,
        tiresOk,
        brakesOk,
        lightsOk,
        observations,
        userId,
      });
      res.status(201).json({ message: 'Checklist created successfully', checklist });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  };

  getChecklistByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const checklist = await this.checklistService.findChecklistByIdService(id);
      res.json(checklist);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  };

  getAllChecklistsByUserIdController = async (req, res) => {
    try {
      const { userId } = req.params;
      const checklists = await this.checklistService.findAllChecklistsByUserIdService(userId);
      res.json(checklists);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  };

  updateChecklistController = async (req, res) => {
    try {
      const { id } = req.params;
      const { type, tiresOk, brakesOk, lightsOk, observations } = req.body;
      const updatedChecklist = await this.checklistService.updateChecklistService(id, {
        type,
        tiresOk,
        brakesOk,
        lightsOk,
        observations,
      });
      res.json({ message: 'Checklist updated successfully', updatedChecklist });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  };

  deleteChecklistController = async (req, res) => {
    try {
      const { id } = req.params;
      await this.checklistService.deleteChecklistService(id);
      res.json({ message: 'Checklist deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  };
}

module.exports = new ChecklistController();
