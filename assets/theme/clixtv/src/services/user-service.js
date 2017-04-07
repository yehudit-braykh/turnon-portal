(function() {

    var userService = [
        '$q',
        '$http',
        '$rootScope',
        function($q, $http, $rootScope) {

            var loggedInUser;

            return {

                loginWithEmailPassword: function(email, password) {
                    return $http.post('/api/account/login_user', {
                            email: email,
                            password: password
                        })
                        .then(
                            function onSuccess(data) {

                                if (!data || !data.data || data.data.error) {
                                    throw new Error(data.data);
                                }

                                loggedInUser = data.data;

                                $rootScope.$broadcast('user.login', loggedInUser);
                                return data.data;
                            }
                        );
                },

                signupUser: function(email, password, firstName, lastName, birthdate, gender) {
                    return $http.post('/api/account/register', {
                            email: email,
                            password: password,
                            first_name: firstName,
                            last_name: lastName
                        })
                        .then(
                            function onSuccess(data) {
                                if (!data || !data.data || data.data.error) {
                                    throw new Error(data.data);
                                }

                                loggedInUser = data.data;

                                $rootScope.$broadcast('user.login', loggedInUser);
                                return data.data;
                            }
                        )
                },

                logout: function() {
                    return $http.post('/api/account/logout')
                        .then(
                            function onSuccess(data) {

                                loggedInUser = undefined;

                                $rootScope.$broadcast('user.logout');
                                return data;
                            }
                        );
                },

                getLoggedInUser: function() {
                    return $q.when(loggedInUser);
                },

                setLoggedInUser: function() {
                    return $http.get('/api/account/get_current')
                        .then(
                            function onSuccess(data) {
                                loggedInUser = data.data;

                                $rootScope.$broadcast('user.login', loggedInUser);

                                return loggedInUser;
                            }
                        );
                },

                getWatchlist: function() {
                    return $http.get('/api/account/get_watchlist')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                getFavoriteCelebrities: function() {
                    return $http.get('/api/account/get_favorites?type=favoriteCelebs')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                getFavoriteBrands: function() {
                    return $http.get('/api/account/get_favorites?type=favoriteBrands')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                getFavoriteCharities: function() {
                    return $http.get('/api/account/get_favorites?type=favoriteCharities')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                getFavoriteCategories: function() {
                    return $http.get('/api/account/get_favorites?type=favoriteCategories')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                getSavedOffers: function() {
                    return $http.get('/api/account/get_favorites?type=offersSaved')
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('userService', userService);
}());