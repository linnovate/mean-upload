'use strict';

angular.module('mean.mean-upload').controller('MeanUploadController', ['$scope', 'Global', 'MeanUpload',
    function($scope, Global, MeanUpload) {
        $scope.global = Global;
        $scope.images = [];
        $scope.package = {
            name: 'mean-upload'
        };

        $scope.images = [];

        $scope.uploadFileCallback = function(file) {
            if (file.type.indexOf('image') !== -1)
                $scope.images.push(file);
        };

        $scope.uploadFinished = function(files) {
            console.log(files);
        };
    }
]);