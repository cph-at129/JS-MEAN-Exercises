'use strict';

angular.module('MeanStackSeed', [
    'ngRoute',
    'MeanStackSeed.controllers',
    'MeanStackSeed.directives',
    'MeanStackSeed.services',
    'MeanStackSeed.factories',
    'MeanStackSeed.filters',
    'MeanStackSeed.view1',
    'MeanStackSeed.view2',
    'MeanStackSeed.view3',
    'MeanStackSeed.view4',
    'MeanStackSeed.view5'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/view1' });
    }])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });


// app.factory('jokeService', ['$resource', function($resource) {
//     return $resource('/api/jokes/:id');
// }]);

// app.controller('mainController', ['$scope', '$rootScope', 'jokeService', function($scope, $rootScope, jokeService) {
//     $scope.jokes = jokeService.query();
//     $scope.newJoke = "";

//     $scope.joke = function() {
//         jokeService.save({ created_by: $rootScope.current_user, text: $scope.newJoke, created_at: Date.now() },
//             function() {
//                 $scope.jokes = jokeService.query();
//                 $scope.newJoke = "";
//             });
//     };
//     $scope.delete = function(joke) {
//         jokeService.delete({ id: joke._id });
//         $scope.jokes = jokeService.query();
//     };
// }]);

