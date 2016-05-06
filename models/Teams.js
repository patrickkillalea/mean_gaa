var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    title: String,
    ground: String,
    league: String,
    link: String,
    capacity: String,
    town: String,
    crest: String,
    players: { type: mongoose.Schema.Types.ObjectId, ref: 'Player'}  // The ref option is what tells Mongoose which model to use
    //,
    // player: [{
    //     name: String,
    //     age: Number,
    //     weight: Number
    // }]
});

mongoose.model('Team', TeamSchema);
