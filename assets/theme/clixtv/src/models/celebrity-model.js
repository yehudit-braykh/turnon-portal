(function() {

    angular
        .module('clixtv')
        .factory('CelebrityModel', [
            '$injector',
            function($injector) {
                return function(data) {
                    this.id = data._id;
                    this.name = data.title;

                    if (data.content.BrandLogo) {
                        this.thumbnail = data.content.BrandLogo.downloadUrl;
                    }

                    if (data.videos) {
                        var VideoListModel = $injector.get('VideoListModel');
                        this.videos = new VideoListModel(data.videos);
                    }

                }
            }
        ]);
}());