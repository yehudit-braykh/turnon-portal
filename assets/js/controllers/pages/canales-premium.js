var kg = null;
vttApp.controller('canalesPremiumController', function canalesPremiumController ($scope, $location, categoriesFactory, videoFactory, $http, $log) {
    kg = $scope;
    $scope.selectedCat = '';
    $scope.search='';
    $scope.selectedCountry='';

    $scope.go = function(path){
        $location.path(path);
    }

    categoriesFactory.getCategoryByName($scope.genreName).then(function(data){
        $scope.genre=data.data;
    });

    categoriesFactory.getAllCategories().then(function(data){
        $scope.categories=data.data;

    });

    categoriesFactory.getCategoryVideos($scope.genreName).then(function(data){
        //$scope.genreVideos=data.data;
    });

    videoFactory.getFeaturedVideos().then(function(data){
        $scope.videos= data.data;
        $scope.genreVideos=data.data;
        $scope.activeVideo = $scope.videos[0];

    });

    $scope.changeSelectedCat = function (cat) {
        if($scope.selectedCat==cat)
            $scope.selectedCat='';
        else
            $scope.selectedCat = cat;
    };

    $scope.changeVideo = function(video){
        $scope.activeVideo = video;
    };

    $scope.videosFilter = function(item){
        if($scope.selectedCat=='' && $scope.search=='')
            return item;
        if($scope.selectedCat=='')
            if(item.title.includes($scope.search))
                return item;
        if($scope.search=='' && item.categories  && item.categories.indexOf($scope.selectedCat.toLowerCase())>=0)
                    return item;
        if(item.categories && item.categories.indexOf($scope.selectedCat.toLowerCase())>=0 && item.title.includes($scope.search))
                return item;
    }

    videoFactory.getChannels().then(function(data){
        $scope.channels = data.data;

        videoFactory.getEpg($scope.channels[1]._id).then(function(data){
            $scope.epg = data.data;
        });
    });

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

    $scope.channelPosition = 0;

    $scope.moveChannelLeft = function(){
        if ($scope.channelPosition == 0) {
            $scope.channelPosition = 1;
        }else {
            $scope.channelPosition = 0;
        }
    }

    $scope.moveChannelRight = function(){
        if ($scope.channelPosition == 0) {
            $scope.channelPosition = 1;
        }else {
            $scope.channelPosition = 0;
        }
    }

    $scope.liveChannels=[{id: 1, title:'Argentina', PosterH:{url:'/assets//images/logo1.png'}},
                     {id: 2, title:'Brazil', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 3, title:'Peru', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 4, title:'Peru', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 5, title:'Argentina', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 6, title:'Argentina', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 7, title:'Brazil', PosterH:{url:'/assets//images/logo1.png'}},
                     {id: 8, title:'Argentina', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 9, title:'Argentina', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 10, title:'Peru', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 11, title:'Brazil', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 12, title:'Brazil', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 13, title:'Brazil', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 14, title:'Argentina', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 15, title:'Argentina', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 16, title:'Peru', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 17, title:'Argentina', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 18, title:'Argentina', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 19, title:'Brazil', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 20, title:'Argentina', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 21, title:'Brazil', PosterH:{url:'/assets//images/logo1.png'}},
                     {id: 22, title:'Argentina', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 23, title:'Argentina', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 24, title:'Argentina', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 25, title:'Peru', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 26, title:'Brazil', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 27, title:'Argentina', PosterH:{url:'/assets//images/logo1.png'}},
                     {id: 28, title:'Argentina', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 29, title:'Argentina', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 30, title:'Brazil', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 31, title:'Argentina', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 32, title:'Argentina', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 33, title:'Peru', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 34, title:'Argentina', PosterH:{url:'/assets//images/logo5.png'}},];

    $scope.countries=['Mexico','Cuba','Peru',"Brazil",'Paraguai', 'Bolivia', 'Chile', 'Colombia'];

    $scope.selectCountry = function(co){
        if(co=='All')
            $scope.selectedCountry='';
        else
            $scope.selectedCountry = co;
    };


  });
