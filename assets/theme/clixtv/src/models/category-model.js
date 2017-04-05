(function() {

    angular
        .module('clixtv')
        .factory('CategoryModel', [
            'VideoListModel',
            function(VideoListModel) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.videos = new VideoListModel(data.videos);
                }
            }
        ]);
}());