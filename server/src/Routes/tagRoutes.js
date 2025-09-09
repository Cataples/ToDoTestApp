const express = require("express");
const router = express.Router();
const tagController = require("../Controllers/tagController");

router.get("/", tagController.getTags);
router.post("/:taskId/:tagId", tagController.assignTag);
router.delete("/:taskId/:tagId", tagController.removeTag);

module.exports = router;