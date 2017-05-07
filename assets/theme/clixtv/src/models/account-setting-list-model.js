(function() {

    angular
        .module('clixtv')
        .factory('AccountSettingListModel', [
            'AccountSettingModel',
            function(AccountSettingModel) {
                return function(data) {
                    if (!(data instanceof Array)) {
                        return [];
                    }
                    this.settings = data.map(function(setting) {
                        return new AccountSettingModel(setting);
                    });
                }
            }
        ]);
}());