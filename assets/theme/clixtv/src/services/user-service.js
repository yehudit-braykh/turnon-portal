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

                                loggedInUser = data.data.content;

                                $rootScope.$broadcast('user.login', loggedInUser);
                                return data.data;
                            }
                        );
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
                    if (loggedInUser) {
                        return $q.when(loggedInUser);
                    }
                    return $http.get('/api/account/get_current')
                        .then(
                            function onSuccess(data) {
                                loggedInUser = data.data;

                                $rootScope.$broadcast('user.login', loggedInUser);

                                return loggedInUser;
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