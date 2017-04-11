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
                                console.log('SHARE');
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

    angular.module('clixtv')
        .directive('clixContentCalloutList', calloutCalloutList)
        .directive('clixContentCallout', calloutCallout)
        .directive('clixStarContentCallout', starContentCallout);
}());