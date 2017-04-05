(function() {
    var dateFilter = [
        function() {
            return function (input, type) {
                if (!input) {
                    return input;
                }
                return moment(input).format('M/D/YYYY');
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('clixDate', dateFilter);
}());