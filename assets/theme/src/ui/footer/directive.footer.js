(function() {
    var footer = function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/footer/view.footer.html',
            controller: 'FooterController',
            scope: {

            }
        }
    };

    angular.module('turnon')
        .directive('clixFooter', footer);
}());