(function() {

    var storageService = [
        'localStorageService',
        function(localStorageService) {
            return {

                setItem: function(key, value) {
                    return localStorageService.set(key, value);
                },

                getItem: function(key) {
                    return localStorageService.get(key);
                }
            }
        }
    ];

    angular
        .module('turnon')
        .factory('storageService', storageService);
}());