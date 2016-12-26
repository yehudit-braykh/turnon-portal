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


      $scope.activeVideo = {_id:"57fd2e69dfbef1000330d09f",
                            title:"Justin Bieber Ink Stories",
                            description:"The highly decorated musician is spilling a lot of ink in this episode. In spirit of full\n\ndisclosure, he has provided us with a full key to his myriad of tats, even though he isn\u2019t exactly sure how many tattoos he has.",
                            date:"2016-10-11T18:24:49.901Z",
                            MezzanineVideo:{url:"http:\/\/advncedcdn.vo.llnwd.net\/clixtv_storage\/storage\/57cdc2665aad0b6fcf67bb3d\/57fd2e69dfbef1000330d09f\/Bieber_Tatoos_comp.mov"},
                            HLSStream:{url:"http:\/\/advncedcdn.vo.llnwd.net\/clixtv_storage\/delivery\/411355_5c953f3214649c967af64d57daa63c40\/411355.m3u8"},
                            PosterH:{url:"http:\/\/advncedcdn.vo.llnwd.net\/clixtv_storage\/storage\/57cdc2665aad0b6fcf67bb3d\/57fd2e69dfbef1000330d09f\/Justin_Bieber_thumbnail.jpg"}};


  });
