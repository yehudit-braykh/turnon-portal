var celebs = null;
peruDigitalApp.controller('celebritiesController', function celebritiesController ($scope, $location, celebritiesFactory, brandsFactory, videosFactory) {
      celebs = $scope;

      $scope.celebritiesPage={title:'Join Our Selebreties',
                          desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                           While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                          cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'};

    celebritiesFactory.getAllCelebrities().then(function(data){
        $scope.celebrities= data.data;

    });

    brandsFactory.getAllBrands().then(function(data){
        $scope.brands= data.data;
    });

    videoFactory.getRecommendedVideos().then(function(data){
        $scope.recommendedShows= data.data;
    });

    videoFactory.getNewReleasesVideos().then(function(data){
        $scope.newReleaseVids= data.data;
    });


    $scope.go = function(path){
        $location.path(path);
    }
  });
