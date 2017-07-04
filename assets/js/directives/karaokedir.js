var cc = null;

vttApp.directive('karaokedir', function() {

    return {
        restrict: 'AE',
        replace: true,
        scope: {
            karaoke: '='
        },

        controller: ['$scope', function myvideosdirCtrl($scope) {
            cc = $scope;
            




       }],

       templateUrl: '/assets/html/directives/karaokedir.html'
    };
});
