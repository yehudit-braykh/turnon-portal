var acc = null;
vttApp.controller('aController', function accountController ($scope, $location, $http, $log, User, AuthService) {
    acc = $scope;

    $scope.user  = User;

    $scope.menu =
    {
        0:{name:"Perfil", id:"perfil"},
        1:{name:"Suscripción", id:"suscripción"},
        2:{name:"Pagos", id:"pagos"},
        3:{name:"Cambio de Contraseña", id:"cambio"},
        4:{name:"Dispositivos", id:"dispositivos"},
        5:{name:"Cambiar Mis Canales", id:"mis-canales"}
    };

    $scope.channels = [
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}},
        {PosterH:{url:"/assets/theme/vtt/images/paypal.png"}}
    ];

    $scope.user.registeredDevices = {
        0:{name: "iPad", id:"A12345678901234567890"},
        1:{name: "Cellphone", id:"A12345678901234567890"},
        2:{name: "iPone", id:"A12345678901234567890"}
    };
    $scope.editing = false;
    $scope.billingInfo = true;

    $scope.edit = function(){
        $scope.editing = !$scope.editing;
    };

    $scope.go = function(path){
        $location.path(path);
    }

    $scope.uploadImage = function(image){
        console.log(image);
    }

  });
