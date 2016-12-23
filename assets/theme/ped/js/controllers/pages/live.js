var l = null;
peruDigitalApp.controller('liveController', function liveController ($scope, brandsFactory, videoFactory, $location) {
      li = $scope;

      brandsFactory.getAllBrands().then(function(data){
          $scope.brands= data.data;
      });

      $scope.channel1= videoFactory.getEpgByChannelId(1);

      $scope.channel2= videoFactory.getEpgByChannelId(2);

      $scope.go = function(path){
          $location.path(path);
      }

      $scope.calcPercent = function(start_time,end_time){
          var timeNow = (new Date()).getHours()*60+(new Date()).getMinutes();
          var start= start_time.substr(0,2)*60+start_time.substr(3,2)*1;
          var end= end_time.substr(0,2)*60+end_time.substr(3,2)*1;
          if(start>=timeNow)
              return 0;
          if(end<=timeNow)
              return 100;
          return ((timeNow-start)/(end-start)*100);
      }


  });
