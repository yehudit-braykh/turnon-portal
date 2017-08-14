(function() {

    angular
        .module('turnon')
        .factory('VideoListModel', [
            'VideoModel',
            function(VideoModel) {
                // return function(data) {
                //     if (!(data instanceof Array)) {
                //         this.videos = [];
                //         return;
                //     }
                //     this.videos = data.map(function(video) {
                //         return new VideoModel(video);
                //     });
                // }
            }
        ]);
}());
