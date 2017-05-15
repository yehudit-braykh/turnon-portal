(function() {

    var StarsController = [
        '$q',
        '$scope',
        'celebrityService',
        'catchMediaService',
        function($q, $scope, celebrityService, catchMediaService) {

            $scope.filterOptions = [
                {
                    label: 'All'
                },
                {
                    label: 'Athletes'
                },
                {
                    label: 'Influencers'
                },
                {
                    label: 'Movie Stars'
                },
                {
                    label: 'Musicians'
                },
                {
                    label: 'TV Stars'
                }
            ];

            $scope.sortOptions = [
                {
                    label: 'A - Z'
                },
                {
                    label: 'Recently Added'
                },
                {
                    label: 'Most Viewed'
                }
            ];

            celebrityService.getAllCelebrities()
                .then(
                    function onSuccess(data) {
                        $scope.stars = data;
                    }
                );

            catchMediaService.trackAppEvent('navigation', {
                target_cm: 'media',
                target_type: 'person'
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('StarsController', StarsController);
}());