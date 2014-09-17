'use strict';

angular.module('mean.mean-upload').controller('MeanUploadController', ['$scope', 'Global', 'MeanUpload',
  function($scope, Global, MeanUpload) {
    $scope.global = Global;
    $scope.images = [];
    $scope.files = [];
    $scope.package = {
        name: 'mean-upload'
    };

    $scope.images = [];

    $scope.uploadFileCallback = function(file) {
      if (file.type.indexOf('image') !== -1){
          $scope.images.push(file);
          $scope.addSlide(file.src);
      }
      else{
          $scope.files.push(file);
      }
    };

    $scope.uploadFinished = function(files) {
      console.log(files);
    };

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function(url) {
//           var newWidth = 600 + slides.length;
       slides.push({
         image: url
       });
    };
  }
]);
