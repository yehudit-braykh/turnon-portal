var eb=null
turnOnApp.directive('eventBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          limit: "=",
          order: "@",
          reverse: "=",
          link: "=",
          search: '='
      },
      controller: ['$scope', '$location','$rootScope', function eventController($scope, $location, $rootScope) {
          eb = $scope;
          $scope.date = new Date();
          $scope.currentVideo = [];
          $scope.go = function (path) {
              $location.path(path);
          };
          $scope.getPurchaseEvent = function(choosenevent){
             $rootScope.$broadcast("choose_event",choosenevent);
            // $scope.purchaseEvent = event;
            $('#discover_modal').modal('show');
          }

      }],
      templateUrl: '/assets/theme/src/directives/event_block/event_block.html',
    };
  })
