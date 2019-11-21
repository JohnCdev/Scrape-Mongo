const mongoose = require("mongoose");

var MONGODB_URI = process.env.MONGODB_URI || "mongo://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);