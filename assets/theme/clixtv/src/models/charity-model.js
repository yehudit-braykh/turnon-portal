(function() {

    angular
        .module('clixtv')
        .factory('CharityModel', [
            '$injector',
            '$filter',
            function($injector, $filter) {
                return function(data) {

                    if (typeof data === 'string') {
                        return;
                    }

                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;

                    if (data.slug) {
                        this.slug = data.slug;
                    } else {
                        this.slug = $filter('slug')(this.title);
                    }

                    if (data.content) {
                        if (data.content.ProfilePicture) {
                            this.transparentThumbnail = data.content.ProfilePicture.downloadUrl;
                            this.logo = data.content.ProfilePicture.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }

                        if (data.content.Video) {
                            this.trailer = data.content.Video.downloadUrl;
                        }

                        if (data.content.PosterH) {
                            this.trailerThumbnail = data.content.PosterH.downloadUrl;
                        }
                    }

                    if (data.celebrities) {
                        var CelebrityListModel = $injector.get('CelebrityListModel');
                        this.celebrities = new CelebrityListModel(data.celebrities);
                    }

                    if (data.videos) {
                        if (typeof data.videos === 'number') {
                            this.totalVideos = data.videos;
                        } else {
                            var VideoListModel = $injector.get('VideoListModel');
                            this.videos = new VideoListModel(data.videos);
                            this.totalVideos = this.videos.videos.length;
                        }
                    }
                }
            }
        ]);
}());
