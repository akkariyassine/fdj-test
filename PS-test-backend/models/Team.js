const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});
module.exports = mongoose.model("Team", teamSchema);
