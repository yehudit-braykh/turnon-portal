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
                            socialshareHashtags: '#turnon'
                        }
                    });
                },

                postToTwitter: function(message, title, description, link, picture) {
                    Socialshare.share({
                        provider: 'twitter',
                        attrs: {
                            socialshareVia: 'turnonofficial',
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
        .module('turnon')
        .factory('shareService', shareService);
}());