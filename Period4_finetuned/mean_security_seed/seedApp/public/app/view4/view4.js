'use strict';

angular.module('MeanStackSeed.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'app/view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', function ($scope, $http) {
        
        $scope.isRegistered = false;
        $scope.error = null;
        $scope.systemMessage = "";

        $scope.register = function () {

            $http
                .post('/auth/signup', $scope.newUser)
                .success(function (data, status, headers, config) {
                    $scope.isRegistered = true;
                    $scope.systemMessage = "You registered successfylly!";
                    $scope.error = null;

                })
                .error(function (data, status, headers, config) {
                    $scope.error = "Something went wrong! Please try to register again";
                    $scope.isRegistered = false;
                });
        };

    });