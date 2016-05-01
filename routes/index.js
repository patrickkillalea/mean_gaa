var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Post = mongoose.model('Post'); // load post model

// ----------- REST Routes --------------
// Get all posts
router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if (err) {
            return next(err); }

        res.json(posts);
    });
});
// Create new post
router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post) {
        if (err) {
            return next(err); }

        res.json(post);
    });
});
// Map logic to route parameter 'post'
router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function(err, post) {
        if (err) {
            return next(err); }
        if (!post) {
            return next(new Error("can't find post")); }

        req.post = post;
        return next();
    });
});
// Get single post
router.get('/posts/:post', function(req, res) {
    req.post.populate(function (err, post) {
		res.json(post);
	});
});
// Delete post
router.delete('/posts/:post', function(req, res) {
    
    Post.remove({
        _id: req.params.post
    }, function(err, post) {
        if (err) {
            return next(err); }

        // get and return all the posts after you delete one
        Post.find(function(err, posts) {
            if (err) {
                return next(err); }

            res.json(posts);
        });
    });
});

module.exports = router;
