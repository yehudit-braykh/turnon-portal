(function() {

    var notificationsService = [
        '$http',
        'NotificationListModel',
        function($http, NotificationListModel) {
            return {

                /**
                 * @todo - Cache this call
                 */
                getNotifications: function() {
                    return $http.get('/api/notifications/get_notifications')
                        .then(
                            function(data) {
                                return new NotificationListModel(data.data);
                            }
                        );
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('notificationsService', notificationsService);
}());