vttApp.factory('AuthService', function ($http, $rootScope, $location, User, $q, $interval) {
	var scope = {};
	scope.user = {};
	$rootScope.isLogin = false;

	scope.getCurrentUser = function (){
		$http({method: 'GET', url: '/api/account/get_current'}).
	    	success(function(data, status, headers, config) {
				if(data.code == "11"){
					scope.activateLinkByFacebook = true;
					$rootScope.$broadcast("auth-login-error", data);
				}else if (data.code == "12") {
					$rootScope.$broadcast("auth-login-error", data);
				}
	    		else if (data.code == "403.1" || !data) $rootScope.$broadcast("auth-current-error");
	    		else {
					User.set(data);
				}
	    	}).
	    	error(function(data, status, headers, config) {
	    		$rootScope.$broadcast("auth-current-error");
	    	});
	};

	scope.updateProfile = function(user){
		$http({method: 'POST', url: '/api/account/update_profile', data:user}).
    	success(function(data, status, headers, config) {
		//	console.log('save profile success', data);
    	}).
    	error(function(data, status, headers, config) {
    //		console.log('save profile error', data);
    	});
	}



	if (!scope.isLogin) {
		scope.getCurrentUser();
	}

	scope.isLoggedIn = function(){
		return $rootScope.isLogin;
	}

	scope.register = function (args) {
		var deferred = $q.defer();
		$http({method: 'POST', url: '/api/account/register', data:args}).
    	success(function(data, status, headers, config) {
			if(data.error){
				$rootScope.$broadcast("auth-register-error",data);
			}else{
	    		$rootScope.$broadcast("auth-register-success");
	    		deferred.resolve(data);
				scope.login(args.email, args.password);
			}
    	}).
    	error(function(data, status, headers, config) {
    		$rootScope.$broadcast("auth-register-error");
    		deferred.reject(data);
    	});
		return deferred.promise;
	};

	scope.login = function (email, pass) {
		if(scope.activateLinkByFacebook)
		{
			scope.linkFacebook(email,pass);
		}
		else {
			$http({method: 'POST', url: '/api/account/login_user', data: {email: email, password: pass}}).
	    	success(function(data, status, headers, config) {
			//	console.log('LOGIN INFO',data);
	    		User.set(data.content);
	    	}).
	    	error(function(data, status, headers, config) {
	    		$rootScope.$broadcast("auth-login-error", data);
	    	});
		}

	};

	scope.linkFacebook = function(email,pass){
		$http({method: 'POST', url: '/api/account/link_facebook', data: {email: email, password: pass}}).
		success(function(data, status, headers, config) {
		//	console.log('LOGIN INFO',data);
			User.set(data.content);
		}).
		error(function(data, status, headers, config) {
			$rootScope.$broadcast("auth-login-error", data);
		});

	}

	scope.logout = function (){
		$http({method: 'POST', url: '/api/account/logout'}).
    	success(function(data, status, headers, config) {
			User.destroy();
    	}).
    	error(function(data, status, headers, config) {
			User.destroy();
    	});
		User.destroy();
	}

	scope.fbLogin = function (route){
		window.open('/register/login/Facebook?ref='+location.hash.substring(3)+'&network=facebook', 'fb','left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
		//statsService.login('facebook', 'start');
	}

	scope.googleLogin = function (){
		window.open('/hauth/login/Google', 'google','left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
		//statsService.login('google', 'start');
	}

	scope.twitterLogin = function (){
		scope.socialLogin= true;
		window.open('/hauth/login/Twitter?ref='+location.hash.substring(3)+'&network=twitter', 'twitter','left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
		//statsService.login('twitter', 'start');
	}

	scope.instagramLogin = function (){
		scope.socialLogin= true;
		window.open('/hauth/login/Instagram', 'instagram','left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
		//statsService.login('instagram', 'start');
	}

	scope.inLogin = function (){
		window.open('/hauth/login/LinkedIn', 'in','left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
		//statsService.login('linkedIn', 'start');
	}

	scope.vkontakteLogin = function (){
		window.open('/hauth/login/Vkontakte', 'in','left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
		//statsService.login('vkontakte', 'start');
	}

	$interval(scope.retentionUser, 1200000);

	return scope;
});

vttApp.service('User', function ($rootScope, $http, $location) {
	u = this;
	this.set = function (user) {
	//	console.log("SETTING USER", user);
		this.email = user.email;
		this.registerd_on = user.registerd_on;
        this.lastName = user.lastName;
		this.firstName = user.firstName;
        this.gender = user.gender;
		this.image = user.avatar;
        this.birthdate = user.birthdate;
		this.registerd_on = user.creationDate;
		this.city = user.city;
		this.addressLine1 = user.addressLine1;
		this.id = user._id;
		this.following = user.following;
		this.todos = user.todos;
		this.about = user.about;
		this.tags = user.tags;
		this.linkedIn = user.linkedIn;
		this.facebook = user.facebook;
		this.google = user.google;
		this.twitter = user.twitter;
		this.vkontakte = user.vkontakte
		this.instagram = user.instagram;
		$rootScope.$broadcast("auth-login-success");
		$rootScope.isLogin=true;
	};
	this.destroy = function () {
		this.networks = null;
		this.connected_via = null;
		this.email = null;
		this.lastName = null;
		this.firstName = null;
		this.gender = null;
		this.image = null;
		this.birthDay = null;
		this.birthMonth = null;
		this.birthYear = null;
		this.id = null;
		this.image = null;
		this.registerd_on = null;
		this.location = null;
		this.following = null;
		this.favs = [];
		this.todos = null;
		this.about = null;
		this.linkedIn = null;
		this.facebook = null;
		this.google = null;
		this.twitter = null;
		this.instagram = null;
		this.vkontakte = null;
		this.instagram = null;
		this.tags = null;
		$rootScope.$broadcast("auth-logout");
		$rootScope.isLogin=false;
	};
	return this;

});
