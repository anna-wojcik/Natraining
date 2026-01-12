const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", bookingController.createBookingCheckout, viewController.getOverview);
router.get("/trainings/:slug", viewController.getTraining);

router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignupForm);

router.use(authController.protect);

router.get("/me", viewController.getAccount);
router.get("/my-reviews", viewController.getMyReviews);
router.get("/my-trainings", viewController.getMyTrainings);
module.exports = router;
