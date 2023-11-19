const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

// Get all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single player by ID
router.get("/:id", getPlayer, (req, res) => {
  res.json(res.player);
});

// Create a new player
router.post("/", async (req, res) => {
  const player = new Player({
    name: req.body.name,
    position: req.body.position,
    thumbnail: req.body.thumbnail,
    signin: {
      amount: req.body.signin.amount,
      currency: req.body.signin.currency,
    },
    born: req.body.born,
  });
  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a player
router.patch("/:id", getPlayer, async (req, res) => {
  // Update logic here
  // e.g., if (req.body.name != null) { res.player.name = req.body.name; }
  try {
    const updatedPlayer = await res.player.save();
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a player
router.delete("/:id", getPlayer, async (req, res) => {
  try {
    await res.player.remove();
    res.json({ message: "Deleted Player" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get player object by ID
async function getPlayer(req, res, next) {
  let player;
  try {
    player = await Player.findById(req.params.id);
    if (player == null) {
      return res.status(404).json({ message: "Cannot find player" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.player = player;
  next();
}

module.exports = router;
