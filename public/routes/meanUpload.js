'use strict';

angular.module('mean.mean-upload').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('Mean upload help page', {
            url: '/meanupload/help',
            templateUrl: 'mean-upload/views/index.html'
        });
    }
]);
