const express = require("express");
const trainingController = require("../controllers/trainingController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, trainingController.getAllTrainings)
  .post(trainingController.createTraining);

router
  .route("/:id")
  .get(trainingController.getTraining)
  .patch(trainingController.updateTraining)
  .delete(
    authController.protect,
    authController.restrictTo("trainer","admin"),
    trainingController.deleteTraining
  );

module.exports = router;
