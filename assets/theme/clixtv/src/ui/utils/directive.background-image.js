(function() {
    var backgroundImage = [
        '$parse',
        function($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    attrs.$observe('clixBackgroundImage', function(value) {
                        element.css({
                            'background-image': 'url(' + value +')'
                        });
                    });
                }
            };
        }
    ];

    angular.module('clixtv')
        .directive('clixBackgroundImage', backgroundImage);
}());