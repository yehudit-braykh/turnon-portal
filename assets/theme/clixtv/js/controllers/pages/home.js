var h = null;
clixApp.controller('homeController', function homeController ($scope, $rootScope, $location, videosFactory, categoryFactory) {
      h = $scope;
      $scope.videos = {};
      categoryFactory.getCategories().then(function (categories) {
          $scope.categories = categories;
          for (var i = 0; i <  $scope.categories.length; i++) {
              var title = $scope.categories[i].title;
              videosFactory.getVideoByCat(title).then(function(data){
                  $scope.videos[data[1]]=data[0];
              });
          }
      });
      $scope.getVideos = function (cat) {
          if($scope.videos[cat]) {
               return $scope.videos[cat];
          }else {
              return null;
          }
      }
      $scope.openLogin = function () {
          $('.singin-btn').click();
      }

      $scope.go = function (path) {
          $location.path(path);
      }
  });
