'use strict';

angular.module('mean.mean-upload').controller('MeanUploadController', ['$scope', 'Global', 'MeanUpload',
    function($scope, Global, MeanUpload) {
        $scope.global = Global;
        $scope.package = {
            name: 'mean-upload'
        };

        $scope.uploadFileCallback = function(file) {
            console.log(file);
        };

        $scope.uploadFinished = function(files) {
            console.log(files);
        };
    }
]);