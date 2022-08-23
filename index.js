/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Body json parse setting
// -----------------------------------------------
app.use(bodyParser.json({
  limit: "150mb"
}));

// Body json parse urlencoded
// -----------------------------------------------
app.use(bodyParser.urlencoded({
  limit: "150mb",
  extended: true,
}));

app.use(cors());

// db connect
require("./server/db");

app.use("/api", require("./server/api/index"));

app.use(express.static(path.join(__dirname, "./dist/")));

// app.use("/upload", express.static(path.join(__dirname, "/server/upload")));

app.get("/.*/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening to port + ${PORT}`));