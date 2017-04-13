(function() {

    var userService = [
        '$q',
        '$http',
        '$log',
        '$rootScope',
        function($q, $http, $log, $rootScope) {

            var loggedInUser;

            function _getFavoriteMethodForType(type, isDelete) {
                switch(type) {
                    case 'celebrity':
                        return isDelete ? 'remove_favorite_celebrity' : 'add_favorite_celebrity';
                    case 'brand':
                        return isDelete ? 'remove_favorite_brand' : 'add_favorite_brand';
                    case 'category':
                        return isDelete ? 'remove_favorite_category' : 'add_favorite_category';
                    case 'charity':
                        return isDelete ? 'remove_favorite_charity' : 'add_favorite_charity';
                    default:
                        return undefined;
                }
            }

            function _addFavorite(id, type) {
                var userFavoriteMethod, favorites;

                if (!loggedInUser) {
                    $log.error('No logged in user found to add favorite', type);
                    return;
                }

                if (!id) {
                    $log.error('No ID provided to add to favorites');
                    return;
                }

                userFavoriteMethod = _getFavoriteMethodForType(type, false);

                if (!userFavoriteMethod) {
                    throw new Error('Invalid type provided for favorite');
                }

                return $http.post('/api/account/' + userFavoriteMethod, {
                    id: id
                });

                //
                // favorites = loggedInUser[userFavoriteProperty] || [];
                //
                // if (favorites.indexOf(id) !== -1) {
                //     $log.warn(id + ' has already been favorited');
                //     return;
                // }
                //
                // favorites.push(id);
                //
                // loggedInUser[userFavoriteProperty] = favorites;
                //
                // return methods.updateUser(loggedInUser);
            }

            function _removeFavorite(id, type) {
                if (!loggedInUser) {
                    $log.error('No logged in user found to remove favorite', type);
                    return;
                }

            }

            var methods = {

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

                updateUser: function(user) {
                    return $http.post('/api/account/update_profile', {
                        data: user
                    });
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
                },

                addFavoriteCelebrity: function(id) {
                    return _addFavorite(id, 'celebrity');
                },

                removeFavoriteCelebrity: function(id) {
                    return _removeFavorite(id, 'celebrity');
                },

                addFavoriteBrand: function(id) {
                    return _addFavorite(id, 'brand');
                },

                removeFavoriteBrand: function(id) {
                    return _removeFavorite(id, 'brand');
                },

                addFavoriteCategory: function(id) {
                    return _addFavorite(id, 'category');
                },

                removeFavoriteCategory: function(id) {
                    return _removeFavorite(id, 'category');
                },

                addFavoriteCharity: function(id) {
                    return _addFavorite(id, 'charity');
                },

                removeFavoriteCharity: function(id) {
                    return _removeFavorite(id, 'charity');
                },

                addVideoToWatchlist: function(id) {
                    // _addFavorite(id, 'watchlist');
                },

                removeVideoFromWatchlist: function(id) {
                    // _removeFavorite(id, 'watchlist');
                }
            };

            return methods;
        }
    ];

    angular
        .module('clixtv')
        .factory('userService', userService);
}());