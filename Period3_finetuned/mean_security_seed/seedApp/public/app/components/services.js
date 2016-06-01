'use strict';

/* Services */

// Demonstrate how to register services
angular.module('MeanStackSeed.services', [])
    .service('InfoService', [function () {
        var info = "Hello World from a Service";
        this.getInfo = function () { return info; }
    }]);
    