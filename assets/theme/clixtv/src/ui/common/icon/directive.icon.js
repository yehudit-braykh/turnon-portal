(function() {
    var trophyIndicatorIcon = [
        function() {
            return {
                restrict: 'AE',
                template: '<div class="clix-trophy-indicator-icon clix-circle-container-icon"><div class="icon-rewards-icon-left-nav"></div></div>'
            }
        }
    ];

    var errorIndicatorIcon = [
        function() {
            return {
                restrict: 'AE',
                template: '<div class="clix-error-indicator-icon clix-circle-container-icon"><div class="icon-remove-icon"></div></div>'
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixTrophyIndicatorIcon', trophyIndicatorIcon)
        .directive('clixErrorIndicatorIcon', errorIndicatorIcon);
}());