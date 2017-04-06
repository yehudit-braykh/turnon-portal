(function() {

    angular
        .module('clixtv')
        .factory('CharityModel', [
            '$injector',
            function($injector) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;

                    if (data.content.BrandTransparentLogo) {
                        this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                    }

                    var VideoListModel = $injector.get('VideoListModel');
                    this.videos = new VideoListModel(data.videos);
                }
            }
        ]);
}());