clixApp.factory('AuthService', function ($http, $rootScope, $location, User, $q, $interval) {
	var scope = {};
	scope.user = {};

	scope.getCurrentUser = function (){
		$http({method: 'GET', url: '/api/account/get_current'}).
	    	success(function(data, status, headers, config) {
			//	console.log(data);
				if(data.code == "11"){
					scope.activateLinkByFacebook = true;
					$rootScope.$broadcast("auth-login-error", data);
				}else if (data.code == "12") {
					$rootScope.$broadcast("auth-login-error", data);
				}
	    		else if (data.code == "403.1" || !data) $rootScope.$broadcast("auth-current-error");
	    		else {
					User.set(data);
					scope.user = User;
				}
	    	}).
	    	error(function(data, status, headers, config) {
	    		$rootScope.$broadcast("auth-current-error");
	    	});
	};

	if (!scope.user.email) {
		scope.getCurrentUser();
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
				if(data.error)
					$rootScope.$broadcast("auth-login-error", data);
				else
	    			User.set(data.content);
	    	}).
	    	error(function(data, status, headers, config) {
	    		$rootScope.$broadcast("auth-login-error", data);
	    	});
		}

	};

	scope.resetPassword = function(email){
		var deffered = $q.defer();
		$http({method: 'GET', url: 'index.php/api/account/send_password_email/?email='+email}).
			then(function(data, status, header, config){
				deffered.resolve(data);
			}).
			catch(function(data, status, headers, config) {
	    		deffered.resolve(data);
	    	});
		return deffered.promise;
	}

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
    	});
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
		window.open('/hauth/login/Twitter?ref='+location.hash.substring(3)+'&network=twitter', 'twitter','left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
		//statsService.login('twitter', 'start');
	}

	scope.instagramLogin = function (){
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
clixApp.service('User', function ($rootScope, $http, $location, $q) {
	u = this;
	this.user=null;
	this.getUser = function(){
		return this.user;
	}
	this.set = function (user) {
	//	console.log("Setting User", user);
		this.user= user;
		if (!this.user.avatar)
			this.user.avatar = 'assets/theme/clixtv/images/profile.png';
		this.user.current_balance = 0;

		$rootScope.$broadcast("auth-login-success");
	};
	this.destroy = function () {

		this.user=null;
		$rootScope.$broadcast("auth-logout");
	};

	this.getNotifications = function(){
		var deffered= $q.defer();
		$http({method: 'GET', url: '/api/notifications/get_notifications'}).
    	success(function(data, status, headers, config) {
    		deffered.resolve(data);
    	}).
    	error(function(data, status, headers, config) {
			deffered.reject(data);
    	});
		return deffered.promise;
	}

	this.getWatchList = function(){
		var deffered= $q.defer();
		$http({method: 'GET', url: '/api/account/get_watchlist'}).
    	success(function(data, status, headers, config) {
		//	console.log(data);
    		deffered.resolve(data);
    	}).
    	error(function(data, status, headers, config) {
			deffered.reject(data);
    	});
		return deffered.promise;
	}

	this.getFavoritesByType = function(type){
		var deffered= $q.defer();
		$http({method: 'GET', url: '/api/account/get_favorites/?type='+type}).
    	success(function(data, status, headers, config) {
		//	console.log(data);
    		deffered.resolve(data);
    	}).
    	error(function(data, status, headers, config) {
			deffered.reject(data);
    	});
		return deffered.promise;
	}

	this.markAsRead = function(not_id){
		var nots = [];
		nots.push(not_id);
		var deffered= $q.defer();
		$http({method: 'Post',
			  url: '/api/notifications/mark_as_read',
		  	  data: {notifications:nots}}).
    	success(function(data, status, headers, config) {
    		deffered.resolve(data.content);
    	}).
    	error(function(data, status, headers, config) {
			deffered.reject(data);
    	});
		return deffered.promise;
	}

	this.isFavorite = function(id, type){
		if(this.user){
			switch (type) {
				case 'celeb':{
					if (this.user.favoriteCelebs)
						if(this.user.favoriteCelebs.indexOf(id)>=0)
							return true;
				}
					break;
				case 'brand':{
					if (this.user.favoriteBrands)
						if(this.user.favoriteBrands.indexOf(id)>=0)
							return true;
				}
					break;
				case 'charity':{
				//	console.log('is charity',id);
					if (this.user.favoriteCharities)
						if(this.user.favoriteCharities.indexOf(id)>=0)
							return true;
				}
				case 'category':{
					if (this.user.favoriteCategories)
						if(this.user.favoriteCategories.indexOf(id)>=0)
							return true;
				}
			}
		}

		return false;
	}

	this.addRemoveFavorites = function(id, type){
		if(this.user){
			switch (type) {
				case 'celeb':{
					if (!this.user.favoriteCelebs)
						this.user.favoriteCelebs = [];
					if(this.isFavorite(id, type))
						this.user.favoriteCelebs.splice(id,1);
					else
						this.user.favoriteCelebs.push(id);
					this.updateProfile(this.user);
				}
					break;
				case "brand":{
					if (!this.user.favoriteBrands)
						this.user.favoriteBrands = [];
					if(this.isFavorite(id, type))
						this.user.favoriteBrands.splice(id,1);
					else
						this.user.favoriteBrands.push(id);
					this.updateProfile(this.user);
				}
					break;
				case 'charity':{
					if (!this.user.favoriteCharities)
						this.user.favoriteCharities = [];
					if(this.isFavorite(id, type))
						this.user.favoriteCharities.splice(id,1);
					else
						this.user.favoriteCharities.push(id);
					this.updateProfile(this.user);
				}
				case 'category':{
					if (!this.user.favoriteCategories)
						this.user.favoriteCategories = [];
					if(this.isFavorite(id, type))
						this.user.favoriteCategories.splice(id,1);
					else
						this.user.favoriteCategories.push(id);
				//		console.log(this.user);
					this.updateProfile(this.user);
				}
			}
		}


	}

	this.isWatchlist = function(id){
		if(this.user)
			if (this.user.watchlist)
				if(this.user.watchlist.indexOf(id)>=0)
					return true;
		return false;
	}

	this.addRemoveWatchlist = function(id, type){
		if(this.user){
			if (!this.user.watchlist)
				this.user.watchlist = [];
			if(this.isWatchlist(id))
				this.user.watchlist.splice(id,1);
			else
				this.user.watchlist.push(id);
			this.updateProfile(this.user);
		}
	}

	this.addRemoveOffer = function(id){
		if(this.user){
			if (!this.user.offersSaved)
				this.user.offersSaved = [];
			if(this.isSavedOffer(id))
				this.user.offersSaved.splice(id,1);
			else
				this.user.offersSaved.push(id);
			this.updateProfile(this.user);
		}
	}

	this.isSavedOffer = function(id){
		if(this.user){
			if (this.user.offersSaved)
				if(this.user.offersSaved.indexOf(id)>=0)
					return true;
		}
		return false;
	}

	this.updateProfile = function(user){
		$http({method: 'POST', url: '/api/account/update_profile', data:user}).
    	success(function(data, status, headers, config) {
		//	scope.getCurrentUser();
		//this.set()
			console.log('save profile success', data);
    	}).
    	error(function(data, status, headers, config) {
    //		console.log('save profile error', data);
    	});
	};





	return this;

});
