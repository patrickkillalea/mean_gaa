var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    link: String,
    image: String
});

mongoose.model('Post', PostSchema);