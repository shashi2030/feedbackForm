const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = "mongodb://root:root1234@ds263928.mlab.com:63928/feedback";
const Feedback = require("./model/feedback");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL, (err, db) => {
    if(err) {
        console.log("Unable to connect to MongoDB Server", err);
    } else {
        console.log("MongoDB Started at URL: ", MONGO_URL);
    }
})

// CORS
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type, Authorization, Cache-Control"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    return next();
  }); 

app.post("/feedback", (req,res) => {
    Feedback.create({
        name: req.body.name,
        list: req.body.list,
        description: req.body.description
    }, (err, feedback) => {
        if(err) {
            return res.status(500).send("There is a problem while inserting data in DB")
        }
        return res.status(200).send(feedback);
    })
})

app.get("/feedback", function(req, res) {
    Feedback.find({}, function(err, feedback) {
      if (err)
        return res
          .status(500)
          .send("There is a problem in retriving data from Mlab");
      res.status(200).send(feedback);
    });
  })

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.listen(PORT, () => {
    console.log("server is running on port: ", PORT);
})