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

  });
