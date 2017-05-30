(function() {

    var HomePageBannerController = [
        '$scope',
        '$rootScope',
        'modalService',
        function($scope, $rootScope, modalService) {

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            $scope.onSignupPress = function() {
                modalService.showSignUpModal();
            };

            var backgroundVideo = jwplayer('videoPlayer').setup({
                file: 'https://s3-us-west-2.amazonaws.com/clixtv.prod/ClixBetaCover.m3u8',
                autostart: true,
                controls: false,
                mute: true,
                repeat: true,
                width: '100%',
                aspectratio: '16:9'
            });

            // For whatever reason, JWPlayer doesn't honor the 'repeat: true' param
            // with an HLS file, so we'll force it here.
            backgroundVideo.on('time', function(e) {
                if (e.position >= (e.duration - 0.25)) {
                    backgroundVideo.seek(0);
                }
            });


        }
    ];

    angular
        .module('clixtv')
        .controller('HomePageBannerController', HomePageBannerController);
}());