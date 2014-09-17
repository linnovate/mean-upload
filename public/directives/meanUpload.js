'use strict';

angular.module('mean.mean-upload').directive('meanUpload', function($upload) {
    return {
        templateUrl: 'mean-upload/views/directives/meanUpload.html',
        scope: {
            fileDest: '=',
            uploadCallback: '&',
            uploadFileCallback: '&'
        },
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            $scope.onFileSelect = function($files) {
                var files = [];
                $scope.files = $files;
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    $scope.upload = $upload.upload({
                        url: 'meanUpload/upload',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: {
                            dest: $scope.fileDest
                        },
                        file: file
                    }).progress(function(evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                        if (data.success) {
                            if (angular.isDefined(attrs.uploadFileCallback)) {
                                $scope.uploadFileCallback({
                                    file: data.file
                                });
                            }
                            files.push(data.file);
                        }
                        if (files.length === $files.length) {
                            if (angular.isDefined(attrs.uploadCallback)) {
                                $scope.uploadCallback({
                                    files: files
                                });
                            }
                        }
                    });
                }
            };
        }
    };
});
