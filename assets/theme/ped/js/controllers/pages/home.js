var h = null;
peruDigitalApp.controller('homeController', function homeController ($scope, $location, celebritiesFactory, brandsFactory, videosFactory) {
      h = $scope;

      $scope.celebritiesPage={title:'Join Our Selebreties',
                          desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                           While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                          cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'};

    $scope.celebrities=celebritiesFactory.getAllCelebrities();

    $scope.brands= brandsFactory.getAllBrands();

    $scope.newReleaseVids= videosFactory.getAllVideos();

    $scope.recommendedShows= videosFactory.getAllVideos();


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
