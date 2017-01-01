vttApp.directive('pedCarousel', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          carouselId: '@'
      },
      controller: ['$scope', '$location', function pedCarouselController($scope, $location) {
          sc = $scope;
          $scope.caruselPosition = 0;
          $scope.relatedPosition = 0;

          $scope.moveLeft = function () {
              if ($scope.caruselPosition == 0) {
                  $scope.caruselPosition = 1;
              }else {
                  $scope.caruselPosition = 0;
              }
          }
          $scope.moveRight = function () {
              if ($scope.caruselPosition == 0) {
                  $scope.caruselPosition = 1;
              }else {
                  $scope.caruselPosition = 0;
              }
          }
          $scope.moveRelated = function () {
              if ($scope.relatedPosition == 0) {
                  $scope.relatedPosition = 1;
              }else {
                  $scope.relatedPosition = 0;
              }
          }

          $scope.go = function(path){
              $location.path(path);
          }

      }],
      templateUrl: '/assets/theme/ped/html/directives/ped-carousel.html'
    };
  })
