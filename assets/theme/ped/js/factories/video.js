peruDigitalApp.factory("videoFactory", function($http, $q) {

    var allChannels=[{id:1,
                      name:'Peru 1',
                      icon_url:'assets/theme/ped/images/static-images/epg/channel1.png',
                      programs:[{name:'Mid Morning', category:'hit mix', start_time:'12:00', end_time:'13:00'},
                                {name:'Mid Morning', category:'hit mix', start_time:'13:00', end_time:'14:00'},
                                {name:'Mid Morning', category:'hit mix', start_time:'14:00', end_time:'15:00'},
                                {name:'Mid Morning', category:'hit mix', start_time:'15:00', end_time:'16:00'},
                                {name:'Mid Morning', category:'hit mix', start_time:'18:00', end_time:'19:00'}]
                    },
                    {id:2,
                     name:'Peru 2',
                     icon_url:'assets/theme/ped/images/static-images/epg/channel2.png',
                     programs:[{name:'Mid Morning', category:'hit mix', start_time:'12:00', end_time:'13:00'},
                     {name:'Mid Morning', category:'hit mix', start_time:'13:00', end_time:'14:00'},
                     {name:'Mid Morning', category:'hit mix', start_time:'14:00', end_time:'15:00'},
                     {name:'Mid Morning', category:'hit mix', start_time:'15:00', end_time:'16:00'},
                     {name:'Mid Morning', category:'hit mix', start_time:'16:00', end_time:'17:00'}]
                 }];
    return {
        getAllVideos: function(){
            return allVideos;
        },
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
            return $http({method: 'GET', url: '/api/video/get_epg/?id='+ channelId}).
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
        getNewReleasesVideos: function(){
            return $http({method: 'GET', url: '/api/video/get_videos_by_featured/?category=new_releases'}).
        	success(function(data, status, headers, config) {
                return data;
        	}).
        	error(function(data, status, headers, config) {
        	});
        },
        getRecommendedVideos: function(){
            return $http({method: 'GET', url: '/api/video/get_videos_by_featured/?category=recommended'}).
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
