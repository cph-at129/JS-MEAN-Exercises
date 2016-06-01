'use strict';

angular.module('MeanStackSeed.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'app/view1/view1.html'
        });
    }])

    .controller('View1Ctrl', function () {
    });