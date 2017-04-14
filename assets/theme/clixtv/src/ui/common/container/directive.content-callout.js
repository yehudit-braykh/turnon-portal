(function() {

    var calloutCalloutList = function() {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            templateUrl: 'ui/common/container/view.content-callout-list.html',
            scope: {
                items: '=',
                largeColClass: '@?'
            }
        }
    };

    var calloutCallout = function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'ui/common/container/view.content-callout.html',
            controller: 'ContentCalloutController',
            transclude: {
                headerElement: 'headerElement',
                titleContent: 'titleContent',
                subtitleContent: 'subtitleContent'
            },
            scope: {
                sref: '@',
                menuItems: '=',
                onFavorite: '&',
                isFavorited: '='
            }
        }
    };

    var starContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.star-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    star: '='
                },
                link: function(scope) {

                    function _resetMenuItems() {
                        var isFavorite = userService.isFavoriteCelebrity(scope.star.id);
                        scope.menuItems = [
                            {
                                label: 'Share',
                                icon: 'icon-share-icon',
                                points: '50',
                                onClick: function() {
                                    scope.onSharePress('celebrity', scope.star);
                                }
                            },
                            {
                                label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-favorite-icon',
                                onClick: function() {
                                    scope.onFavoritePress('celebrity', scope.star);
                                }
                            },
                            {
                                label: 'Go to Star Page',
                                icon: 'icon-stars-icon',
                                onClick: function() {
                                    $state.go('star', { id: scope.star.id });
                                }
                            },
                            {
                                label: 'Go to Offers',
                                icon: 'icon-offers-icon',
                                onClick: function() {
                                    $state.go('star', { id: scope.star.id, tab: 'brands' });
                                }
                            },
                            {
                                label: 'Go to Charities',
                                icon: 'icon-charities-icon-bottom-nav',
                                onClick: function() {
                                    $state.go('star', { id: scope.star.id, tab: 'charities' });
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();

                }
            }
        }
    ];

    var brandContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.brand-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    brand: '='
                },
                link: function(scope) {

                    function _resetMenuItems() {
                        var isFavorite = userService.isFavoriteBrand(scope.brand.id);
                        scope.menuItems = [
                            {
                                label: 'Share',
                                icon: 'icon-share-icon',
                                points: '50',
                                onClick: function() {
                                    scope.onSharePress('brand', scope.brand);
                                }
                            },
                            {
                                label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-favorite-icon',
                                onClick: function() {
                                    scope.onFavoritePress('brand', scope.brand);
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();
                }
            }
        }
    ];

    var charityContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.charity-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    charity: '='
                },
                link: function(scope) {

                    function _resetMenuItems() {
                        var isFavorite = userService.isFavoriteCharity(scope.charity.id);
                        scope.menuItems = [
                            {
                                label: 'Share',
                                icon: 'icon-share-icon',
                                points: '50',
                                onClick: function() {
                                    scope.onSharePress('charity', scope.charity);
                                }
                            },
                            {
                                label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-favorite-icon',
                                onClick: function() {
                                    scope.onFavoritePress('charity', scope.charity);
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();
                }
            }
        }
    ];

    var offerContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.offer-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    offer: '='
                },
                link: function(scope) {
                    function _resetMenuItems() {

                        // TODO - Wire this up...
                        var isFavorite = false;
                        scope.menuItems = [
                            {
                                label: 'Save Offer',
                                icon: 'icon-redeem-plus-icon',
                                onClick: function() {
                                    console.log('SHARE');
                                }
                            },
                            {
                                label: 'Share',
                                icon: 'icon-share-icon',
                                points: '50',
                                onClick: function() {
                                    scope.onSharePress('offer', scope.offer);
                                }
                            },
                            {
                                label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-favorite-icon',
                                onClick: function() {
                                    scope.onFavoritePress('offer', scope.offer);
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();
                }
            }
        }
    ];

    var categoryContentCallout = [
        '$state',
        '$rootScope',
        'userService',
        function($state, $rootScope, userService) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.category-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    category: '='
                },
                link: function(scope) {
                    function _resetMenuItems() {
                        var isFavorite = userService.isFavoriteCategory(scope.category.id);
                        scope.menuItems = [
                            {
                                label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
                                icon: isFavorite ? 'icon-remove-icon' : 'icon-favorite-icon',
                                onClick: function() {
                                    scope.onFavoritePress('category', scope.category);
                                }
                            }
                        ];
                    }

                    $rootScope.$on('user.login', _resetMenuItems);
                    $rootScope.$on('favorite.added', _resetMenuItems);
                    $rootScope.$on('favorite.removed', _resetMenuItems);

                    _resetMenuItems();
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixContentCalloutList', calloutCalloutList)
        .directive('clixContentCallout', calloutCallout)
        .directive('clixStarContentCallout', starContentCallout)
        .directive('clixBrandContentCallout', brandContentCallout)
        .directive('clixCharityContentCallout', charityContentCallout)
        .directive('clixOfferContentCallout', offerContentCallout)
        .directive('clixCategoryContentCallout', categoryContentCallout);
}());