const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const runnerSchema = new Schema({
  name: {
    type: String,
    trim: true,

  },
  team: {
    type: String,
    trim: true,

  },
  ageGroup: {
    type: String,
    trim: true,

  },
  bibNumber: {
    type: Number,
    trim: true,
  },
  age: {
    type: String,
    trim: true,
  },
  province: {
    type: String,
    required: "Enter an amount"
  },
  totalPlaceMW: {
    type: Number,
    required: "Enter an amount"
  },
  totalPlaceAC: {
    type: Number,
    required: "Enter an amount"
  },
  totalPlace: {
    type: Number,
    required: "Enter an amount"
  },
  totalNetTime: {
    type: String,
    required: "Enter an amount"
  },
  totalGunTime: {
    type: String,
    required: "Enter an amount"
  },
  minPerMile: {
    type: String,
    required: "Enter an amount"
  },
  raceStatus: {
    type: String,
    required: "Enter an amount"
  },
  lastSplit: {
    type: String,
    required: "Enter an amount"
  },
  splits: [{
    type: String,
    ref: "Split"
    
  }],

  featuredImgs: [{
    type: String
  }]
});

const Runner = mongoose.model("Runner", personSchema);

module.exports = Person;