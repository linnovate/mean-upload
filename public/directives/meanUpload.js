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
                //If they specified an allows attribute, turn it into a regex
                var typeMatch, list;
                if (angular.isDefined(attrs.allow)) {
                    list = attrs.allow.split(',');
                    //If the list is a length of one, check to see if it is a regex
                    var checkRegex = /^\/(.+)\/([gimy]*)$/;
                    if (list.length === 1 && checkRegex.test(list[0])) {
                        var matches = checkRegex.exec(list[0]);
                        typeMatch = new RegExp(matches[1], matches[2]);
                        list = null;
                    }
                }
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    //If there is a regex, test it
                    if (typeMatch && !typeMatch.test(file.type)) {
                        console.log('File of type ' + file.type + ' is not allowed');
                        continue;
                    }
                    else if (list && list.indexOf(file.type) < 0) {
                        console.log('File of type ' + file.type + ' is not allowed');
                        continue;  
                    }
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
