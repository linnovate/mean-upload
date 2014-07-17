'use strict';

angular.module('mean.mean-upload').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('meanUpload example page', {
            url: '/meanUpload/example',
            templateUrl: 'mean-upload/views/index.html'
        });
    }
]);
