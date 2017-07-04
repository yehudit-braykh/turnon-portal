var cc = null;

vttApp.directive('featurdir', function() {

    return {
        restrict: 'AE',
        replace: true,
        scope: {
            featuredVideo: '='
        },

        controller: ['$scope', function myvideosdirCtrl($scope) {
            cc = $scope;
            



       }],

       templateUrl: '/assets/html/directives/featuredVideosdir.html'
    };
});
