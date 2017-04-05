(function() {

    angular
        .module('clixtv')
        .factory('VideoListModel', [
            'VideoModel',
            function(VideoModel) {
                return function(data) {
                    this.videos = data.map(function(video) {
                        return new VideoModel(video);
                    });
                }
            }
        ]);
}());