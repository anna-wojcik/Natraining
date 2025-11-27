const express = require("express");
const trainingController = require("../controllers/trainingController");

const router = express.Router();

router
  .route("/")
  .get(trainingController.getAllTrainings)
  .post(trainingController.createTraining);

router
  .route("/:id")
  .get(trainingController.getTraining)
  .patch(trainingController.updateTraining)
  .delete(trainingController.deleteTraining);

module.exports = router;
