var cb = null;

vttApp.directive('videosdir', function() {
    
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            video: '='
        },

        controller: ['$scope', function myvideosdirCtrl($scope) {
            cb = $scope;



       }],
       templateUrl: '/assets/html/directives/videosdir.html'
    };
});
