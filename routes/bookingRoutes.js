const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

// This endpoint comes from frontend
router
  .route("/checkout-session/:trainingId")
  .get(authController.protect, bookingController.getCheckoutSession);
router.route("/").get(bookingController.getAllBookings);

router.use(authController.restrictTo("admin"));
router.route("/").post(bookingController.createBooking);

router
  .route("/:id")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
