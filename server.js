var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Requiring all models
var db = require("./models");

// Initializing the port
var PORT = process.env.PORT || 3000;

// Initializing Express
var app = express();


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

// Connecting to the Mongo DB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoartnews";
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.get("/", function(req, res){
  db.Article.find({"saved": false}).then(function(result){
      var hbsObject = { articles: result };
      res.render("index",hbsObject);
  }).catch(function(err){ res.json(err) });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });