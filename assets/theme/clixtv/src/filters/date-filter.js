(function() {
    var dateFilter = [
        function() {
            return function (input, type) {
                if (!input) {
                    return input;
                }
                var format = (type === 'long') ? 'D MMMM YYYY' : 'M/D/YYYY';
                return moment(input).format(format);
            }
        }
    ];

    angular
        .module('clixtv')
        .filter('clixDate', dateFilter);
}());