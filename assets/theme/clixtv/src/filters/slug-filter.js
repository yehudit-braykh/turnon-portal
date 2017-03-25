(function() {

    var slugFilter = [
        'stringUtils',
        function(stringUtils) {
            return function (input) {
                if (!input) {
                    return input;
                }
                return stringUtils.getSlugForString(input);
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('slug', slugFilter);
}());