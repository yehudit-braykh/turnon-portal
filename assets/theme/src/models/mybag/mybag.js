var mb = null;
var l = null;
turnOnApp.controller('mybagController', function mybagController ($scope, $location, $http, $log,$interval,$routeParams) {
  mb = $scope;
  l=$location;
  $scope.password = '';
  $scope.purchase = false;
  $scope.pointscount = 0;
  $scope.products = [{ id:'1',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '15000'},
                  { id: '2',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '50000'},
                  {id: '3',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_2@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '10000'},
                  {id: '4',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '10000'},
                  {id: '5',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '15000'},
                  {id: '6',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                   points: '50000'},
                  {id: '7',
                  title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_2@2x.png',
                  type : "MEN'S FOOTBALL SHIRT",
                  description: "A T-shirt (or tee shirt, or tee) is a style of unisex fabric shirt, named after the T shape of the body and sleeves. It is normally associated with short sleeves, a round neck line known as a crew neck, with no collar. T-shirts are generally made of a light, inexpensive fabric, and are easy to clean.",
                  points: '10000'

              }];
  $scope.products.forEach (function(item){
          $scope.itempoint = parseInt(item.points)
          $scope.pointscount +=  $scope.itempoint;
  },this);
  $scope.open_modal = function(){
    $('#mybag_modal').modal('show');
  }
  $scope.confirm_purchase = function(){
    $scope.purchase = true;
  }

  $scope.continue_purchase = function () {
      $('#mybag_modal').modal('toggle');
      $('#mybag_modal').on("hidden.bs.modal", function(){
          $scope.go('/market');
      });
  };
  $scope.go = function (path) {
      if (path== '/market') {
          $location.path(path);
          $scope.$apply();
      }
  };

});
