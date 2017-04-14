(function() {

    var viewButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/buttons/view.view-button.html',
            scope: {
                text: '@?'
            }
        }
    };

    var saveButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/buttons/view.save-button.html',
            scope: {
                isSaved: '='
            }
        }
    };

    var favoriteButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/buttons/view.favorite-button.html',
            scope: {
                isFavorite: '='
            }
        }
    };

    var shareButton = function() {
        return {
            restrict: 'AE',
            replace: true,
            controller: 'ShareButtonController',
            templateUrl: 'ui/common/buttons/view.share-button.html',
            scope: {
                extraClass: '@?',
                offer: '=?',
                video: '=?',
                celebrity: '=?',
                brand: '=?',
                charity: '=?',
                category: '=?'
            }
        }
    };

    angular.module('clixtv')
        .directive('clixViewButton', viewButton)
        .directive('clixSaveButton', saveButton)
        .directive('clixFavoriteButton', favoriteButton)
        .directive('clixShareButton', shareButton);
}());