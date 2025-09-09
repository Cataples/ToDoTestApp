const express = require("express");
const taskRoutes = require("./Routes/taskRoutes");
const tabRoutes = require("./Routes/tagRoutes");
const authRoutes = require("./Routes/authRoutes");
const authMiddleware = require("./Middleweares/authMiddleweare");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use("/tasks", authMiddleware, taskRoutes);
app.use("/tags", authMiddleware, tabRoutes);
app.use("/login", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
