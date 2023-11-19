const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const playersRouter = require("./routes/players");
const teamsRouter = require("./routes/teams");
const leaguesRouter = require("./routes/leagues");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost/sports", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Routes
app.use("/api/players", playersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/leagues", leaguesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
