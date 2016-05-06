var app = angular.module('meanGAA', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/views/home.html',
                controller: 'MainCtrl',
                resolve: {
                    teamPromise: ['teams', function(teams) {
                        $('html, body').animate({ scrollTop: 0 }, 'fast');
                        return teams.getAll();
                    }]
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: '/views/about.html',
                controller: 'MainCtrl',
                resolve: {
                    teamPromise: [function() {
                        $('html, body').animate({ scrollTop: 0 }, 'fast');
                    }]
                }
            })
            .state('blog', {
                url: '/blog',
                templateUrl: '/views/blog.html',
                controller: 'MainCtrl',
                resolve: {
                    teamPromise: ['teams', function(teams) {
                        $('html, body').animate({ scrollTop: 0 }, 'fast');
                        return teams.getAll();
                    }]
                }
            })
            .state('contacts', {
                url: '/contacts',
                templateUrl: '/views/contacts.html',
                controller: 'MainCtrl',
                resolve: {
                    teamPromise: [function() {
                        $('html, body').animate({ scrollTop: 0 }, 'fast');
                    }]
                }
            })
            .state('teams', {
                url: '/teams/{id}',
                templateUrl: '/views/teams.html',
                controller: 'TeamsCtrl',
                resolve: {
                    team: ['$stateParams', 'teams', function($stateParams, teams) {
                        $('html, body').animate({ scrollTop: 0 }, 'fast');
                        return teams.get($stateParams.id);
                    }]
                }
            })

        $urlRouterProvider.otherwise('home');
    }
]);

// Main controller
app.controller('MainCtrl', [
    '$scope', 'teams',
    function($scope, teams) {

        $scope.teams = teams.teams;
        $scope.addTeam = function() {
            if (!$scope.title || $scope.title === '') {
                return;
            }
            teams.create({
                title: $scope.title,
                league: $scope.league,
                crest: $scope.crest,
                ground: $scope.ground
            });
            $scope.title = '';
            $scope.league = '';
            $scope.crest = '';
            $scope.ground = '';
        };

        $scope.deleteTeam = function(team) {
            teams.delete(team);
        };
    }
]);

// Team controller
app.controller('TeamsCtrl', [
    '$scope',
    'teams',
    'team',
    function($scope, teams, team) {
        $scope.team = team;
        $scope.addPlayer = function() {
            if ($scope.body === '') {
                return; }
            teams.addPlayer(team._id, {
                body: $scope.body,
                dob: $scope.dob,
                // weight: 'weight',
            }).success(function(player) {
                $scope.team.players.push(player);
            });
            $scope.body = '';
        };

    }
]);

app.factory('teams', ['$http', function($http) {
    var o = {
        teams: []
    };

    // get all teams
    o.getAll = function() {
        return $http.get('/teams').success(function(data) {
            angular.copy(data, o.teams);
        });
    };
    // create new teams
    o.create = function(team) {
        return $http.post('/teams', team).success(function(data) {
            o.teams.push(data);
        });
    };
    // get single team
    o.get = function(id) {
        return $http.get('/teams/' + id).then(function(res) {
            return res.data;
        });
    };
    // delete single team
    o.delete = function(team) {
        return $http.delete('/teams/' + team._id).success(function(data) {
            angular.copy(data, o.teams);
        });
    };

    o.addPlayer = function(id, player) {
        return $http.post('/teams/' + id + '/players', player);
    };

    return o;
}]);
