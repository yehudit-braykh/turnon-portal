var h = null;
peruDigitalApp.controller('homeController', function homeController ($scope, $location, celebritiesFactory, brandsFactory, videoFactory) {
      h = $scope;

      
    $scope.celebrities=celebritiesFactory.getAllCelebrities();

    brandsFactory.getAllBrands().then(function(data){
        $scope.brands= data.data;
    });

    videoFactory.getNewReleasesVideos().then(function(data){
        $scope.newReleaseVids= data.data;

    });


    videoFactory.getRecommendedVideos().then(function(data){
        $scope.recommendedShows= data.data;

    });




    $scope.homeSlides=[{title:'Get The Boot A Birds Eye Look Into Mcse Boot Camps',
                        desc:'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services.',
                        cover_url:'assets/theme/ped/images/static-images/home-slider/slide1.png'},
                        {title:'Get The Boot A Birds Eye Look Into Mcse Boot Camps',
                        desc:'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services.',
                        cover_url:'assets/theme/ped/images/static-images/home-slider/slide2.png'},
                       {title:'Get The Boot A Birds Eye Look Into Mcse Boot Camps',
                        desc:'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services.',
                        cover_url:'assets/theme/ped/images/static-images/home-slider/slide1.png'},
                       {title:'Get The Boot A Birds Eye Look Into Mcse Boot Camps',
                        desc:'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services.',
                        cover_url:'assets/theme/ped/images/static-images/home-slider/slide2.png'},
                       {title:'Get The Boot A Birds Eye Look Into Mcse Boot Camps',
                        desc:'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services.',
                        cover_url:'assets/theme/ped/images/static-images/home-slider/slide1.png'},
                        {title:'Get The Boot A Birds Eye Look Into Mcse Boot Camps',
                        desc:'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services.',
                        cover_url:'assets/theme/ped/images/static-images/home-slider/slide2.png'}]





    $scope.go = function(path){
        $location.path(path);
    }

    $scope.getSlidesNumber = function(){
        return new Array($scope.homeSlides.length/2);
    }


  });
