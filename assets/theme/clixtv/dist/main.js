(function() {
    var module = angular
        .module('clixtv', [
            'ngRoute'
        ])
        .config([
            '$locationProvider',
            '$routeProvider',
            '$httpProvider',
            function($locationProvider, $routeProvider, $httpProvider) {
                $locationProvider.hashPrefix('!');
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                $routeProvider
                    .when('/', {
                        templateUrl: 'ui/home/view.home.html',
                        controller: 'HomeController'
                    })
            }
        ]);


    angular.element(document).ready(function() {
        angular.bootstrap(document, ['clixtv']);
    });
}());

angular.module('clixtv').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui/categories/view.video-category-scroll-list.html',
    "<div class=video-category-scroll-list ng-show=category.title><h2><a href=#>{{category.title}} <i class=icon-right-arrow></i></a></h2><div class=video-list-container><div class=video-inner-list-container><div class=video-container style=\"width: {{videoContainerWidth}}px\" ng-repeat=\"video in category.videos\"><clix-video-content-box video=video></clix-video-content-box></div></div><a href=# class=\"arrow-container left-arrow-container\"><i class=icon-left-tall-arrow></i></a></div></div>"
  );


  $templateCache.put('ui/clix-sec-block/clix-sec-block.html',
    "<div class=BOOP></div>"
  );


  $templateCache.put('ui/footer/view.footer.html',
    "<footer class=clix-footer><div class=footer-content><div class=footer-column><div class=icon-clixtv-footer-logo></div></div><div class=footer-column><div class=footer-label>Company</div><ul class=footer-list><li><a href=#>What is ClixTV?</a></li><li><a href=#>Investor Relations</a></li><li><a href=#>Advertisers</a></li><li><a href=#>Jobs</a></li><li><a href=#>Press</a></li><li><a href=#>News</a></li></ul></div><div class=footer-column><div class=footer-label>Useful Links</div><ul class=footer-list><li><a href=#>Store</a></li><li><a href=#>Charities</a></li><li><a href=#>Celebrities</a></li><li><a href=#>Affiliates</a></li><li><a href=#>Rewards</a></li><li><a href=#>Video Categories</a></li><li><a href=#>Help</a></li><li><a href=#>Contact</a></li></ul></div><div class=footer-column><a href=# class=social-icon><i class=icon-facebook-logo></i> </a><a href=# class=social-icon><i class=icon-twitter-logo></i> </a><a href=# class=social-icon><i class=icon-youtube-logo></i> </a><a href=# class=social-icon><i class=icon-instagram-logo></i></a></div></div><div class=footer-legal-container><div class=footer-legal-column><a href=#>Legal</a></div><div class=footer-legal-column><a href=#>Cookies</a></div><div class=footer-legal-column>&copy; ClixTV, Inc</div></div></footer>"
  );


  $templateCache.put('ui/header/view.header-search-icon.html',
    "<div class=search-bar ng-class=\"{'inactive': !searchBarVisible}\"><div class=search-bar-background><a href=# class=search-icon-container ng-click=searchIconClicked($event)><i class=icon-search-icon></i> </a><input type=text placeholder=Search...></div></div>"
  );


  $templateCache.put('ui/header/view.header.html',
    "<header class=clix-header clix-scroll-offset-class offset=100 scroll-class=filled><h1 class=logo-container><a href=#><img src=assets/theme/clixtv/dist/images/logo.png class=clix-logo></a></h1><nav class=clix-navigation><div class=navigation-item-container><a href=#>Categories</a></div><div class=navigation-item-container><a href=#>Stars</a></div><div class=navigation-item-container><a href=#>Brands</a></div><div class=navigation-item-container><a href=#>Charities</a></div><div class=\"navigation-item-container search-item-container\"><clix-header-search-icon></clix-header-search-icon></div></nav></header>"
  );


  $templateCache.put('ui/home/view.home.html',
    "<div class=home-page><div class=main-video-container><video src=http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5829ca559c56fb0004f1fd6d/file.mp4 autoplay loop muted></video><div class=video-overlay></div></div><div ng-repeat=\"category in categories\"><clix-video-category-scroll-list category=category></clix-video-category-scroll-list></div></div>"
  );


  $templateCache.put('ui/tooltip-menu/view.tooltip-menu.html',
    "<div class=tooltip-menu><menu class=menu-container ng-show=menuopen><menuitem ng-repeat=\"item in items\"><a ng-click=item.onClick() class=menu-item><i class=\"menu-icon {{item.icon}}\"></i> {{item.label}}</a></menuitem></menu></div>"
  );


  $templateCache.put('ui/video-content-box/view.video-content-box.html',
    "<div class=video-content-box><div class=header-container><clix-tooltip-menu items=items menuopen=menuVisible class=menu-container ng-hide=!menuVisible></clix-tooltip-menu><div class=header-inner-content><a href=#><div class=artist-avatar style=\"background-image: url({{video.PosterH.url}})\"></div></a><div class=artist-name><a href=#>{{video.artist_name}}</a></div><a class=menu-icon-container ng-click=menuClicked()><i class=icon-ellipsis></i></a></div></div><div class=video-thumbnail style=\"background-image: url({{video.PosterH.url}})\"><div class=video-thumbnail-inner-container><div class=violator-container><clix-violator>100 Reward Points</clix-violator></div><div class=video-brand-icon-list><div class=video-brand-icon ng-repeat=\"brand in video.brands | limitTo: 5 track by $index\" style=\"background-image: url({{brand.BrandTransparentLogo.url}})\"></div></div></div><div class=action-buttons-container><a href=# class=save-button><div class=\"icon-save-icon-normal button-normal\"></div><div class=\"icon-save-icon-hover button-hover\"></div><div class=\"icon-save-icon-click button-click\"></div></a><a href=# class=play-button><div class=\"icon-play-button-normal button-normal\"></div><div class=\"icon-play-button-hover button-hover\"></div><div class=\"icon-play-button-click button-click\"></div></a></div></div><div class=footer-container><a href=#><span class=series-title>{{video.title}}</span><br><span class=episode-title>Episode 1: {{video.title}}</span></a></div></div>"
  );


  $templateCache.put('ui/violator/view.violator.html',
    "<div class=violator>100 Reward Points</div>"
  );

}]);

(function() {

    var VideoCategoryScrollList = [
        '$scope',
        '$window',
        '$timeout',
        function($scope, $window, $timeout) {

            function _recalculateWidth() {
                $scope.videoContainerWidth = $window.innerWidth / 5.7;
                $timeout(function() {
                    $scope.$apply();
                });
            }

            angular.element($window).on('resize.doResize', function () {
                _recalculateWidth();
            });

            _recalculateWidth();
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoCategoryScrollList', VideoCategoryScrollList);
}());
(function() {
    var videoCategoryScrollList = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/categories/view.video-category-scroll-list.html',
            controller: 'VideoCategoryScrollList',
            scope: {
                category: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoCategoryScrollList', videoCategoryScrollList);
}());
(function() {
    var clixSecBlock = function() {
        return {
            restrict: 'A',
            templateUrl: 'ui/clix-sec-block/view.clix-sec-block.html',
            scope: {

            }
        }
    };
    angular.module('clixtv')
        .directive('clix-sec-block', clixSecBlock);
}());
(function() {
    var footer = function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/footer/view.footer.html',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixFooter', footer);
}());
(function() {

    var HeaderSearchIconController = [
        '$scope',
        function($scope) {

            $scope.searchBarVisible = false;

            $scope.searchIconClicked = function($event) {
                $event.preventDefault();
                $scope.searchBarVisible = !$scope.searchBarVisible;
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderSearchIconController', HeaderSearchIconController);
}());
(function() {

    var HeaderController = [
        '$scope',
        '$window',
        function($scope, $window) {

        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderController', HeaderController);
}());
(function() {
    var header = function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/header/view.header.html',
            controller: 'HeaderController',
            scope: {

            }
        }
    };

    var headerSearchIcon = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/header/view.header-search-icon.html',
            controller: 'HeaderSearchIconController'
        }
    };

    angular.module('clixtv')
        .directive('clixHeaderBar', header)
        .directive('clixHeaderSearchIcon', headerSearchIcon);
}());
(function() {

    var HomeController = [
        '$q',
        '$scope',
        'categoryService',
        'brandsService',
        function($q, $scope, categoryService, brandsService) {

            function _loadVideosForCategoryIndex(index) {
                var category = $scope.categories[index];
                if (!category) {
                    return;
                }

                categoryService.getCategoryVideosByName(category.title)
                    .then(
                        function onSuccess(data) {
                            var videos = data.data;

                            // Assign the brands for each video
                            videos.forEach(function(video) {
                                video.brands = (video.brands || []).map(function(brand) {
                                    return $scope.brands[brand];
                                });
                            });

                            $scope.categories[index].videos = videos;
                        }
                    );

                _loadVideosForCategoryIndex(index + 1);
            }

            $q.all(
                    [
                        categoryService.getAllCategories(),
                        brandsService.getAllBrands()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.categories = data[0].data;
                        $scope.brands = data[1].data;
                        _loadVideosForCategoryIndex(0);
                    }
                );
        }
    ];

    angular
        .module('clixtv')
        .controller('HomeController', HomeController);
}());
(function() {

    var TooltipMenuController = [
        '$q',
        '$scope',
        function($q, $scope) {

        }
    ];

    angular
        .module('clixtv')
        .controller('TooltipMenuController', TooltipMenuController);
}());
(function() {

    var tooltipMenu = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/tooltip-menu/view.tooltip-menu.html',
            controller: 'TooltipMenuController',
            scope: {
                items: '=',
                menuopen: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixTooltipMenu', tooltipMenu);
}());
(function() {
    var scrollOffsetClass = [
        '$window',
        function($window) {
            return {
                restrict: 'AE',
                scope: {
                    offset: '@',
                    scrollClass: '@'
                },
                link: function(scope, element) {
                    angular.element($window).on('scroll', function() {
                        if (this.pageYOffset >= parseInt(scope.offset)) {
                            element.addClass(scope.scrollClass);
                        } else {
                            element.removeClass(scope.scrollClass);
                        }
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixScrollOffsetClass', scrollOffsetClass);
}());
(function() {

    var VideoContentBoxController = [
        '$q',
        '$scope',
        function($q, $scope) {

            $scope.menuVisible = false;

            $scope.items = [
                {
                    label: 'Add to Watchlist',
                    icon: 'icon-save-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Go to Star Page',
                    icon: 'icon-stars-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add Star to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.menuClicked = function() {
                $scope.menuVisible = !$scope.menuVisible;
                $scope.test = 'fdsa';
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoContentBoxController', VideoContentBoxController);
}());
(function() {
    var videoContentBox = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/video-content-box/view.video-content-box.html',
            controller: 'VideoContentBoxController',
            scope: {
                video: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoContentBox', videoContentBox);
}());
(function() {
    var violator = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/violator/view.violator.html',
            scope: {

            }
        }
    };

    angular.module('clixtv')
        .directive('clixViolator', violator);
}());
(function() {

    var brandsService = [
        '$http',
        function($http) {
            return {

                getAllBrands: function() {

                    /**
                     * @todo - Cache this call
                     */
                    return $http.get('/api/brands/get_all_brands_and_charities_object');
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('brandsService', brandsService);
}());
(function() {

    var categoryService = [
        '$http',
        function($http) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getAllCategories: function() {
                    return $http.get('/api/category/get_all_categories');
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryByName: function(name) {
                    return $http.get('/api/category/get_category_by_name/?category=' + name);
                },

                /**
                 * @todo - Cache this call
                 */
                getCategoryVideosByName: function(name) {
                    return $http.get('/api/category/get_category_videos?category=' + name);
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('categoryService', categoryService);
}());