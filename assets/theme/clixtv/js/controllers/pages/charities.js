var chs = null;
clixApp.controller('charitiesController', function charitiesController ($scope, $location, $route, brandsFactory) {
      chs = $scope;


      $scope.search='';
      $scope.selectedFilter='';
      $scope.sortField = '';

      brandsFactory.getAllCharities().then(function(data){
          $scope.charities=data;
      });

      $scope.charitiesFilter = function(item){
          if(!$scope.search && !$scope.selectedFilter)
            return item;
        if (!$scope.selectedFilter)
            if(item.title.toLowerCase().includes($scope.search.toLowerCase()))
                return item;
    }

    $scope.sortBy = function(field){
        $scope.sortField = field;
    }

      $scope.header={cover_url:'/assets/theme/clixtv/images/charities/cover.png',
                    icon_url:'/assets/theme/clixtv/images/charities/icon.png',
                    title:'Charity is Charity',
                    desc:'So you’re trying to surf a site like myspace, hotmail or yahoo mail from work or school and its blocked by your school,\
                            work or government. Or maybe you want to go on a site without anyone knowing what your doing. '};

      $scope.go = function (path) {
          $location.path(path);
      }

  });
