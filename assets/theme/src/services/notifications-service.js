(function() {

    var notificationsService = [
        '$http',
        'turnonConfig',
        'NotificationListModel',
        function($http, turnonConfig, NotificationListModel) {
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
                },

                sendContactNotification: function(type, name, email, subject, message) {
                    return $http.post(turnonConfig.baseApi + '/notifications/contact', {
                            type: type,
                            name: name,
                            email: email,
                            subject: subject,
                            message: message
                        })
                        .then(
                            function onSuccess(data) {
                                return data.data;
                            }
                        );
                },

                sendShareEmail: function(fromEmail, fromName, toEmails, message) {
                    return $http.post(turnonConfig.baseApi + '/notifications/share', {
                            type: 'email',
                            emailList: toEmails,
                            fromEmail: fromEmail,
                            fromName: fromName,
                            message: message
                        })
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
        .module('turnon')
        .factory('notificationsService', notificationsService);
}());