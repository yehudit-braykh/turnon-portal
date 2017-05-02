(function() {
    var copyright = function() {
        return {
            restrict: 'AE',
            template: '<span>&copy; {{year}} ClixTV, Inc</span>',
            link: function(scope) {
                scope.year = new Date().getFullYear();
            }
        }
    };

    angular.module('clixtv')
        .directive('clixCopyright', copyright);
}());