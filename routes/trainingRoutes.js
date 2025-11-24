const express = require("express");
const trainingController = require("../controllers/trainingController");

const router = express.Router();

router.route("/").get(trainingController.getAllTrainings);
router.route("/:id").get(trainingController.getTraining);

module.exports = router;
