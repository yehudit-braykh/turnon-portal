(function() {

    angular
        .module('clixtv')
        .factory('CharityModel', [
            function() {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                }
            }
        ]);
}());