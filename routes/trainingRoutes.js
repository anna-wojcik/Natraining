const express = require("express");
const trainingController = require("../controllers/trainingController");
const authController = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRoutes");

const router = express.Router();

// Mounting a router
router.use("/:trainingId/reviews", reviewRouter);

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
