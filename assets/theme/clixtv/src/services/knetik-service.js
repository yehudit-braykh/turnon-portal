(function() {
    var knetikService = [
        '$http',
        function($http) {
            return {
                getPoints: function() {
                    return $http.get('/api/knetik/balance')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                saveOffer: function(id) {
                    return $http.post('/api/knetik/offer_save', {
                        id: id
                    });
                },

                viewOffer: function(id) {
                    return $http.post('/api/knetik/offer_view', {
                        id: id
                    });
                },

                shareCampaign: function(id) {
                    // return $http.post('/api/knetik/share', {
                    //     id: id
                    // });
                },

                shareEpisode: function(id) {
                    // return $http.post('/api/knetik/video_share', {
                    //     id: id
                    // });
                },

                viewEpisode: function(id) {
                    // return $http.post('/api/knetik/view', {
                    //     id: id
                    // });
                },

                viewCampaignVideo: function(id) {
                    // return $http.post('/api/knetik/ad_video_view', {
                    //     id: id
                    // });
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('knetikService', knetikService);
}());
