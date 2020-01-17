var mongoose = require("mongoose");

var FeedbackSchema = new mongoose.Schema({
    name: String,
    list: String,
    description: String
});

mongoose.model('Feedback', FeedbackSchema);
module.exports = mongoose.model("Feedback");