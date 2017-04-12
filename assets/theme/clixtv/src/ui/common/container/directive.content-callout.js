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
                menuItems: '='
            }
        }
    };

    var starContentCallout = [
        '$state',
        function($state) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.star-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    star: '='
                },
                link: function(scope) {
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
                            label: 'Add to Favorites',
                            icon: 'icon-favorite-icon',
                            onClick: function() {
                                console.log('SHARE');
                            }
                        },
                        {
                            label: 'Go to Stars Page',
                            icon: 'icon-stars-icon',
                            onClick: function() {
                                $state.go('star', { id: scope.star.id })
                            }
                        },
                        {
                            label: 'Go to Offers',
                            icon: 'icon-offers-icon',
                            onClick: function() {
                                $state.go('star', { id: scope.star.id, tab: 'brands' })
                            }
                        },
                        {
                            label: 'Go to Charities',
                            icon: 'icon-charities-icon-bottom-nav',
                            onClick: function() {
                                $state.go('star', { id: scope.star.id, tab: 'charities' })
                            }
                        }
                    ];
                }
            }
        }
    ];

    var brandContentCallout = [
        '$state',
        function($state) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.brand-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    brand: '='
                },
                link: function(scope) {
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
                            label: 'Add to Favorites',
                            icon: 'icon-favorite-icon',
                            onClick: function() {
                                console.log('SHARE');
                            }
                        }
                    ];
                }
            }
        }
    ];

    var charityContentCallout = [
        '$state',
        function($state) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.charity-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    charity: '='
                },
                link: function(scope) {
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
                            label: 'Add to Favorites',
                            icon: 'icon-favorite-icon',
                            onClick: function() {
                                console.log('SHARE');
                            }
                        }
                    ];
                }
            }
        }
    ];

    var offerContentCallout = [
        '$state',
        function($state) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.offer-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    offer: '='
                },
                link: function(scope) {
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
                            label: 'Add to Favorites',
                            icon: 'icon-favorite-icon',
                            onClick: function() {
                                console.log('SHARE');
                            }
                        }
                    ];
                }
            }
        }
    ];

    var categoryContentCallout = [
        '$state',
        function($state) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.category-content-callout.html',
                controller: 'ContentCalloutController',
                scope: {
                    category: '='
                },
                link: function(scope) {
                    scope.menuItems = [
                        {
                            label: 'Share',
                            icon: 'icon-share-icon',
                            onClick: function() {
                                scope.onSharePress('category', scope.category);
                            }
                        },
                        {
                            label: 'Add to Favorites',
                            icon: 'icon-favorite-icon',
                            onClick: function() {
                                console.log('SHARE');
                            }
                        }
                    ];
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