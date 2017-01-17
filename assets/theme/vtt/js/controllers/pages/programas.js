var ps = null;
vttApp.controller('programasController', function programasController ($scope, $location, categoriesFactory, videoFactory, $http, $log) {
    ps = $scope;

    $scope.selectedCat = '';
    $scope.search='';

    $scope.go = function(path){
        $location.path(path);
    }

    categoriesFactory.getAllCategories().then(function(data){
        $scope.categories=data.data;

    });

    videoFactory.getFeaturedVideos().then(function(data){
        // $scope.videos= data.data;

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


    $scope.videos=[{id: 1,title:"TeleSur", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…", PosterH:{url:'/assets/theme/vtt/images/static-images/program1.png'}},
                  {id: 2, title:"TeleSur", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",categories:[{name:"free"}],PosterH:{url:'/assets/theme/vtt/images/static-images/program2.png'}},
                  {id: 3, title:"TeleSur", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",categories:[{name:"member"}],PosterH:{url:'/assets/theme/vtt/images/static-images/program3.png'}},
                  {id: 4, title:"TeleSur", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets/theme/vtt/images/static-images/program4.png'}},
                  {id: 5, title:"TeleSur", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets/theme/vtt/images/static-images/carousel5.png'}},
                  {id: 6, title:"TeleSur", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets/theme/vtt/images/static-images/carousel6.png'}},
                  {id: 7, title:"TeleSur", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets/theme/vtt/images/static-images/carousel7.png'}},
                  {id: 8, title:"TeleSur", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets/theme/vtt/images/static-images/carousel2.png'}}];
  });
