(function() {

    var searchService = [
        '$q',
        '$http',
        'SearchResultsModel',
        'CharityListModel',
        function($q, $http, SearchResultsModel, CharityListModel) {

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

                getBrandSearchResults: function(term, offset, limit) {
                    return $http.get('/api/search/campaign?keyword=' + term)
                        .then(
                            function onSuccess(data) {
                                return new SearchResultsModel(data.data);
                            }
                        );
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
                                if (!data.status || !data.data) {
                                    return;
                                }
                                deferred.resolve(new CharityListModel(data.data));
                            }
                        );
                    return deferred.promise;
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('searchService', searchService);
}());