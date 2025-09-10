const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id/done", taskController.markDone);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
