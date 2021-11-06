const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const splitSchema = new Schema({
  leg: {
    type: String,
  },
  timeOfDay: {
    type: Date,
  },
  totalTimeElapsed: {
    type: String,
  },
  diff: {
    type: String,
  },
  minPerMile: {
    type: String,
  },
  milesPerHour: {
    type: String,
  }
});

const Split = mongoose.model("Split", splitSchema);

module.exports = Split;
