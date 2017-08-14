(function() {

    var wordTruncateFilter = [
        function() {
            return function (input, limit, respectWordBoundaries, suffix) {
                if (!input) {
                    return input;
                }
                if (angular.isUndefined(respectWordBoundaries)) {
                    respectWordBoundaries = true;
                }
                if (angular.isUndefined(suffix)) {
                    suffix = '...';
                }

                if (input.length <= limit) {
                    return input;
                }

                limit = limit - suffix.length;

                var trimmedString = input.substr(0, limit);
                if (respectWordBoundaries) {
                    return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + suffix;
                }
                return trimmedString + suffix;
            }
        }
    ];

    angular
        .module('turnon')
        .filter('wordTruncate', wordTruncateFilter);
}());