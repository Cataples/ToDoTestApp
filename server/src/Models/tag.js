const pool = require("../dbconfig");

const TaskTag = {
  assignTag: async (task_id, tag_id) => {
    const [result] = await pool.query(
      "INSERT INTO Task_Tags (task_id, tag_id) VALUES (?, ?)",
      [task_id, tag_id]
    );
    return result;
  },

  removeTag: async (task_id, tag_id) => {
    const [result] = await pool.query(
      "DELETE FROM Task_Tags WHERE task_id = ? AND tag_id = ?",
      [task_id, tag_id]
    );
    return result;
  }
};

module.exports = TaskTag;