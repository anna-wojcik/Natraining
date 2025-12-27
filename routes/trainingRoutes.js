const express = require("express");
const trainingController = require("../controllers/trainingController");
const authController = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRoutes");

const router = express.Router();

// Mounting a router
router.use("/:trainingId/reviews", reviewRouter);

router
  .route("/")
  .get(trainingController.getAllTrainings)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    trainingController.createTraining
  );

router
  .route("/:id")
  .get(trainingController.getTraining)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    trainingController.updateTraining
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    trainingController.deleteTraining
  );

module.exports = router;
