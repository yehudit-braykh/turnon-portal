(function() {

    var slugFilter = [
        'stringUtils',
        function(stringUtils) {
            return function (input) {
                return stringUtils.getSlugForString(input);
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('slug', slugFilter);
}());