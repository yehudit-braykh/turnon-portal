(function() {

    var landingPage = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/page/view.landing-page.html',
            transclude: {
                pageTitle: 'pageTitle'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixLandingPage', landingPage);
}());