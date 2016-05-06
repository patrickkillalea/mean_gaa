var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    title: String,
    ground: String,
    league: String,
    link: String,
    capacity: String,
    town: String,
    crest: String//,
    // player: [{
    //     name: String,
    //     age: Number,
    //     weight: Number
    // }]
});

mongoose.model('Team', TeamSchema);
