'use strict';

angular.module('MeanStackSeed.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'app/view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .controller('View2Ctrl', ['$scope', '$http', '$rootScope', '$log', function ($scope, $http, $rootScope, $log) {
        
        //clear the loaded divs in the view
        $scope.clearView = function () {
            $log.warn("View was cleared");
            $scope.showJokeTempalte = false;
            $scope.showAllJokes = false;
            $scope.error = null;
        };
 
        //-----------------------------------------------------------------------------------------------
        $scope.deleteJoke = function (joke) {
            $scope.clearView();
            
            $http({
                method: 'DELETE',
                url: 'api/jokes/' + joke._id,
            })
                .success(function (data, status, headers, config) {
                    $scope.systemNotification = "The Joke was deleted :-(";
                    $scope.notify = true;
                })
                .error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });

        };
        //----------------------------------------------------------------------------------------------
        $scope.editJoke = function (joke) {
            $scope.clearView();
            
            
        };
        //------------------------------------------------------------------------------------------------
        $scope.getAllJokes = function () {
            $scope.clearView();
            $scope.showAllJokes = true;

            $http({
                method: 'GET',
                url: 'api/jokes'
            })
                .success(function (data, status, headers, config) {
                    $scope.jokes = data.jokes;
                })
                .error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };
        //------------------------------------------------------------------------------------
        $scope.createJoke = function () {
            
            $http({
                method: 'POST',
                url: 'api/jokes',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    jokeText: $scope.jokeText,
                    created_by: $rootScope.username,
                    created_at: Date.now()
                }
            })
                .success(function (data, status, headers, config) {
                    $scope.jokeText = "";
                    $scope.clearView();
                    $scope.getAllJokes();
                })
                .error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        };

    }]);