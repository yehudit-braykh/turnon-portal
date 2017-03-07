var vid = null;
clixApp.controller('videoController', function videoController ($scope, $rootScope, $location, brandsFactory,celebrityFactory, videosFactory, $routeParams, User) {
      vid = $scope;
      $scope.share;

      videosFactory.getVideoById($routeParams.videoId).then(function(data){
          $scope.video=data.data;

          celebrityFactory.getCelebrity($scope.video.celebrities[0]).then(function(data){
              $scope.relatedCelebrity=data;
          });

          celebrityFactory.getCelebrityBrands($scope.video.celebrities[0]).then(function(data) {
              $scope.related_brands = data;
          });

          celebrityFactory.getCelebrityCharities($scope.video.celebrities[0]).then(function(data) {
              $scope.related_charities = data;
          });


          videosFactory.getVideoByCat('Sports').then(function(data){
              $scope.related_videos= data[0];
              $scope.series= data[0];

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

    $scope.detailsHeight();

    $(window).on('resize orientationChange', function(event) {
        $scope.detailsHeight();
    });

    setTimeout(function(){$scope.detailsHeight();},2000);
      $scope.go = function (path) {
          $location.path(path);
      }

      $scope.addRemoveFavorites = function(){
          if($scope.relatedCelebrity)
            User.addRemoveFavorites($scope.relatedCelebrity._id,'celeb');
      }

      $scope.isFavorite = function(){
          if($scope.relatedCelebrity)
              return User.isFavorite($scope.relatedCelebrity._id,'celeb');
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
