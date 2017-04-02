(function() {
    var isLoggedIn = [
        '$rootScope',
        'userService',
        function($rootScope, userService) {
            return {
                restrict: 'AE',
                transclude: {
                    loggedIn: '?loggedIn',
                    notLoggedIn: '?notLoggedIn'
                },
                template: '<div><div ng-if="loggedInUser" ng-transclude="loggedIn"></div><div ng-if="!loggedInUser" ng-transclude="notLoggedIn"></div></div>',
                link: function(scope, element) {

                    $rootScope.$on('user.login', function(event, data) {
                        scope.loggedInUser = data;
                    });

                    $rootScope.$on('user.logout', function(event, data) {
                        scope.loggedInUser = undefined;
                    });

                    userService.getLoggedInUser()
                        .then(
                            function onSuccess(data) {
                                scope.loggedInUser = data;
                            }
                        )
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixIsLoggedIn', isLoggedIn);
}());