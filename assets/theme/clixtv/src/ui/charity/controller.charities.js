(function() {

    var CharitiesController = [
        '$q',
        '$scope',
        '$stateParams',
        'brandsService',
        'catchMediaService',
        function($q, $scope, $stateParams, brandsService, catchMediaService) {

            var defaultFilterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Animals'
                },
                {
                    label: 'Arts & Culture'
                },
                {
                    label: 'Education'
                },
                {
                    label: 'Environmental'
                },
                {
                    label: 'International non-gov'
                },
                {
                    label: 'Health'
                }
            ];

            var defaultSortOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            $scope.filterCharitiesOptions = defaultFilterOptions;
            $scope.sortCharitiesOptions = defaultSortOptions;

            $scope.menuItems = [
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
                }
            ];

            brandsService.getAllCharities()
                .then(
                    function onSuccess(data) {
                        $scope.charities = data;
                    }
                );

            catchMediaService.trackCharityPageEvent();
        }
    ];

    angular
        .module('clixtv')
        .controller('CharitiesController', CharitiesController);
}());