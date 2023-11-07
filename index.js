require("dotenv").config();
const health = require("./routes");
const user = require("./routes/user");
const socketHandler = require("./socket");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

// validate config
require("./utils/config")();

// connecting to database
mongoose.connect(process.env.DB).then(() => {
  console.log("Connected to the db...");
});

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/", health);
app.use("/api/user", user);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// socket setup
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", socketHandler(io));
