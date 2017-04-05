(function() {

    angular
        .module('clixtv')
        .factory('CelebrityModel', [
            function() {
                return function(data) {
                    this.id = data._id;
                    this.name = data.title;
                    this.thumbnail = data.content.BrandLogo.downloadUrl;
                }
            }
        ]);
}());