(function() {

    angular
        .module('turnon')
        .factory('CategoryModel', [
            'VideoListModel',
            '$filter',
            function(VideoListModel, $filter) {
                // return function(data) {
                //     this.id = data._id;
                //     this.title = data.title;
                //     this.order = data.order;
                //
                //     if (data.slug) {
                //         this.slug = data.slug;
                //     } else {
                //         this.slug = $filter('slug')(this.title);
                //     }
                //
                //     if (data.videos) {
                //         if (typeof data.videos === 'number') {
                //             this.totalVideos = data.videos;
                //         } else {
                //             this.videos = new VideoListModel(data.videos);
                //             this.totalVideos = this.videos.videos.length;
                //         }
                //     }
                //
                //     if (data.content) {
                //         if (data.content.ProfilePicture) {
                //             this.logo = data.content.ProfilePicture.downloadUrl;
                //         }
                //
                //         if (data.content.BackgroundImage) {
                //             this.headerImage = data.content.BackgroundImage.downloadUrl;
                //         }
                //     }
                // }
            }
        ]);
}());
