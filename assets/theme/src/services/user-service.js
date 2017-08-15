(function() {

    var userService = [
        '$q',
        '$http',
        '$log',
        '$rootScope',
        'BrandListModel',
        'OfferListModel',
        'CharityListModel',
        'CelebrityListModel',
        'CategoryListModel',
        'VideoListModel',
        'AccountSettingListModel',
        'UserModel',
        'modalService',
        'catchMediaService',
        'turnonConfig',
        function($q, $http, $log, $rootScope, BrandListModel, OfferListModel, CharityListModel, CelebrityListModel, CategoryListModel, VideoListModel, AccountSettingListModel, UserModel, modalService, catchMediaService, turnonConfig) {

            var loggedInUser, loggedInUserChecked;

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
                    case 'offer':
                        return isDelete ? 'unsave_offer' : 'save_offer';
                    case 'watchlist':
                        return isDelete ? 'remove_watchlist_item' : 'add_watchlist_item';
                }
                return undefined;
            }

            function _getFavoritePropertyForType(type) {
                switch(type) {
                    case 'celebrity':
                        return 'favoriteCelebs';
                    case 'brand':
                        return 'favoriteBrands';
                    case 'category':
                        return 'favoriteCategories';
                    case 'charity':
                        return 'favoriteCharities';
                    case 'offer':
                        return 'offersSaved';
                    case 'watchlist':
                        return 'watchlist';
                }
                return undefined;
            }

            function _addFavorite(id, type) {
                var userFavoriteMethod, favoriteProperty, favorites;

                if (!loggedInUser) {

                    $rootScope.$broadcast('favorite.added.anonymous', {
                        type: type,
                        id: id
                    });

                    $log.warn('No logged in user found to add favorite', type);
                    return;
                }

                if (!id) {
                    $log.error('No ID provided to add to favorites');
                    return;
                }

                userFavoriteMethod = _getFavoriteMethodForType(type, false);
                favoriteProperty = _getFavoritePropertyForType(type);

                if (!userFavoriteMethod) {
                    throw new Error('Invalid type provided for favorite');
                }
                if (favoriteProperty) {
                    favorites = loggedInUser[favoriteProperty];
                    if (!favorites) {
                        favorites = [];
                    }
                    if (favorites.indexOf(id) === -1) {
                        favorites.push(id);
                        loggedInUser[favoriteProperty] = favorites;
                        $rootScope.$broadcast('favorite.added', {
                            user: loggedInUser,
                            type: type,
                            id: id
                        });
                    }
                }

                switch(type) {
                    case 'celebrity':
                        catchMediaService.trackAppEvent('favorite', {
                            target_cm: 'media',
                            target_type: 'person',
                            target_id: id
                        });
                        break;
                    case 'brand':
                        catchMediaService.trackAppEvent('favorite', {
                            target_cm: 'media',
                            target_type: 'campaign',
                            target_id: id
                        });
                        break;
                    case 'charity':
                        catchMediaService.trackAppEvent('favorite', {
                            target_cm: 'media',
                            target_type: 'organization',
                            target_id: id
                        });
                        break;
                    case 'watchlist':
                        catchMediaService.trackMediaEvent(id, 'episode', 'watchlist_add');
                        break;
                }

                return $http.post('/api/account/' + userFavoriteMethod, {
                    id: id
                });
            }

            function _getRemoveConfirmationModalData(type) {
                var title, message;
                switch(type) {
                    case 'celebrity':
                    case 'brand':
                    case 'category':
                    case 'charity':
                        var attribute = type;
                        if (attribute === 'celebrity') {
                            attribute = 'star';
                        }
                        title = 'Remove From Favorites?';
                        message = 'Are you sure you want to remove this ' + attribute + ' from your favorites? You will no longer receive notifications when new content or any special offers are added.';
                        break;

                    case 'watchlist':
                        title = 'Remove From Watchlist?';
                        message = 'Are you sure you want to remove this video from your watchlist?';
                        break;

                    case 'offer':
                        title = 'Remove From Saved Offers?';
                        message = 'Are you sure you want to remove this offer from your list of saved offers?';
                        break;
                }
                return {
                    title: title,
                    message: message
                }
            }

            function _removeFavorite(id, type) {
                var userFavoriteMethod, favoriteProperty, favorites;

                if (!loggedInUser) {
                    $log.error('No logged in user found to remove favorite', type);
                    return;
                }

                if (!id) {
                    $log.error('No ID provided to remove from favorites');
                    return;
                }

                userFavoriteMethod = _getFavoriteMethodForType(type, true);
                favoriteProperty = _getFavoritePropertyForType(type);

                if (!userFavoriteMethod) {
                    throw new Error('Invalid type provided for favorite');
                }

                var modalData = _getRemoveConfirmationModalData(type);
                return modalService.showConfirmationModal(modalData.title, modalData.message)
                    .then(
                        function onSuccess() {

                            if (favoriteProperty) {
                                favorites = loggedInUser[favoriteProperty];
                                if (!favorites) {
                                    favorites = [];
                                }
                                if (favorites.indexOf(id) !== -1) {

                                    favorites.splice(favorites.indexOf(id), 1);
                                    loggedInUser[favoriteProperty] = favorites;
                                    $rootScope.$broadcast('favorite.removed', {
                                        user: loggedInUser,
                                        type: type,
                                        id: id
                                    });
                                }
                            }

                            return $http.post('/api/account/' + userFavoriteMethod, {
                                id: id
                            });
                        }
                    );
            }

            function _isFavorite(id, type) {
                var favoriteProperty, favorites;
                if (!loggedInUser) {
                    return false;
                }

                favoriteProperty = _getFavoritePropertyForType(type);

                if (!favoriteProperty) {
                    throw new Error('Invalid property defined to look up favorite: ' + type);
                }

                favorites = loggedInUser[favoriteProperty];

                if (!favorites) {
                    favorites = [];
                }

                return favorites.indexOf(id) !== -1;
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
                                if (!data || !data.data || !data.data._id) {
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
                        })
                        .then(
                            function onSuccess(data) {
                                loggedInUser = data.data;
                                $rootScope.$broadcast('user.update', loggedInUser);
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
                    var deferred = $q.defer();
                    if (loggedInUserChecked) {
                        return $q.when(loggedInUser);
                    }
                    $rootScope.$on('user.login', function() {
                        deferred.resolve(loggedInUser);
                    });
                    return deferred.promise;
                },

                setLoggedInUser: function() {
                    return $http.get('/api/account/get_current')
                        .then(
                            function onSuccess(data) {

                                loggedInUserChecked = true;

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
                                return new VideoListModel(data.data);
                            }
                        );
                },

                getFavoriteCelebrities: function() {
                    return $http.get('/api/account/get_favorite_celebrities')
                        .then(
                            function onSuccess(data) {
                                return new CelebrityListModel(data.data);
                            }
                        );
                },

                getFavoriteBrands: function() {
                    return $http.get('/api/account/get_favorite_brands')
                        .then(
                            function onSuccess(data) {
                                return new BrandListModel(data.data);
                            }
                        );
                },

                getFavoriteCharities: function() {
                    return $http.get('/api/account/get_favorite_charities')
                        .then(
                            function onSuccess(data) {
                                return new CharityListModel(data.data);
                            }
                        );
                },

                getFavoriteCategories: function() {
                    return $http.get('/api/account/get_favorite_categories')
                        .then(
                            function onSuccess(data) {
                                return new CategoryListModel(data.data);
                            }
                        );
                },

                getSavedOffers: function() {
                    return $http.get('/api/account/get_saved_offers')
                        .then(
                            function onSuccess(data) {
                                return new OfferListModel(data.data);
                            }
                        );
                },

                getAccountSettings: function() {
                    return $http.get('/api/account/get_settings')
                        .then(
                            function onSuccess(data) {
                                return new AccountSettingListModel(data.data);
                            }
                        );
                },

                enableAccountSetting: function(id) {
                    return $http.post('/api/account/enable_setting', {
                        id: id
                    });
                },

                disableAccountSetting: function(id) {
                    return $http.post('/api/account/disable_setting', {
                        id: id
                    });
                },

                isSavedOffer: function(id) {
                    return _isFavorite(id, 'offer');
                },

                addSavedOffer: function(id) {
                    return _addFavorite(id, 'offer');
                },

                removeSavedOffer: function(id) {
                    return _removeFavorite(id, 'offer');
                },

                isFavoriteCelebrity: function(id) {
                    return _isFavorite(id, 'celebrity');
                },

                addFavoriteCelebrity: function(id) {
                    return _addFavorite(id, 'celebrity');
                },

                removeFavoriteCelebrity: function(id) {
                    return _removeFavorite(id, 'celebrity');
                },

                isFavoriteBrand: function(id) {
                    return _isFavorite(id, 'brand');
                },

                addFavoriteBrand: function(id) {
                    return _addFavorite(id, 'brand');
                },

                removeFavoriteBrand: function(id) {
                    return _removeFavorite(id, 'brand');
                },

                isFavoriteCategory: function(id) {
                    return _isFavorite(id, 'category');
                },

                addFavoriteCategory: function(id) {
                    return _addFavorite(id, 'category');
                },

                removeFavoriteCategory: function(id) {
                    return _removeFavorite(id, 'category');
                },

                isFavoriteCharity: function(id) {
                    return _isFavorite(id, 'charity');
                },

                addFavoriteCharity: function(id) {
                    return _addFavorite(id, 'charity');
                },

                removeFavoriteCharity: function(id) {
                    return _removeFavorite(id, 'charity');
                },

                isVideoOnWatchlist: function(id) {
                    return _isFavorite(id, 'watchlist');
                },

                addVideoToWatchlist: function(id) {
                    _addFavorite(id, 'watchlist');
                },

                removeVideoFromWatchlist: function(id) {
                    _removeFavorite(id, 'watchlist');
                },

                addUserToNewsletter: function(email, firstName, lastName) {
                    return $http.post(turnonConfig.baseApi + '/users/newsletter', {
                        email: email
                    });
                }
            };

            return methods;
        }
    ];

    angular
        .module('turnon')
        .factory('userService', userService);
}());