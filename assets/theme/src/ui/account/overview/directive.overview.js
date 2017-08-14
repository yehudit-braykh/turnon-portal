(function() {

    // var overview = function() {
    //     return {
    //         restrict: 'AE',
    //         templateUrl: 'ui/account/overview/view.overview.html',
    //         controller: 'AccountOverviewController'
    //     }
    // };

    // var overviewInput = function() {
    //     return {
    //         restrict: 'AE',
    //         replace: true,
    //         templateUrl: 'ui/account/overview/view.overview-input.html',
    //         controller: 'AccountOverviewInputController',
    //         transclude: {
    //             inputLabel: 'inputLabel'
    //         },
    //         scope: {
    //             ngModel: '=',
    //             onSave: '=',
    //             type: '@'
    //         }
    //     }
    // };

    angular.module('turnon')
        .directive('clixAccountOverview', overview)
        .directive('clixAccountOverviewInput', overviewInput)
}());
