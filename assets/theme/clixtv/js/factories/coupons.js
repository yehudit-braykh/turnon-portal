clixApp.factory("couponsFactory", function() {

    var factoryObject = {};

    return {
        getCoupones: function ()
        {
            factoryObject.users = [
                {title: 'Save Up to 55% On the ClixTV launch Sales ', imgurl: '/assets/theme/clixtv/images/coupons/nike.png', Expires: ' 01/15/17' },
                {title: 'Golf & Co  ', imgurl: '/assets/theme/clixtv/images/coupons/nike.png', Expires: ' 01/15/17' },
                {title: 'FCB ', imgurl: '/assets/theme/clixtv/images/coupons/nike.png', Expires: ' 01/15/17' },
                {title: 'Top 10 stories  ', imgurl: '/assets/theme/clixtv/images/coupons/nike.png', Expires: ' 01/15/17' }
            ];

            return factoryObject.users;
        }
    }
});
