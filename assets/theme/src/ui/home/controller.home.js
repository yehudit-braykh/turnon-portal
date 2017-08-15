var he = null;
angular.module('turnon').controller('HomeController', function HomeController ($scope) {
      he = $scope;
      // $scope.sportLogos = [{title:'Soccer',
      //                   url:'assets/images/categories/soccer_gray.png'},
      //                   {title:'American football',
      //                   url:'assets/images/categories/american_football_gray.png'},
      //                   {title:'American football_3',
      //                   url:'assets/images/categories/3_gray.png'},
      //                   {title:'American football_4',
      //                   url:'assets/images/categories/4_gray.png'},
      //                   {title:'American football_5',
      //                   url:'assets/images/categories/5_gray.png'},
      //                   {title:'American football_6',
      //                   url:'assets/images/categories/6_gray.png'},
      //                   {title:'American football_7',
      //                   url:'assets/images/categories/7_gray.png'},
      //                   {title:'American football_8',
      //                   url:'assets/images/categories/8_gray.png'},
      //                   {title:'American footbal_9',
      //                   url:'assets/images/categories/9_gray.png'},
      //                   {title:'Golf',
      //                   url:'assets/images/categories/golf_gray.png'},
      //                   {title:'American football_11',
      //                   url:'assets/images/categories/11_gray.png'},
      //                   {title:'American footbal_12',
      //                   url:'assets/images/categories/boxing_gray.png'},
      //                   {title:'American football_13',
      //                   url:'assets/images/categories/bike_gray.png'},
      //                   {title:'American football_14',
      //                   url:'assets/images/categories/horse_gray.png'},
      //                   {title:'American football_15',
      //                   url:'assets/images/categories/15_gray.png'},
      //                   {title:'American football_16',
      //                    url:'assets/images/categories/ski_gray.png'}];

});

// (function() {
//
//     var HomeController = [
//         '$q',
//         '$scope',
//         '$rootScope',
//         '$timeout',
//         '$window',
//         '$uibModal',
//         'categoryService',
//         'modalService',
//         function($q, $scope, $rootScope, $timeout, $window, $uibModal, categoryService, modalService) {

            // var moreToLoad = true;
            //
            // $rootScope.pageTitle = 'turnon - Your Stars. Their Passions.';
            //
            // $scope.PAGE_LIMIT = 2;
            // $scope.currentPage = 0;
            //
            // $scope.showMobileCarousel = false;
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     $scope.loggedInUser = undefined;
            // });
            //
            // $scope.onSignupPress = function() {
            //     modalService.showSignUpModal();
            // };
            //
            // $scope.onLoadMore = function($inview) {
            //     if (!$scope.ready || !$inview) {
            //         return;
            //     }
            //     _loadCategories();
            // };
            //
            // function _recalculateHeight() {
            //     var carouselElement = angular.element(document.getElementById('carousel-container'));
            //
            //     if (!carouselElement) {
            //         return;
            //     }
            //     $scope.videoContainerHeight = carouselElement.innerHeight();
            //     // $timeout(function() {
            //     //     $scope.$apply();
            //     // });
            // }
            //
            // function _recalculateWidth() {
            //     $scope.showMobileCarousel = ($window.innerWidth < 768);
            //     _recalculateHeight();
            // }
            //
            // function _loadCategories() {
            //     if ($scope.loading || !moreToLoad) {
            //         return;
            //     }
            //     $scope.loading = true;
            //     categoryService.getAllCategories(false, $scope.currentPage, $scope.PAGE_LIMIT)
            //         .then(
            //             function onSuccess(data) {
            //                 if ($scope.categories) {
            //                     $scope.categories.categories = $scope.categories.categories.concat(data.categories);
            //                 } else {
            //                     $scope.categories = data;
            //                 }
            //                 if (!data || data.categories.length === 0) {
            //                     moreToLoad = false;
            //                 }
            //                 $scope.ready = true;
            //                 $scope.currentPage += 1;
            //                 $timeout(function() {
            //                     angular.element(window).trigger('resize.doResize');
            //                     $scope.loading = false;
            //                 });
            //             }
            //         );
            // }
            //
            //
            // angular.element($window).on('resize.doResize', function () {
            //     _recalculateWidth();
            // });
            // _loadCategories();
      //  }
  //  ];

//     angular
//         .module('turnon')
//         .controller('HomeController', HomeController);
// }());
