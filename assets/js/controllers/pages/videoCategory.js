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
        $scope.fvideos= data.data;
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


    $scope.videos=[{id: 1,title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…", PosterH:{url:'/assets//images/static-images/carousel1.png'}},
            {id: 2, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyasciencia ficción distópica producida en 2004,…",categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/carousel2.png'}},
            {id: 3, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/carousel3.png'}},
            {id: 4, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets//images/static-images/carousel4.png'}},
            {id: 5, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets//images/static-images/cats/5.png'}},
            {id: 6, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets//images/static-images/cats/6.png'}},
            {id: 7, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets//images/static-images/carousel7.png'}},
            {id: 8, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets//images/static-images/cats/2.png'}},
            {id: 9, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",categories:[{name:"free"}],PosterH:{url:'/assets//images/static-images/cats/1.png'}},
            {id: 10, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",categories:[{name:"member"}],PosterH:{url:'/assets//images/static-images/cats/3.png'}},
            {id: 11, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets//images/static-images/cats/4.png'}},
            {id: 12, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets//images/static-images/carousel5.png'}},
            {id: 13, title:"Yo, robot", description:"Yo, robot (título original en inglés, I, Robot) es una película de ciencia ficción distópica producida en 2004, dirigida por Alex Proyas…",PosterH:{url:'/assets//images/static-images/carousel6.png'}},];
  });
