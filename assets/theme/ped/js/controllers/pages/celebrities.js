var celebs = null;
peruDigitalApp.controller('celebritiesController', function celebritiesController ($scope, $location) {
      celebs = $scope;

      $scope.celebritiesPage={title:'Join Our Selebreties',
                          desc:'In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble.\
                           While NASA has had many ups and downs, the launch and continued operation of the Hubble space telescope probably ranks next to the moon.',
                          cover_url:'/assets/theme/ped/images/static-images/bgs/celebrities.png'};

      $scope.celebrities = [{name:'Andrés Remezzano', icon_url:'/assets/theme/ped/images/static-images/celebs/celeb1.png'},
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
