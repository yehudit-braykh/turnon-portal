peruDigitalApp.directive('pedCarousel', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
      },
      controller: ['$scope', function pedCarouselController($scope) {
      }],
      templateUrl: '/assets/theme/ped/html/directives/ped-carousel.html'
    };
  })
