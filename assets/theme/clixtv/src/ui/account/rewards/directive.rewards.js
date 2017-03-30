(function() {
    var rewards = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/account/rewards/view.rewards.html',
            controller: 'AccountRewardsController'
        }
    };

    angular.module('clixtv')
        .directive('clixAccountRewards', rewards);
}());