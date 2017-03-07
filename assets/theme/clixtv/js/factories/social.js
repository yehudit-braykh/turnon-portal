var fbf=null;
clixApp.factory("socialFactory", function($http, $location, $rootScope, User, $q, $interval, User, knetikFactory) {
    var scope = {};
    fbf=scope;
    scope.token=null;
    scope.fbFriendsList=null;



    scope.facebookAuthenticate = function(){
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '1136780779752390',
            xfbml      : true,
            version    : 'v2.8',
          });
          FB.AppEvents.logPageView();
          FB.login(function(response) {
              if (response.authResponse) {
                  scope.token = FB.getAuthResponse()['accessToken'];
                  FB.api(
                      '/me/taggable_friends',
                      'GET',
                      {"fields":"id,name,picture", 'limit': 4000 ,'access_token': scope.token},
                      function(response) {
                          scope.fbFriendsList = response.data;
                          $rootScope.$broadcast('FBisReady');
                      }
                  );
              }
          });
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
    }



    scope.facebookShare= function(item, text, tags){
        var deffered = $q.defer();
        FB.login(function(response) {
         if (response.authResponse) {
           scope.token = FB.getAuthResponse()['accessToken'];

           FB.api(
               '/me/feed',
               'POST',
               {
                   "message":text,
                   "link": $location.absUrl(),
                   "picture": item.BrandLogo.url,
                   "name": item.title,
                   'access_token': scope.token,
                   'tags': tags
               },
               function(response) {
                   //  console.log(response);
                   if(response.id) knetikFactory.updateActivity(item, 'share');
                   deffered.resolve(response);
               }
             );
         } else {
           deffered.reject(response);
         }
     });

     return deffered.promise;

    }




    scope.facebookGetFriendsList = function () {
        return scope.fbFriendsList;

    }

    scope.postTwitterStatus = function(model,test){
        var status={};
        status.link= $location.absUrl();
        status.message=test?test:model.title;
        status.picture=model.images['Brand Logo'].url;
        $http({method: 'POST', url: '/api/social/post_twitter_status', data:status}).
    	success(function(data, status, headers, config) {
		//	console.log('save profile success', data);
    	}).
    	error(function(data, status, headers, config) {
    //		console.log('save profile error', data);
    	});
    }

    return scope;

});
