// node /dev-data/data/import-dev-data.js --delete
// node /dev-data/data/import-dev-data.js --import
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../../config.env" });
const Training = require("../../models/trainingModel");
const User = require("../../models/userModel");
const Room = require("../../models/roomModel");
const Review = require("../../models/reviewModel");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("DB connection successful!"));

// READING A FILE
const trainings = JSON.parse(
  fs.readFileSync(`${__dirname}/training.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);
const rooms = JSON.parse(fs.readFileSync(`${__dirname}/rooms.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Room.create(rooms);
    await User.create(users, { validateBeforeSave: false });
    await Training.create(trainings);
    await Review.create(reviews);
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Room.deleteMany();
    await User.deleteMany();
    await Training.deleteMany();
    await Review.deleteMany();
    console.log("Data succesfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
