(function() {

    angular
        .module('clixtv')
        .factory('BrandModel', [
            function() {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.transparentThumbnail = data.content.BrandTransparentLogo.downloadUrl;
                }
            }
        ]);
}());