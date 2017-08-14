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

    var shareModalOfferContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-offer-content.html',
            scope: {
                offer: '='
            }
        }
    };

    var shareModalBrandContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-brand-content.html',
            scope: {
                brand: '='
            }
        }
    };

    var shareModalCharityContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-charity-content.html',
            scope: {
                charity: '='
            }
        }
    };

    var genericModalCelebrityContent = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.generic-share-content.html',
            transclude: {
                shareTitle: 'shareTitle',
                shareDescription: '?shareDescription',
                shareIconContainer: 'shareIconContainer',
                shareFooterTitle: 'shareFooterTitle'
            }
        }
    };

    var shareModalConnectButton = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/common/modal/share/view.share-modal-connect-button.html',
            transclude: true
        }
    };

    angular.module('turnon')
        .directive('clixShareModalVideoContent', shareModalVideoContent)
        .directive('clixShareModalCelebrityContent', shareModalCelebrityContent)
        .directive('clixShareModalOfferContent', shareModalOfferContent)
        .directive('clixShareModalBrandContent', shareModalBrandContent)
        .directive('clixShareModalCharityContent', shareModalCharityContent)
        .directive('clixGenericShareContent', genericModalCelebrityContent)
        .directive('clixShareModalConnectButton', shareModalConnectButton);
}());