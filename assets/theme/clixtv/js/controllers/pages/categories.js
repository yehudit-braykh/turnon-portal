var cats = null;
clixApp.controller('categoriesController', function categoriesController ($scope, $q, categoryFactory, $location) {
      cats = $scope;
      categoryFactory.getCategories().then(function (categories){
          $scope.categories = categories;
      });

      categoryFactory.getCategoryVideos("Sports").then(function (categories){
          $scope.recommendedVideos = categories;
      });


      $scope.go = function (path) {
          $location.path(path);
      }



  });
