(function() {

    var searchService = [
        '$q',
        '$http',
        'SearchResultsModel',
        'CharityListModel',
        'BrandListModel',
        'OfferListModel',
        function($q, $http, SearchResultsModel, CharityListModel, BrandListModel, OfferListModel) {

            var searchCanceler;

            return {

                getSearchResults: function(term, offset, limit) {
                    var deferred = $q.defer();
                    if (searchCanceler) {
                        searchCanceler.resolve();
                        searchCanceler = undefined;
                    }
                    searchCanceler = $q.defer();
                    $http.get('/api/search?keyword=' + term, {timeout: searchCanceler.promise})
                        .then(
                            function onSuccess(data) {

                                // A cancelled request won't have a status code
                                if (!data.status || !data.data) {
                                    return;
                                }
                                deferred.resolve(new SearchResultsModel(data.data));
                            }
                        );
                    return deferred.promise;
                },

                getBrandSearchResults: function(term) {
                    var deferred = $q.defer();
                    if (searchCanceler) {
                        searchCanceler.resolve();
                        searchCanceler = undefined;
                    }
                    searchCanceler = $q.defer();
                    $http.get('/api/search/campaign?keyword=' + term, {timeout: searchCanceler.promise})
                        .then(
                            function onSuccess(data) {
                                if (!data.status || data.status === -1) {
                                    return;
                                }
                                deferred.resolve(new BrandListModel(data.data));
                            }
                        );
                    return deferred.promise;
                },

                getCharitySearchResults: function(term) {
                    var deferred = $q.defer();
                    if (searchCanceler) {
                        searchCanceler.resolve();
                        searchCanceler = undefined;
                    }
                    searchCanceler = $q.defer();
                    $http.get('/api/search/charity?keyword=' + term, {timeout: searchCanceler.promise})
                        .then(
                            function onSuccess(data) {
                                if (!data.status || data.status === -1) {
                                    return;
                                }
                                deferred.resolve(new CharityListModel(data.data));
                            }
                        );
                    return deferred.promise;
                },

                getOfferSearchResults: function(term) {
                    var deferred = $q.defer();
                    if (searchCanceler) {
                        searchCanceler.resolve();
                        searchCanceler = undefined;
                    }
                    searchCanceler = $q.defer();
                    $http.get('/api/search/offer?keyword=' + term, {timeout: searchCanceler.promise})
                        .then(
                            function onSuccess(data) {
                                if (!data.status || data.status === -1) {
                                    return;
                                }
                                deferred.resolve(new OfferListModel(data.data));
                            }
                        );
                    return deferred.promise;
                }
            }
        }
    ];

    angular
        .module('turnon')
        .factory('searchService', searchService);
}());