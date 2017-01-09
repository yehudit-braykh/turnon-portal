var ka = null;
vttApp.controller('karaokeController', function karaokeController ($scope, $location, categoriesFactory, videoFactory, $http, $log) {
    ka = $scope;

    $scope.selectedCat = '';
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

  });
