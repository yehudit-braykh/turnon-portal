peruDigitalApp.directive('pedBrandsCarousel', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
      },
      controller: ['$scope', function pedBrandsCarouselController($scope) {

      }],
      templateUrl: '/assets/theme/ped/html/directives/ped-brands-carousel.html'
    };
  })
