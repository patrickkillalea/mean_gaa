var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    link: String,
    crest: String
});

mongoose.model('Team', TeamSchema);