var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
    body: String,
    dob: String,
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team'}  // The ref option is what tells Mongoose which model to use during population.
});

mongoose.model('Player', PlayerSchema);
