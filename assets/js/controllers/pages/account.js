var acc = null;
vttApp.controller('aController', function accountController ($scope, $location, $http, $log, User, AuthService) {
    acc = $scope;

    $scope.user  = User.get();
    $scope.selectedChannels=[];
    $scope.MaxChannels=10;
    $scope.search = {text:""};
    $scope.channelsToShow = 18;

    $scope.menu =
    {
        0:{name:"Perfil", id:"perfil"},
        1:{name:"Suscripción", id:"suscripción"},
        2:{name:"Pagos", id:"pagos"},
        3:{name:"Cambio de Contraseña", id:"cambio"},
        4:{name:"Dispositivos", id:"dispositivos"},
        5:{name:"Cambiar Mis Canales", id:"mis-canales"}
    };

    $scope.methods = [
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}},
        {PosterH:{url:"/assets//images/paypal.png"}}
    ];

    $scope.channels=[{id: 1, title:'Argentina', PosterH:{url:'/assets//images/logo1.png'}},
                     {id: 2, title:'Brazil', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 3, title:'Peru', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 4, title:'Peru', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 5, title:'Argentina', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 6, title:'Argentina', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 7, title:'Brazil', PosterH:{url:'/assets//images/logo1.png'}},
                     {id: 8, title:'Argentina', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 9, title:'Argentina', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 10, title:'Peru', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 11, title:'Brazil', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 12, title:'Brazil', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 13, title:'Brazil', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 14, title:'Argentina', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 15, title:'Argentina', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 16, title:'Peru', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 17, title:'Argentina', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 18, title:'Argentina', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 19, title:'Brazil', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 20, title:'Argentina', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 21, title:'Brazil', PosterH:{url:'/assets//images/logo1.png'}},
                     {id: 22, title:'Argentina', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 23, title:'Argentina', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 24, title:'Argentina', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 25, title:'Peru', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 26, title:'Brazil', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 27, title:'Argentina', PosterH:{url:'/assets//images/logo1.png'}},
                     {id: 28, title:'Argentina', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 29, title:'Argentina', PosterH:{url:'/assets//images/logo3.png'}},
                     {id: 30, title:'Brazil', PosterH:{url:'/assets//images/logo5.png'}},
                     {id: 31, title:'Argentina', PosterH:{url:'/assets//images/logo4.png'}},
                     {id: 32, title:'Argentina', PosterH:{url:'/assets//images/logo2.png'}},
                     {id: 33, title:'Peru', PosterH:{url:'/assets//images/logo6.png'}},
                     {id: 34, title:'Argentina', PosterH:{url:'/assets//images/logo5.png'}}];

    /*$scope.user.registeredDevices = {
        0:{name: "iPad", id:"A12345678901234567890"},
        1:{name: "Cellphone", id:"A12345678901234567890"},
        2:{name: "iPone", id:"A12345678901234567890"}
    };*/
    $scope.editingProfile = false;
    $scope.editingPassword = false;
    $scope.billingInfo = true;

    $scope.editProfile = function(){
        $scope.editingProfile = !$scope.editingProfile;
    };
    $scope.editPassword = function(){
        $scope.editingPassword = !$scope.editingPassword;
    };

    $scope.updateProfile = function(){
        AuthService.updateProfile($scope.user);
        $scope.editProfile();
    }

    $scope.go = function(path){
        $location.path(path);
    };

    $scope.uploadImage = function(image){
        console.log(image);
    };

    $scope.isSelectedChannel = function(id){
        return $scope.selectedChannels.indexOf(id)>=0;
    };

    $scope.selectChannel = function(id){
          if($scope.isSelectedChannel(id))
              $scope.selectedChannels.splice($scope.selectedChannels.indexOf(id),1);
          else if ($scope.selectedChannels.length < $scope.MaxChannels)
              $scope.selectedChannels.push(id);
    };

    $scope.channelsFilter = function(item){
        if($scope.search.text=='')
            return item;
        if(item.title.search(new RegExp($scope.search.text, "i")) != -1){
            return item;
        }
    };

    $scope.moreCanales = function(){
        if($scope.channelsToShow < $scope.channels.length)
            $scope.channelsToShow = $scope.channels.length;
        else
            $scope.channelsToShow = 18;
    }


  });
