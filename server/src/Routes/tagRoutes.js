const express = require("express");
const router = express.Router();
const tagController = require("../Controllers/tagController");

router.get("/", tagController.getTags);
router.post("/assign", tagController.assignTag);
router.delete("/:taskId/:tagId", tagController.removeTag);

module.exports = router;
