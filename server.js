const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models")

// const MONGODB_URI = process.env.MONGODB_URI || "mongo://localhost/scrapper";
// mongoose.connect(MONGODB_URI);

const PORT = 3000;

mongoose.connect("mongodb://localhost/scrapper", { useNewUrlParser: true });

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/articles", (req, res) => {
    db.Article.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.json(err));
});

app.get("/scrape", function (req, res) {

    axios.get("http://www.npr.org").then(function (response) {

        var $ = cheerio.load(response.data);

        db.Article.collection.drop();

        $(".story-wrap").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .find(".title")
                .text();
            result.summary = $(this)
                .find(".teaser")
                .text();
            result.link = $(this)
                .find("a")
                .attr("href");
            result.image = $(this)
                .find("img")
                .attr("src");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        res.send("Scrape Complete");
    });
});


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
