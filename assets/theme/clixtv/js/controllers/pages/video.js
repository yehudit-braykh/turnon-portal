var vid = null;
clixApp.controller('videoController', function videoController ($scope, $rootScope, $location, brandsFactory, videosFactory, $routeParams, User) {
      vid = $scope;
      $scope.share;

      videosFactory.getVideoById($routeParams.videoId).then(function(data){
          $scope.video=data.data;

          videosFactory.getVideoByCat('Sports').then(function(data){
              $scope.related_videos= data[0];
              $scope.series= data[0];

              brandsFactory.getAllBrands().then(function(data){
                  $scope.related_offers = data;
              });
          });

    });
    $scope.showMore = false;
    var totalHeight = 0;

    $(".video-details").children().each(function(){
    totalHeight = totalHeight + $(this).outerHeight(true);
    });
    $scope.detailsHeight = function () {
        if(!$scope.showMore){
            $(".video-details").css('max-height', $(".player").height());
        }
        else{
            $(".video-details").css('max-height', (totalHeight/document.documentElement.clientWidth*100)+16+'vw');
        }
    }

    $(window).on('resize orientationChange', function(event) {
        $scope.detailsHeight();
    });

    setTimeout(function(){$scope.detailsHeight();},2000);
      $scope.go = function (path) {
          $location.path(path);
      }

      $scope.addRemoveFavorites = function(){
          if($scope.video)
            User.addRemoveFavorites($scope.video._id,'celeb');
      }

      $scope.isFavorite = function(){
          if($scope.video)
              return User.isFavorite($scope.video._id,'celeb');
        return false;
      }

      $scope.addRemoveWatchlist = function(){
          if($scope.video)
            User.addRemoveWatchlist($scope.video._id,'video');
      }

      $scope.isWatchlist = function(){
          if($scope.video)
              return User.isWatchlist($scope.video._id,'video');
        return false;
      }

      $scope.shareModal = function(){
          $rootScope.$broadcast("socialModal", $scope.video);
      }

  });
