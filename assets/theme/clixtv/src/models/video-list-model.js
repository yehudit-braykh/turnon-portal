(function() {

    angular
        .module('clixtv')
        .factory('VideoListModel', [
            'VideoModel',
            function(VideoModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.videos = data.map(function(video) {
                        return new VideoModel(video);
                    });
                }
            }
        ]);
}());