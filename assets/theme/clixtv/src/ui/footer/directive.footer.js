(function() {
    var footer = function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/footer/view.footer.html',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixFooter', footer);
}());