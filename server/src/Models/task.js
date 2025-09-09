const pool = require("../dbconfig");

const Task = {
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT t.id, t.task_name, t.description, t.is_done,
             GROUP_CONCAT(tag.text) as tags
      FROM Tasks t
      LEFT JOIN Task_Tags tt ON t.id = tt.task_id
      LEFT JOIN Tags tag ON tt.tag_id = tag.id
      GROUP BY t.id
    `);
    return rows;
  },

  create: async (task_name, description) => {
    const [result] = await pool.query(
      "INSERT INTO Tasks (task_name, description, user_id) VALUES (?, ?, 1)",
      [task_name, description]
    );
    return result;
  },

  markDone: async (id, is_done) => {
    const [result] = await pool.query(
      "UPDATE Tasks SET is_done = ? WHERE id = ?",
      [is_done, id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM Tasks WHERE id = ?", [id]);
    return result;
  }
};

module.exports = Task;