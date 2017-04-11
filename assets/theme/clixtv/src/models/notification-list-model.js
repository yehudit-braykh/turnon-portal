(function() {
    angular
        .module('clixtv')
        .factory('NotificationListModel', [
            'NotificationModel',
            function(NotificationModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.notifications = data.map(function(notification) {
                        return new NotificationModel(notification);
                    });
                }
            }
        ]);
}());