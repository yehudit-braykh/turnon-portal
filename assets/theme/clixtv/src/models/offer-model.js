(function() {
    angular
        .module('clixtv')
        .factory('OfferModel', [
            '$injector',
            '$filter',
            function($injector, $filter) {
                return function(data) {
                    var BrandModel;
                    this.id = data._id;
                    this.title = data.title;
                    this.expirationDate = data.expiration_date;
                    this.description = data.description;
                    this.longDescription = data.long_description;
                    this.instructions = data.instructions_description;

                    if (data.slug) {
                        this.slug = data.slug;
                    } else {
                        this.slug = $filter('slug')(this.title);
                    }

                    if (data.coupon_code) {
                        this.couponCode = data.coupon_code;
                    }

                    if (data.rfi_link) {
                        this.rfiLink = data.rfi_link;
                    }

                    if (typeof data.campaign === 'string') {
                        this.campaign = data.campaign;
                    } else {
                        BrandModel = $injector.get('BrandModel');
                        this.campaign = new BrandModel(data.campaign);
                    }

                    if (data.content) {
                        if (data.content.BrandTransparentLogo) {
                            this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                        }

                        if (data.content.OfferImage) {
                            this.thumbnail = data.content.OfferImage.downloadUrl;
                        }

                        if (data.content.BackgroundImage) {
                            this.headerImage = data.content.BackgroundImage.downloadUrl;
                        }

                        if (data.content.CouponImage) {
                            this.couponImage = data.content.CouponImage.downloadUrl;
                        }

                        if (data.content.CarouselPic1) {
                            this.carouselPic1 = data.content.CarouselPic1.downloadUrl;
                        }

                        if (data.content.CarouselPic2) {
                            this.carouselPic2 = data.content.CarouselPic2.downloadUrl;
                        }

                        if (data.content.CarouselPic3) {
                            this.carouselPic3 = data.content.CarouselPic3.downloadUrl;
                        }
                    }

                    if (data.brand) {
                        BrandModel = $injector.get('BrandModel');
                        this.brand = new BrandModel(data.brand);
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
