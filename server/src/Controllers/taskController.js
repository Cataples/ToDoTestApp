const Task = require("../Models/task");
const Tag = require("../Models/tag");

const taskController = {
  getTasks: async (req, res) => {
    try {
      const tasks = await Task.getAll();
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  createTask: async (req, res) => {
    const { task_name, description, tagIds } = req.body;
    try {
      const result = await Task.create(task_name, description);
      const taskId = result.insertId;

      if (tagIds && tagIds.length > 0) {
        for (const tagId of tagIds) {
          await Tag.assignTag(taskId, tagId);
        }
      }

      res.json({ id: taskId, task_name, description, tagIds });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  markDone: async (req, res) => {
    const { id } = req.params;
    const { is_done } = req.body;
    try {
      await Task.markDone(id, is_done);
      res.json({ id, is_done });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await Task.delete(id);
      res.json({ id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  }
};

module.exports = taskController;