clixApp.directive('clixCarousel', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          videos: '=',
          autoPlay: '=',
          index: '=',
          slides: '@'
      },
      controller: ['$scope', '$rootScope', '$location', 'User', 'brandsFactory', function clixCarouselController($scope, $rootScope, $location, User, brandsFactory) {
          sca = $scope;
          brandsFactory.getBrandsAndCharitiesObject().then(function(data){
              $scope.brands= data;
          });
          setTimeout(function(){
            //   console.log('slick!');
               $('.clix-carousel-'+$scope.index).slick({
                   nextArrow: '<div class="next"><div class="pr"><i class="icon icon-next-27x65"></i></div></div>',
                   prevArrow: '<div id="'+$scope.index+'" class="prev hidden"><div class="pr"><i class="icon icon-next-27x65"></i></div></div>',
                   dots: false,
                   infinite: false,
                   speed: 300,
                //   centerMode:true,
                   slidesToShow: $scope.slides?$scope.slides:5,
                   slidesToScroll: 1,
                  // initialSlide:2,
                   autoplay: $scope.autoPlay,
                   autoplaySpeed: 2000,
                //   centerPadding: '40px',
                   responsive: [
                     {
                       breakpoint: 1400,
                       settings: {
                         slidesToShow: 4,
                         infinite: true
                       }
                     },
                     {
                       breakpoint: 1200,
                       settings: {
                         slidesToShow: 3,
                       }
                     },
                     {
                       breakpoint: 992,
                       settings: {
                         slidesToShow: 2,
                       }
                   },
                   {
                     breakpoint: 768,
                     settings: {
                         arrows: false,
                         autoplay: false,
                         centerMode:true,
                         swipeToSlide: true,
                         slidesToShow: 1,
                     }
                   }
                   ]
               });
               $scope.loaded = true;

                $('.clix-carousel-'+$scope.index).on('afterChange', function(event, slick, currentSlide, nextSlide){
                   if(currentSlide==0) $('#'+$scope.index).addClass('hidden');
                   else $('#'+$scope.index).removeClass('hidden');
                 });

          }, 0);



          $scope.addRemoveFavorites = function(item){
              User.addRemoveFavorites(item._id, 'celeb');
          }

          $scope.isFavorite = function(id){
              return User.isFavorite(id, 'celeb');
          }

          $scope.addRemoveWatchlist = function(id){
              User.addRemoveWatchlist(id);
          }

          $scope.isWatchlist = function(id){
              return User.isWatchlist(id);
          }

          $scope.shareModal = function(item){
              item.media_type="video"
              $rootScope.$broadcast("socialModal", item);
          }

          $scope.go = function (path) {
              $location.path(path);
          }
      }],
      templateUrl: '/assets/theme/clixtv/html/directives/clix-carousel.html'
    };
  })
