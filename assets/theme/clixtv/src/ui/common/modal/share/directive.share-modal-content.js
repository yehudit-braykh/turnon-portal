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

    var shareModalCelebrityContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-celebrity-content.html',
            scope: {
                celebrity: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixShareModalVideoContent', shareModalVideoContent)
        .directive('clixShareModalCelebrityContent', shareModalCelebrityContent);
}());