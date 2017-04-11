(function() {
    angular
        .module('clixtv')
        .factory('NotificationModel', [
            function() {
                return function(data) {
                    this.id = data._id;
                    this.message = data.message;
                    this.subject = data.subject;
                    this.addedDate = data.added;
                    this.updatedDate = data.updated;
                }
            }
        ]);
}());