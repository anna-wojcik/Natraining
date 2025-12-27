const Training = require("../models/trainingModel");
const factory = require("./handlerFactory");

exports.getAllTrainings = factory.getAll(Training);
exports.getTraining = factory.getOne(Training);
exports.createTraining = factory.createOne(Training);
exports.updateTraining = factory.updateOne(Training);
exports.deleteTraining = factory.deleteOne(Training);
