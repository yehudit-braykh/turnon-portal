var vcs = null;
vttApp.controller('karaokeController', function karaokeController ($scope, $location, categoriesFactory, videoFactory, $http, $log) {
    vcs = $scope;

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

    $scope.genre=[{id: 1, title:"Clasicos",PosterH:{url:'/assets//images/static-images/album5.png'}},
                {id: 2, title:"Ranchera",PosterH:{url:'/assets//images/static-images/album4.png'}},
                {id: 3, title:"Rock & POP",PosterH:{url:'/assets//images/static-images/album1.png'}},
                {id: 4, title:"Romantico",PosterH:{url:'/assets//images/static-images/album3.png'}},
                {id: 5, title:"Salsa & Merengue",PosterH:{url:'/assets//images/static-images/album2.png'}},
                {id: 6, title:"Blues",PosterH:{url:'/assets//images/static-images/singer1.png'}},
                {id: 7, title:"Romantico",PosterH:{url:'/assets//images/static-images/singer5.png'}},
                {id: 8, title:"Clasicos",PosterH:{url:'/assets//images/static-images/singer2.png'}},
                {id: 9, title:"Jazz",PosterH:{url:'/assets//images/static-images/singer3.png'}},
                {id: 10,title:"Hip Hop", PosterH:{url:'/assets//images/static-images/singer4.png'}}];

                $scope.singers=[{id: 1, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer5.png'}},
                            {id: 2, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer4.png'}},
                            {id: 3, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer1.png'}},
                            {id: 4, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer3.png'}},
                            {id: 5, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer2.png'}},
                            {id: 6, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer1.png'}},
                            {id: 7, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer5.png'}},
                            {id: 8, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer2.png'}},
                            {id: 9, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer3.png'}},
                            {id: 10,title:"Artist Name", PosterH:{url:'/assets//images/static-images/singer4.png'}},
                            {id: 11, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer2.png'}},
                            {id: 12, title:"Artist Name",PosterH:{url:'/assets//images/static-images/singer1.png'}}];

  });
