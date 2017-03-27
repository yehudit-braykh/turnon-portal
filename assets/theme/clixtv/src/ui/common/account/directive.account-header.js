(function() {
    var accountHeader = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/account/view.account-header.html',
            transclude: {
                headerText: 'headerText',
                accessoryView: '?accessoryView'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixAccountHeader', accountHeader);
}());