const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "JobTrack API is running 🚀",
  });
});

app.use(errorHandler);

module.exports = app;
