peruDigitalApp.directive('pedBrandsCarousel', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          carouselId: '@'
      },
      controller: ['$scope', function pedBrandsCarouselController($scope) {
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

      }],
      templateUrl: '/assets/theme/ped/html/directives/ped-brands-carousel.html'
    };
  })
