(function() {
    var headerPointsViolator = [
        'userService',
        '$state',
        function(userService, $state) {
            return {
                restrict: 'AE',
                transclude: true,
                controller: 'PointsViolatorController',
                templateUrl: 'ui/violator/view.header-points-violator.html',
                scope: {
                    points: '='
                },
                link: function(scope) {
                    scope.onRewardPointsPress = function() {
                        userService.getLoggedInUser()
                            .then(
                                function onSuccess(data) {
                                    if (data && data._id) {
                                        $state.go('account', { section: 'rewards' });
                                    }
                                }
                            )
                    };
                }
            }
        }
        ];

    angular.module('clixtv')
        .directive('clixHeaderPointsViolator', headerPointsViolator);
}());