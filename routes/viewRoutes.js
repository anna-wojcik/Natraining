const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", viewController.getOverview);
router.get("/trainings/:slug", viewController.getTraining);

router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignupForm);
router.get("/me", viewController.getMe);

module.exports = router;
