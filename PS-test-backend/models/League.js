const mongoose = require("mongoose");

const LeagueSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
});

module.exports = mongoose.model("League", LeagueSchema);
