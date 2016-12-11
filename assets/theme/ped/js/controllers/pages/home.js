var h = null;
peruDigitalApp.controller('homeController', function homeController ($scope, $location, celebritiesFactory, brandsFactory, videosFactory, epgFactory) {
      h = $scope;

      $scope.celebritiesPage={title:'Join Our Selebreties',
                          desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                           While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                          cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'};

    $scope.celebrities=celebritiesFactory.getAllCelebrities();

    $scope.brands= brandsFactory.getAllBrands();

    $scope.newReleaseVids= videosFactory.getAllVideos();

    $scope.recommendedShows= videosFactory.getAllVideos();

    $scope.channel1= epgFactory.getEpgByChannelId(1);

    $scope.channel2= epgFactory.getEpgByChannelId(2);

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



    $scope.go = function(path){
        $location.path(path);
    }


    $('.multi-item-carousel').carousel({
  interval: false
});

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
$('.multi-item-carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this));
  } else {
  	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
  }
});

  });
