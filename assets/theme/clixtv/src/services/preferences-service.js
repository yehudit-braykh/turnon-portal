(function() {

    var preferencesService = [
        'storageService',
        'userService',
        function(storageService, userService) {

            function _getShowEducationModalPreferenceKey(type) {
                return userService.getLoggedInUser()
                    .then(
                        function onSuccess(data) {
                            var userId = (data && data._id) ? data._id : '';
                            return 'hide-' + type + '-' + userId;
                        }
                    )
            }

            return {

                setShowEducationModalPreference: function(type, show) {
                    return _getShowEducationModalPreferenceKey(type)
                        .then(
                            function onSuccess(data) {
                                return storageService.setItem(data, show);
                            }
                        )
                },

                getShowEducationModalPreference: function(type) {
                    return _getShowEducationModalPreferenceKey(type)
                        .then(
                            function onSuccess(data) {
                                return storageService.getItem(data);
                            }
                        )
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('preferencesService', preferencesService);
}());