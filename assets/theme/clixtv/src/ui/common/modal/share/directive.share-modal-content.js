(function() {

    var shareModalVideoContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-video-content.html',
            scope: {
                video: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixShareModalVideoContent', shareModalVideoContent);
}());