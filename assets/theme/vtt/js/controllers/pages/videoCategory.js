var vc = null;
vttApp.controller('videoCategoryController', function videoCategoryController ($scope, $location, $routeParams, categoriesFactory, videoFactory, $http, $log) {
    vc = $scope;
    $scope.catName = $routeParams.categoryName;
    $scope.selectedCountry = '';
    $scope.search='';

    $scope.go = function(path){
        $location.path(path);
    }

    categoriesFactory.getAllCategories().then(function(data){
        $scope.categories=data.data;
    });

    videoFactory.getFeaturedVideos().then(function(data){
        $scope.videos= data.data;
    });

    $scope.countries=['Mexico','Cuba','Peru',"Brazil",'Paraguai', 'Bolivia', 'Chile', 'Colombia'];

    $scope.selectCountry = function(co){
        if(co=='All')
            $scope.selectedCountry='';
        else
            $scope.selectedCountry = co;
    };

    $scope.selectFilter = function (item) {
        if($scope.selectedFilter==item)
            $scope.selectedFilter='';
        else
            $scope.selectedFilter = item;
    };

    $scope.videosFilter = function(item){
        if($scope.search=='')
            return item;
        if(item.title.includes($scope.search))
            return item;

    }

  });
