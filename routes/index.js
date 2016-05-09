var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
res.render('index', { title: 'Express' });
});
var mongoose = require('mongoose');
var Team = mongoose.model('Team'); // load team model
var Player = mongoose.model('Player'); // load player model
// ----------- REST Routes --------------
// Get all teams
router.get('/teams', function(req, res, next) {
Team.find(function(err, teams) {
if (err) {
return next(err);
}
res.json(teams);
});
});
// Create new team
router.post('/teams', function(req, res, next) {
var team = new Team(req.body);
team.save(function(err, team) {
if (err) {
return next(err);
}
res.json(team);
});
});
// Map logic to route parameter 'team'
router.param('team', function(req, res, next, id) {
var query = Team.findById(id);
query.exec(function(err, team) {
if (err) {
return next(err);
}
if (!team) {
return next(new Error("can't find team"));
}
req.team = team;
return next();
});
});
// Map logic to route parameter 'player'
router.param('player', function(req, res, next, id) {
var query = Player.findById(id);
query.exec(function(err, player) {
if (err) {
return next(err);
}
if (!player) {
return next(new Error("can't find player"));
}
req.player = player;
return next();
});
});
// Get single team
router.get('/teams/:team', function(req, res) {
req.team.populate('players', function(err, team) {
res.json(team);
});
});

// Get single player

router.get('/teams/:team/player', function(req, res) {
req.team.populate('player', function(err, player) {
res.json(player);
});
});


// router.delete('/teams/:team', function(req, res) {
//     Team.remove({
//         _id: req.params.team
//     }, function(err, team) {
//         if (err) {
//             return next(err);
//         }
//         // get and return all the teams after you delete one
//         Team.find(function(err, teams) {
//             if (err) {
//                 return next(err);
//             }
//             res.json(teams);
//         });
//     });
// });
// Delete team
router.delete('/teams/:team', function(req, res) {
req.team.players.forEach(function(id) {
Player.remove({
_id: id
}, function(err) {
if (err) {
return next(err) }
});
})
Team.remove({
_id: req.params.team
}, function(err, team) {
if (err) {
return next(err); }
// get and return all the teams after you delete one
Team.find(function(err, teams) {
if (err) {
return next(err); }
res.json(teams);
});
});
});
// Create player
router.post('/teams/:team/players', function(req, res, next) {
var player = new Player(req.body);
player.team = req.team;
player.save(function(err, player) {
if (err) {
return next(err);
}
req.team.players.push(player);
req.team.save(function(err, team) {
if (err) {
return next(err);
}
res.json(player);
});
});
});
module.exports = router;