var cat = null;
clixApp.controller('categoryController', function categoriesController ($scope, categoryFactory, $location, $routeParams, User) {
      cat = $scope;
      $scope.search='';
      $scope.selectedFilter='';
      $scope.sortField = '';

      $scope.categoryName =$routeParams.categoryName;

      window.onscroll = function(){
          var windowYOffset = window.pageYOffset,
              elBackgrounPos = "50% " + (-1*windowYOffset * 0.5) + "px";
          $(".categories-header").css('background-position', elBackgrounPos);
        };

      categoryFactory.getCategoryByName($scope.categoryName).then(function(cat){
          $scope.category= cat;
      });

      categoryFactory.getCategories().then(function (categories){
          $scope.categories = categories;
      });

      categoryFactory.getCategories().then(function (categories){
          $scope.categories = categories;
      });

      categoryFactory.getCategoryVideos($scope.categoryName).then(function (categories){
          $scope.categoryVideos = categories;
      });

      $scope.selectVideo = function (index) {
            $scope.selectedVid = $scope.categoryVideos[index];
      }

      $scope.videosFilter = function(item){
          if(!$scope.search && !$scope.selectedFilter)
            return item;
        if (!$scope.selectedFilter)
            if(item.title.toLowerCase().includes($scope.search.toLowerCase()))
                return item;
    }

    $scope.sortBy = function(field){
        $scope.sortField = field;
    }

    $scope.go = function (path) {
        $location.path(path);
    }

    $scope.isFavorite = function(){
        if($scope.category)
            return User.isFavorite($scope.category._id, 'category');
    }

    $scope.addRemoveFavorites = function(){
        if($scope.category)
            User.addRemoveFavorites($scope.category._id, 'category');
    }
  });
