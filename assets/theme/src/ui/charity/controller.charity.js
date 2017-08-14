(function() {

    var CharityController = [
        '$q',
        '$log',
        '$scope',
        '$rootScope',
        '$filter',
        '$uibModal',
        '$state',
        '$stateParams',
        'brandsService',
        'userService',
        'catchMediaService',
        'clixConfig',
        function($q, $log, $scope, $rootScope, $filter, $uibModal, $state, $stateParams, brandsService, userService, catchMediaService, clixConfig) {

            // $scope.filtersEnabled = clixConfig.filtersEnabled;
            //
            // function _resetIsFavorite() {
            //     if ($scope.charity) {
            //         $scope.isFavorite = userService.isFavoriteCharity($scope.charity.id);
            //     }
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     delete $scope.loggedInUser;
            //     _resetIsFavorite();
            // });
            //
            // $rootScope.$on('favorite.added', _resetIsFavorite);
            // $rootScope.$on('favorite.removed', _resetIsFavorite);
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             $scope.loggedInUser = data;
            //             _resetIsFavorite();
            //         }
            //     );
            //
            // $scope.onFavoritePress = function() {
            //     if ($scope.isFavorite) {
            //         userService.removeFavoriteCharity($scope.charity.id);
            //     } else {
            //         userService.addFavoriteCharity($scope.charity.id);
            //     }
            // };
            //
            // $scope.seriesList = [
            //     {
            //         label: 'A - Z'
            //     },
            //     {
            //         label: 'Most Viewed'
            //     }
            // ];
            //
            // brandsService.getCharityBySlug($stateParams.slug)
            //     .then(
            //         function onSuccess(data) {
            //
            //             if (!data || !data.id) {
            //                 throw new Error('Invalid data returned');
            //             }
            //
            //             $scope.charity = data;
            //
            //
            //             var eventParams = {
            //                 target_cm: 'media',
            //                 target_type: 'organization',
            //                 target_id: $scope.charity.id
            //             };
            //
            //             if ($stateParams.starId) {
            //                 eventParams.source_cm = 'media';
            //                 eventParams.source_type = 'person';
            //                 eventParams.source_id = $stateParams.starId;
            //             }
            //
            //             catchMediaService.trackAppEvent('navigation_item', eventParams);
            //
            //             $filter('orderBy')($scope.charity.videos.videos, ['episodeNumber']);
            //
            //             $scope.active = 0;
            //
            //             $rootScope.pageTitle = $scope.charity.title + ' - turnon';
            //
            //             $scope.video = {
            //                 streamUrl: data.trailer,
            //                 thumbnail: data.trailerThumbnail
            //             };
            //         }
            //     )
            //     .catch(
            //         function onError(error) {
            //             $log.error(error);
            //             $state.go('404');
            //         }
            //     );
            //
            // $scope.onTabSelect = function(tab) {
            //
            //     switch (tab) {
            //
            //         case 'stars':
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'person',
            //                 source_cm: 'media',
            //                 source_type: 'organization',
            //                 source_id: $scope.charity.id
            //             });
            //             break;
            //
            //         case 'videos':
            //             catchMediaService.trackAppEvent('navigation', {
            //                 target_cm: 'media',
            //                 target_type: 'episode',
            //                 source_cm: 'media',
            //                 source_type: 'organization',
            //                 source_id: $scope.charity.id
            //             });
            //             break;
            //     }
            // };
            //
            // $scope.onDonatePress = function() {
            //     var modalInstance = $uibModal.open({
            //         animation: true,
            //         templateUrl: 'ui/common/modal/donate/view.donate.html',
            //         controller: 'DonateController',
            //         windowClass: 'clix-modal-window',
            //         size: 'clix-lg'
            //     });
            //
            //     modalInstance.opened.then(
            //         function onSuccess() {
            //             $rootScope.$broadcast('modal.open');
            //         }
            //     );
            //
            //     modalInstance.closed.then(
            //         function onSuccess() {
            //             $rootScope.$broadcast('modal.close');
            //         }
            //     );
            //
            //     modalInstance.result.then(
            //         function onSuccess(data) {
            //
            //         },
            //         function onError(error) {
            //
            //         }
            //     )
            // }

        }
    ];

    angular
        .module('turnon')
        .controller('CharityController', CharityController);
}());
