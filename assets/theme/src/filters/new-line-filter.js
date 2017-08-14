(function() {
    var newLineBreakFilter = [
        '$sce',
        function($sce) {
            return function (input) {
                if (!input) {
                    return input;
                }
                var breakTag = '<br />';
                var msg = (input + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
                return $sce.trustAsHtml(msg);
            }
        }
    ];

    angular
        .module('turnon')
        .filter('clixNewLineBreak', newLineBreakFilter);
}());