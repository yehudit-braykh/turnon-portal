var celebs = null;
peruDigitalApp.controller('celebritiesController', function celebritiesController ($scope, $location, celebritiesFactory, brandsFactory) {
      celebs = $scope;

      $scope.celebritiesPage={title:'Join Our Selebreties',
                          desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                           While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                          cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'};

    $scope.celebrities=celebritiesFactory.getAllCelebrities();

    $scope.brands= brandsFactory.getAllBrands();
    console.log($scope.brands);

    $scope.go = function(path){
        $location.path(path);
    }
  });
