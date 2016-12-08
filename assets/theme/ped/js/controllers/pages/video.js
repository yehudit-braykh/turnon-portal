var vid = null;
peruDigitalApp.controller('videoController', function videoController ($scope, brandsFactory, videosFactory, $routeParams) {
    vid = $scope;

    $scope.video= videosFactory.getVideoById($routeParams.videoId);

    $scope.brands= brandsFactory.getAllBrands();

    $scope.newReleaseVids= videosFactory.getAllVideos();

    $scope.recommendedShows= videosFactory.getAllVideos();

  });
