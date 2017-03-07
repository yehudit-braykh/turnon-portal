var celeb=null;

clixApp.controller("celebrityController", function celebrityController($scope, videosFactory, celebrityFactory, brandsFactory, $routeParams, $location, User){
    celeb=$scope;
    $scope.celebId= $routeParams.celebId;
    $scope.shownTab = "Video";
    celebrityFactory.getCelebrity($scope.celebId).then(function(data){
        $scope.celebrity=data;

        celebrityFactory.getCelebrityOffers($scope.celebrity._id).then(function(data) {
            $scope.celebrity.related_offers = data;
        });

        celebrityFactory.getCelebrityBrands($scope.celebrity._id).then(function(data) {
            $scope.celebrity.related_brands = data;
        });

        celebrityFactory.getCelebrityVideos($scope.celebrity._id).then(function(data) {
            $scope.celebrity.related_videos = data;
        });

        celebrityFactory.getCelebrityCharities($scope.celebrity._id).then(function(data) {
            $scope.celebrity.related_charities = data;
        });

    });

    window.onscroll = function(){
        var windowYOffset = window.pageYOffset,
            elBackgrounPos = "50% " + (-1*windowYOffset * 0.5) + "px";
        $(".celebrity-page-header").css('background-position', elBackgrounPos);
      };


    $scope.go = function (path) {
        $location.path(path);
    }

    $scope.addToFavorites = function(){
        if($scope.celebrity)
          User.addRemoveFavorites($scope.celebrity._id,'celeb');
    }

    $scope.isFavorite = function(){
        if($scope.celebrity)
          return User.isFavorite($scope.celebrity._id,'celeb');
      return false;
    }




});
