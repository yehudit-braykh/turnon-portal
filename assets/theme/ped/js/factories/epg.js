peruDigitalApp.factory("epgFactory", function($http, $q) {
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
        getEpgByChannelId: function(channelId){
            for(ch in allChannels)
                if (allChannels[ch].id==channelId)
                    return allChannels[ch];
        }

    };
});
