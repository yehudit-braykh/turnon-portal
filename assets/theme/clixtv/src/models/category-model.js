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

                    if (data.content) {
                        if (data.content.ProfilePicture) {
                            this.logo = data.content.ProfilePicture.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }
                    }
                }
            }
        ]);
}());