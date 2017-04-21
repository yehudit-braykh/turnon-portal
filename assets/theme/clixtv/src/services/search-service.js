(function() {

    var searchService = [
        '$http',
        'SearchResultsModel',
        function($http, SearchResultsModel) {
            return {

                getSearchResults: function(term, offset, limit) {
                    return $http.get('/api/search?keyword=' + term)
                        .then(
                            function onSuccess(data) {
                                return new SearchResultsModel(data.data);
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('searchService', searchService);
}());