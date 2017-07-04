var ca = null;

vttApp.directive('mycarousel', function($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '='
        },
        controller: ['$scope', function mycarouselCtrl($scope) {
            ca = $scope;
            $scope.timer;
            $scope.showMessage=true;
            $scope.currentIndex = 0;
            $scope.activeSlide = {
                category: "",
                name: ""
            }

            $scope.currentIndex = 0; // Initially the index is at the first image

            $scope.next = function(index) {


                $scope.currentIndex < $scope.images.length - 1 ? $scope.currentIndex=index : $scope.currentIndex = 0;
                $timeout.cancel($scope.timer);
                $scope.timer = $timeout($scope.sliderFunc, 4000);


            };
            $scope.$watch('currentIndex', function(newValue, oldVal) {
                $scope.showMessage=true ;
                 $timeout(function() {
                        $scope.showMessage=false}, 2000);
                $scope.images[oldVal].visible = false;
                $scope.images[newValue].visible = true;
                $scope.activeSlide.name = $scope.images[newValue].title;
                $scope.activeSlide.category = $scope.images[newValue].category;
            });

            $scope.sliderFunc = function() {
                $scope.next($scope.currentIndex+1)
            };
            $scope.timer = $timeout($scope.sliderFunc, 4000);
            $scope.$on('$destroy', function() {
                $timeout.cancel($scope.timer); // when the scope is getting destroyed, cancel the timer
            });
       }],
       templateUrl: '/assets/html/directives/Carousel.html'
    };
});
