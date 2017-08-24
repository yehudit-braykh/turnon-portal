var ma = null;
turnOnApp.controller('marketController', function marketController ($scope, $location, $http, $log,$interval) {
  ma = $scope;

  $scope.products = [{title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  points: '15 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  points: '50 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_2@2x.png',
                  points: '10 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_1@2x.png',
                  points: '10 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/shoes_1@2x.png',
                  points: '15 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/bag_1@2x.png',
                  points: '50 000',
                  description: "MEN'S FOOTBALL SHIRT"},
                  {title:'2016 BRAZIL CBF MATCH HOME',
                  url:'assets/theme/src/images/market/t_shirt_2@2x.png',
                  points: '10 000',
                  description: "MEN'S FOOTBALL SHIRT"}];

  $scope.brands = [{title:'Nike',
                  value: "nike"},
                  {title:'Adidas',
                  value: "adidas"},
                  {title:'Puma',
                  value: "puma"},
                  {title:'Reebok',
                  value: "reebok"},
                  {title:'New Balance',
                  value: "new_balance"}];

  $scope.types = [{title:'Trainers',
                  value: "trainers"},
                  {title:'Shirt',
                  value: "shirt"},
                  {title:'Sweatshirt',
                  value: "sweatshirt"},
                  {title:'Pants',
                  value: "pants"},
                  {title:'Shorts',
                  value: "shorts"}];

  $scope.sizes = [{title:'S',
                  value: "s"},
                  {title:'M',
                  value: "m"},
                  {title:'L',
                  value: "l"},
                  {title:'XL',
                  value: "xl"},
                  {title:'XXL',
                  value: "xxl"}];

  $scope.colors = [{title:'Blue',
                  value: "blue"},
                  {title:'Gold',
                  value: "gold"},
                  {title:'White',
                  value: "white"},
                  {title:'Black',
                  value: "black"},
                  {title:'Green',
                  value: "green"},
                  {title:'Brown',
                  value: "brown"},
                  {title:'Yellow',
                  value: "yellow"},
                  {title:'Purple',
                  value: "purple"},
                  {title:'Pink',
                  value: "pink"},
                  {title:'Gray',
                  value: "gray"}];
  $scope.slider = {
      minValue: 10000,
      maxValue: 25000,
      options: {
          floor: 10,
          ceil: 50000,
          step: 10
      }
  };

});
