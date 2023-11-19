const express = require("express");
const router = express.Router();
const League = require("../models/League");
const Team = require("../models/Team");

// Get all leagues
router.get("/", async (req, res) => {
  try {
    const leagues = await League.find().populate("teams");
    res.json(leagues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all league names
router.get("/allLeagueNames", async (req, res) => {
  try {
    // Find all leagues and project only the "name" field
    const leagueNames = await League.find({}, "name");

    // Extract the names into an array
    const namesArray = leagueNames.map((league) => league.name);

    res.json(namesArray);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search for teams of a league by league name containing the input string
router.get("/searchTeamsByLeague", async (req, res) => {
  try {
    const leagueName = req.query.league; // Get the league name from the query parameter
    console.log(leagueName);
    // Create a case-insensitive regex pattern from the input string
    const regexPattern = new RegExp(leagueName, "i");

    // Find the teams where the league name contains the input string
    const leagues = await League.find({ name: regexPattern }).populate("teams");
    const teamsArray = leagues.map((league) => league.teams).flat();

    res.json(teamsArray);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single league by ID
router.get("/:id", getLeague, (req, res) => {
  res.json(res.league);
});

// Create a new league
router.post("/", async (req, res) => {
  const league = new League({
    name: req.body.name,
    sport: req.body.sport,
    teams: req.body.teams,
  });
  try {
    const newLeague = await league.save();
    res.status(201).json(newLeague);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a league
router.patch("/:id", getLeague, async (req, res) => {
  // Update logic here
  try {
    const updatedLeague = await res.league.save();
    res.json(updatedLeague);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a league
router.delete("/:id", getLeague, async (req, res) => {
  try {
    await res.league.remove();
    res.json({ message: "Deleted League" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get league object by ID
async function getLeague(req, res, next) {
  let league;
  try {
    league = await League.findById(req.params.id).populate("teams");
    if (league == null) {
      return res.status(404).json({ message: "Cannot find league" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.league = league;
  next();
}

module.exports = router;
