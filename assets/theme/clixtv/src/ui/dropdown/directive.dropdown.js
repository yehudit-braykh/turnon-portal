(function() {

    var dropdown = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/dropdown/view.dropdown.html',
            controller: 'DropdownController',
            scope: {
                options: '=',
                placeholderText: '@?',
                ngModel: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixDropdown', dropdown);
}());