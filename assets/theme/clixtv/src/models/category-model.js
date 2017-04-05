(function() {

    angular
        .module('clixtv')
        .factory('CategoryModel', [
            'VideoListModel',
            function(VideoListModel) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.order = data.order;
                    this.videos = new VideoListModel(data.videos);

                    console.log(data);

                    if (data.content.BrandLogo) {
                        this.logo = data.content.BrandLogo.downloadUrl;
                    }

                    if (data.content.BackgroundImage) {
                        this.headerImage = data.content.BackgroundImage.downloadUrl;
                    }
                }
            }
        ]);
}());