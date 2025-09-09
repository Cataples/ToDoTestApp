const pool = require("../dbconfig");
const Tag = require("../Models/tag");

const tagController = {
  getTags: async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Tags");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  assignTag: async (req, res) => {
    const { taskId, tagId } = req.params;
    try {
      await Tag.assignTag(taskId, tagId);
      res.status(201).json({ taskId, tagId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  removeTag: async (req, res) => {
    const { taskId, tagId } = req.params;
    try {
      await Tag.removeTag(taskId, tagId);
      res.json({ taskId, tagId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  }
};

module.exports = tagController;