'use strict';

/* Factories */

angular.module('MeanStackSeed.factories', []).
    factory('InfoFactory', function () {
        var info = "Hello World from a Factory";
        var getInfo = function getInfo() {
            return info;
        }
        return {
            getInfo: getInfo
        }
    })
    .factory('authInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = $window.sessionStorage.token;
                }
                console.log('Auth interceptor - Authorization: ' + config.headers.Authorization);
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return $q.reject(rejection);
            }
        };
    })
    .factory('socket', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    });