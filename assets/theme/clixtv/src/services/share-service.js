(function() {

    var shareService = [
        'Socialshare',
        function(Socialshare) {
            return {

                postToFacebook: function(message, title, description, link, picture) {
                    Socialshare.share({
                        provider: 'facebook',
                        attrs: {
                            socialshareType: 'share',
                            socialshareVia: '1818150935069308',
                            socialshareUrl: link,
                            socialshareTitle: title,
                            socialshareDescription: description,
                            socialshareMedia: picture,
                            socialsharePopupHeight: 500,
                            socialsharePopupWidth : 600,
                            socialshareHashtags: '#ClixTV'
                        }
                    });
                },

                postToTwitter: function(message, title, description, link, picture) {
                    Socialshare.share({
                        provider: 'twitter',
                        attrs: {
                            socialshareVia: 'clixtvofficial',
                            socialshareText: message,
                            socialsharePopupHeight: 500,
                            socialsharePopupWidth : 600
                        }
                    });
                },

                postToTumblr: function(message, title, description, link, picture) {
                    Socialshare.share({
                        provider: 'tumblr',
                        attrs: {
                            socialshareUrl: link,
                            socialshareText: message,
                            socialsharePopupHeight: 500,
                            socialsharePopupWidth : 600
                        }
                    });
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('shareService', shareService);
}());