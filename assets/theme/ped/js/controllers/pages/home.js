var h = null;
peruDigitalApp.controller('homeController', function homeController ($scope, $location, celebritiesFactory, brandsFactory, videoFactory) {
      h = $scope;

    celebritiesFactory.getAllCelebrities().then(function(data){
        $scope.celebrities= data.data;

    });

    brandsFactory.getAllBrands().then(function(data){
        $scope.brands= data.data;
    });

    videoFactory.getNewReleasesVideos().then(function(data){
        $scope.newReleaseVids= data.data;

    });

    videoFactory.getRecommendedVideos().then(function(data){
        $scope.recommendedShows= data.data;

    });

    videoFactory.getFeaturedVideos().then(function(data){
        $scope.featuredVideos= [];
        for (i=0; i< data.data.length/2 ; i++){
            var tmp = [];
            tmp.push(data.data[2*i]);
            tmp.push(data.data[2*i+1]);
            $scope.featuredVideos.push(tmp);
        }
    });






    $scope.go = function(path){
        $location.path(path);
    }



  });
