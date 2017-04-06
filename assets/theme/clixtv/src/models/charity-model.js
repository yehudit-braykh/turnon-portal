(function() {

    angular
        .module('clixtv')
        .factory('CharityModel', [
            function() {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    if (data.content.BrandTransparentLogo) {
                        this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                    }
                }
            }
        ]);
}());