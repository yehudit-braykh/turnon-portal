var celeb = null;
peruDigitalApp.controller('celebrityController', function celebrityController ($scope) {
      celeb = $scope;

      $scope.celebrity={title:'Martio Hart',
                          desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                           While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                          cover_url:'/assets/theme/ped/images/static-images/bgs/celebrity.png'};

      $scope.videos = [{name:'Andrés Remezzano', date:'2/4/2016', icon_url:'/assets/theme/ped/images/static-images/videos/video1.png'},
                            {name:'Mariana Kout', date:'2/4/2016', icon_url:'/assets/theme/ped/images/static-images/videos/video2.png'},
                            {name:'Reinaldo Aragón', date:'2/4/2016', icon_url:'/assets/theme/ped/images/static-images/videos/video3.png'},
                            {name:'Martio Hart', date:'2/4/2016', icon_url:'/assets/theme/ped/images/static-images/videos/video4.png'},
                            {name:'Lucho Trizano', date:'2/4/2016', icon_url:'/assets/theme/ped/images/static-images/videos/video5.png'},
                            {name:'Josie Sandoval', date:'2/4/2016', icon_url:'/assets/theme/ped/images/static-images/videos/video6.png'},
                            {name:'Vernon Colon', date:'2/4/2016', icon_url:'/assets/theme/ped/images/static-images/videos/video7.png'},
                            {name:'Christine Farmer', date:'2/4/2016', icon_url:'/assets/theme/ped/images/static-images/videos/video8.png'},
                            {name:'Eddie Hammond', date:'2/4/2016', icon_url:'/assets/theme/ped/images/static-images/videos/video4.png'}];

    $scope.otherCelebrities = [{name:'Andrés Remezzano', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb1.png'},
                          {name:'Mariana Kout', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb2.png'},
                          {name:'Reinaldo Aragón', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb3.png'},
                          {name:'Martio Hart', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb4.png'},
                          {name:'Lucho Trizano', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb5.png'},
                          {name:'Josie Sandoval', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb6.png'},
                          {name:'Vernon Colon', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb7.png'},
                          {name:'Christine Farmer', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb8.png'},
                          {name:'Eddie Hammond', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb9.png'}];


        $scope.go = function(path){
            $location.path(path);
        }
  });
