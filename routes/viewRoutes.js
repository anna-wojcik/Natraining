const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/", viewController.getOverview);
router.get("/trainings/:slug", viewController.getTraining);

module.exports = router;
