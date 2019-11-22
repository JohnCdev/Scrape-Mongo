const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models")

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/scrapper",
    {
        useMongoClient: true
    }
);

const PORT = process.env.PORT || 3000;

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

app.get("/api/scrape", function (req, res) {

    axios.get("http://www.npr.org")
        .then(function (response) {

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
        })
    res.json({});
});

app.get("/api/articles/:id", function (req, res) {

    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/api/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.stat(200);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
