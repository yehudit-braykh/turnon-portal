(function() {

    var StarsController = [
        '$q',
        '$scope',
        '$rootScope',
        'celebrityService',
        'catchMediaService',
        function($q, $scope, $rootScope, celebrityService, catchMediaService) {

            $rootScope.pageTitle = 'Stars - ClixTV';

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
                        var stars = data;
                        stars.celebrities = stars.celebrities.filter(function(star) {
                            return star.totalVideos && star.totalVideos > 0;
                        });
                        $scope.stars = stars;
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