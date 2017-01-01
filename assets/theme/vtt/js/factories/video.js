peruDigitalApp.factory("videoFactory", function($http, $q) {
    return {
        getVideoById: function(videoId) {
            return $http({method: 'GET', url: '/api/video/get_video_by_id/?id='+ videoId}).
                       success(function(data, status, headers, config) {
                           return data;
                       }).
                       error(function(data, status, headers, config) {
                       });
         },
        getEpgByChannelId: function(channelId){
            for(ch in allChannels)
                if (allChannels[ch].id==channelId)
                    return allChannels[ch];
        },
        getEpg: function(channelId){
            return $http({method: 'GET', url: '/api/video/get_epg/?channel='+ channelId}).
        	success(function(data, status, headers, config) {
                return data;
        	}).
        	error(function(data, status, headers, config) {
        	});
        },
        getChannels: function(channelId){
            return $http({method: 'GET', url: '/api/video/list_channels'}).
        	success(function(data, status, headers, config) {
                return data;
        	}).
        	error(function(data, status, headers, config) {
        	});
        },
        getvideoBycategory: function(categoryName){
            return $http({method: 'GET', url: '/api/video/get_videos_by_category/?id='+ categoryName}).
        	success(function(data, status, headers, config) {
                return data;
        	}).
        	error(function(data, status, headers, config) {
        	});
        },
        getvideoByCelebId: function(celebId){
            return $http({method: 'GET', url: '/api/celebrity/get_celeb_videos/?id='+ celebId}).
        	success(function(data, status, headers, config) {
                return data;
        	}).
        	error(function(data, status, headers, config) {
        	});
        },
        getNewReleasesVideos: function(){
            return $http({method: 'GET', url: '/api/video/get_videos_by_featured/?category=nuevos'}).
        	success(function(data, status, headers, config) {
                return data;
        	}).
        	error(function(data, status, headers, config) {
        	});
        },
        getComingSoonVideos: function(){
            return $http({method: 'GET', url: '/api/video/get_videos_by_featured/?category=proximamente'}).
        	success(function(data, status, headers, config) {
                return data;
        	}).
        	error(function(data, status, headers, config) {
        	});
        },
        getRecommendedVideos: function(){
            return $http({method: 'GET', url: '/api/video/get_videos_by_featured/?category=recomendados'}).
            	success(function(data, status, headers, config) {
                    return data;
            	}).
            	error(function(data, status, headers, config) {
            	});
        },
        getFeaturedVideos: function(){
            return $http({method: 'GET', url: '/api/video/get_videos_by_featured/?category=featured'}).
            	success(function(data, status, headers, config) {
                    return data;
            	}).
            	error(function(data, status, headers, config) {
            	});
        },
        getSeries: function(){
            return $http({method: 'GET', url: '/api/video/get_all_series'}).
        	success(function(data, status, headers, config) {
                return data;
            }).
        	error(function(data, status, headers, config) {
        	});
        },
        getSerieById: function(serieId){
            return $http({method: 'GET', url: '/api/video/get_serie_by_id/?id='+serieId}).
        	success(function(data, status, headers, config) {
    			return data;
        	}).
        	error(function(data, status, headers, config) {
        	});
        },
        search: function(text){
            return $http({method: 'GET', url: '/api/video/search/?text='+text}).
        	success(function(data, status, headers, config) {
    			return data;
        	}).
        	error(function(data, status, headers, config) {
        	});
        }

    };
});
