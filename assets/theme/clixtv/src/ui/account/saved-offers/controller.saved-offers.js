(function() {

    var AccountSavedOffersController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {

            var defaultFilterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Home & Auto'
                },
                {
                    label: 'Baby, Kids & Toys'
                },
                {
                    label: 'Electronics'
                }
            ];

            var defaultSortOptions = [
                {
                    label: 'Expiring Soon'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
                }
            ];

            $scope.filterSavedOffersOptions = defaultFilterOptions;
            $scope.sortSavedOffersOptions = defaultSortOptions;

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountSavedOffersController', AccountSavedOffersController);
}());