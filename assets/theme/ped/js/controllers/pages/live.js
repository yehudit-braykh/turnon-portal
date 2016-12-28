var li = null;
peruDigitalApp.controller('liveController', function liveController ($scope, brandsFactory, $routeParams, videoFactory, $location) {
      li = $scope;

    $scope.activeVideo;

      brandsFactory.getAllBrands().then(function(data){
          $scope.brands= data.data;
      });

      videoFactory.getChannels().then(function(data){
          $scope.channels = data.data;
          $scope.activeVideo = $scope.channels[0];

          videoFactory.getEpg($scope.channels[0]._id).then(function(data){
              $scope.epg1 = data.data;

          });
          videoFactory.getEpg($scope.channels[0]._id).then(function(data){
              $scope.epg2 = data.data;

          });

      });

      $scope.go = function(path){
          $location.path(path);
      }

      $scope.calcPercent = function(startTime,endTime){
          var timeNow = new Date();
          var start= new Date(startTime);
          var end= new Date(endTime);
          if(start>=timeNow)
              return 0;
          if(end<=timeNow)
              return 100;
          return ((timeNow-start)/(end-start)*100);
      }

      $scope.getPlayingNowEpg = function(channel) {
          return $scope.epg[0];
      }


  });
