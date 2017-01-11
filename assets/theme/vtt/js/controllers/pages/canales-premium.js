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

    });

    $scope.changeSelectedCat = function (cat) {
        if($scope.selectedCat==cat)
            $scope.selectedCat='';
        else
            $scope.selectedCat = cat;
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

    $scope.countries=['Mexico','Cuba','Peru',"Brazil",'Paraguai', 'Bolivia', 'Chile', 'Colombia'];

    $scope.selectCountry = function(co){
        if(co=='All')
            $scope.selectedCountry='';
        else
            $scope.selectedCountry = co;
    };


  });
