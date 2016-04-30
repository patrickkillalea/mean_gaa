var app = angular.module('flapperNews', ['ui.router']);



app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/about.html',
                controller: 'MainCtrl'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: '/blog.html',
                controller: 'MainCtrl'
            })
            .state('contacts', {
                url: '/contacts',
                templateUrl: '/contacts.html',
                controller: 'MainCtrl'
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            })

        $urlRouterProvider.otherwise('home');
    }
]);

app.factory('posts', [function() {
    var o = {
        posts: [{
            'title': 'Blog Title 1',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'date': '28 April 2016',
            'link': 'http://www.linnovate.net',
            'image': 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=a24580d4b984c1ede40051bf36afca1a'
        }, {
            'title': 'Blog Title 2',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'date': '26 April 2016',
            'link': 'http://www.linnovate.net',
            'image': 'https://images.unsplash.com/photo-1459664018906-085c36f472af?crop=entropy&fit=crop&fm=jpg&h=1350&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=2575'
        }, {
            'title': 'Blog Title 3',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'date': '25 April 2016',
            'link': 'http://www.linnovate.net',
            'image': 'https://images.unsplash.com/reserve/JjdWbOCTlemWMuvC0BeF_DSC_0867edit.jpg?crop=entropy&fit=crop&fm=jpg&h=1350&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=2575'
        }, {
            'title': 'Blog Title 4',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'date': '21 April 2016',
            'link': 'http://www.linnovate.net',
            'image': 'https://images.unsplash.com/photo-1458724338480-79bc7a8352e4?crop=entropy&fit=crop&fm=jpg&h=1350&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=2575'
        }]
    };
    return o;
}]);

app.controller('MainCtrl', [
    '$scope', 'posts',
    function($scope, posts) {
        $scope.test = 'Hello world!';
        $scope.posts = posts.posts;
        $scope.addPost = function() {
            if (!$scope.title || $scope.title === '') {
                return;
            }
            $scope.posts.push({
                title: $scope.title,
                date: $scope.date,
                image: $scope.image,
                content: $scope.content
            });
            $scope.title = '';
            $scope.date = '';
            $scope.image = '';
            $scope.content = '';
        };
    }
]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts) {
        $scope.post = posts.posts[$stateParams.id];
    }
]);
