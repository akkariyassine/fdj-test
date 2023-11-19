const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("players");
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single team by ID
router.get("/:id", getTeam, (req, res) => {
  res.json(res.team);
});

// Create a new team
router.post("/", async (req, res) => {
  const team = new Team({
    name: req.body.name,
    thumbnail: req.body.thumbnail,
    players: req.body.players,
  });
  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a team
router.patch("/:id", getTeam, async (req, res) => {
  try {
    const updatedTeam = await res.team.save();
    res.json(updatedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a team
router.delete("/:id", getTeam, async (req, res) => {
  try {
    await res.team.remove();
    res.json({ message: "Deleted Team" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get team object by ID
async function getTeam(req, res, next) {
  let team;
  try {
    team = await Team.findById(req.params.id).populate("players");
    if (team == null) {
      return res.status(404).json({ message: "Cannot find team" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.team = team;
  next();
}

module.exports = router;
