var vid = null;
peruDigitalApp.controller('videoController', function videoController ($scope, brandsFactory, videoFactory, $routeParams) {
    vid = $scope;

    videoFactory.getVideoById($routeParams.videoId).then(function(data){

        $scope.video= data.data;
    });

    brandsFactory.getAllBrands().then(function(data){
        $scope.brands= data.data;
    });

    videoFactory.getRecommendedVideos().then(function(data){
        $scope.newReleaseVids= data.data;

        $scope.recommendedShows= data.data;

    });

  });
