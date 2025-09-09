const jwt = require("jsonwebtoken");
const pool = require("../dbconfig");

const SECRET_KEY = "supersecretkey";

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const [rows] = await pool.query(
        "SELECT * FROM Users WHERE username = ?",
        [username]
      );

      const user = rows[0];

      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = { authController, SECRET_KEY };