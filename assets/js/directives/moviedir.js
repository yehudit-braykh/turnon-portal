var cb = null;

vttApp.directive('moviedir', function() {

    return {
        restrict: 'AE',
        replace: true,
        scope: {
            movie: '='
        },

        controller: ['$scope', function myvideosdirCtrl($scope) {
            cb = $scope;



       }],
       templateUrl: '/assets/html/directives/moviedir.html'
    };
});
