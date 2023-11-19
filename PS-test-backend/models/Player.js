const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  signin: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  born: {
    type: Date,
    required: true,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
