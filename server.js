const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const path = require("path")

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"))

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(PORT, () => {
    chalk.cyan(console.log(`Server is running on PORT: ${PORT}`));
})