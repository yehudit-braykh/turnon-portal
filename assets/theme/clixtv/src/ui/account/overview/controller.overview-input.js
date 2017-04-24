(function() {

    var AccountOverviewInputController = [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {

            $scope.editing = false;

            var oldValue;

            $scope.onFieldEdit = function() {
                $rootScope.$broadcast('account.edit');
                oldValue = $scope.ngModel;
                $scope.editing = true;
            };

            $scope.onCancelPress = function() {
                $scope.editing = false;
                $scope.ngModel = oldValue;
            };

            $scope.onSavePress = function() {
                $scope.editing = false;
                $scope.onSave();
            };

            $rootScope.$on('account.edit', function() {
                if ($scope.editing) {
                    $scope.onCancelPress();
                }
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountOverviewInputController', AccountOverviewInputController);
}());