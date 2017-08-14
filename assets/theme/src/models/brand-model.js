(function() {

    angular
        .module('turnon')
        .factory('BrandModel', [
            '$injector',
            'OfferListModel',
            'CelebrityListModel',
            '$filter',
            function($injector, OfferListModel, CelebrityListModel, $filter) {
                // return function(data) {
                //     if (!data) {
                //         return;
                //     }
                //     this.id = data._id;
                //     this.title = data.title;
                //     this.description = data.description;
                //     this.celebrities = new CelebrityListModel(data.celebrities);
                //
                //     if (data.slug) {
                //         this.slug = data.slug;
                //     } else {
                //         this.slug = $filter('slug')(this.title);
                //     }
                //
                //     if (data.offers) {
                //         if (typeof data.offers === 'number') {
                //             this.totalOffers = data.offers;
                //         } else {
                //             this.offers = new OfferListModel(data.offers);
                //             this.totalOffers = this.offers.offers.length;
                //         }
                //     }
                //
                //     if (data.videos) {
                //         if (typeof data.videos === 'number') {
                //             this.totalVideos = data.videos;
                //         } else {
                //             var VideoListModel = $injector.get('VideoListModel');
                //             this.videos = new VideoListModel(data.videos);
                //             this.totalVideos = this.videos.videos.length;
                //         }
                //     }
                //
                //     if (data.content) {
                //         if (data.content.BrandTransparentLogo) {
                //             this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                //         }
                //
                //         if (data.content.BackgroundImage) {
                //             this.headerImage = data.content.BackgroundImage.downloadUrl;
                //         }
                //
                //         if (data.content.ProfilePicture) {
                //             this.logo = data.content.ProfilePicture.downloadUrl;
                //         }
                //
                //         if (data.content.Video) {
                //             this.trailer = data.content.Video.downloadUrl;
                //         }
                //
                //         if (data.content.PosterH) {
                //             this.trailerThumbnail = data.content.PosterH.downloadUrl;
                //         }
                //     }
                // }
            }
        ]);
}());
