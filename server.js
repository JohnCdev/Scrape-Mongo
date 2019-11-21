const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models")

const MONGODB_URI = process.env.MONGODB_URI || "mongo://localhost/mongoHeadlines";

const PORT = 3000;

mongoose.connect(MONGODB_URI);

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.json({});
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});