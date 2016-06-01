var myApp = angular.module('myApp', []);

//this is used to parse the profile
function url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}


myApp.controller('UserCtrl', function ($scope, $http, $window) {
    
    $scope.debugInfo = [];
    $scope.error = '';
    
    $scope.user = { username: 'john.doe', password: 'foobar' };
    $scope.message = '';
    $scope.submit = function () {
        $http
            .post('/authenticate', $scope.user)
            .success(function (data, status, headers, config) {
                $scope.error = '';
                $window.sessionStorage.token = data.token;
                $scope.debugInfo.push(data.sysMessage);
                var tokenArr = data.token.split('.');
                
                $scope.debugInfo.push("Sytem: Your JWT token:   ");
                tokenArr.forEach(function(t, index){   $scope.debugInfo.push("JWT Section " + (index + 1) + ": " + t);  });
                $scope.debugInfo.push("System: You are authenticated!");
                $scope.message = 'Welcome';
                $scope.isAuthenticated = true;
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;

                // Handle login errors here
                $scope.error = 'Error: Invalid user or password';
                //$scope.debugInfo.push('Error: Invalid user or password');
            });
    };

    $scope.logout = function () {
        $scope.welcome = '';
        $scope.message = '';
        $scope.isAuthenticated = false;
        $scope.debugInfo.push('You are logged out');
        $scope.debugInfo.push('Token deleted from sessionStorage');
        $scope.debugInfo = [];
        delete $window.sessionStorage.token;
    };

    $scope.callRestricted = function () {
        $http({ url: '/api/restricted', method: 'GET' })
            .success(function (data, status, headers, config) {
                $scope.message = $scope.message + ' ' + data.name; // Should log 'foo'
                $scope.debugInfo.push('You accessed the restricted api!');
            })
            .error(function (data, status, headers, config) {
                alert(data);
            });
    };

});

myApp.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
                $rootScope.error = "401! You are not authenticated";
            }
            return response || $q.when(response);
        }
    };
});

myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});