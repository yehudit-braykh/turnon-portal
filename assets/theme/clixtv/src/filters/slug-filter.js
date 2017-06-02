(function() {

    window.slug.charmap['%'] = 'percent';

    var slugFilter = [
        'stringUtils',
        function(stringUtils) {
            return function (input) {
                if (!input) {
                    return input;
                }
                return window.slug(input, {
                    lower: true
                });
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('slug', slugFilter);
}());