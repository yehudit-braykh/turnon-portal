(function() {

    var AccountOverviewInputController = [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {

            var oldValue;

            function _getRangeDropdownOptions(from, to) {
                var options = [];
                for(var i = from, length = to; i <= length; i++) {
                    options.push({
                        label: i
                    });
                }
                return options;
            }

            $scope.editing = false;
            $scope.days = _getRangeDropdownOptions(1, 31);
            $scope.months = _getRangeDropdownOptions(1, 12);
            $scope.years = _getRangeDropdownOptions(1900, 2000);

            $scope.onFieldEdit = function() {
                oldValue = $scope.ngModel;
                $rootScope.$broadcast('account.edit');
                $scope.editing = true;
            };

            $scope.onCancelPress = function() {
                $scope.editing = false;
                $scope.ngModel = oldValue;
            };

            $scope.onSavePress = function() {
                $scope.editing = false;
                if ($scope.type === 'birthdate' && $scope.birthdate) {
                    $scope.ngModel = $scope.birthdate;
                }
                // $scope.onSave();
            };

            $rootScope.$on('account.edit', function() {
                if ($scope.editing) {
                    $scope.onCancelPress();
                }
            });

            $scope.$watch('ngModel', function() {
                if ($scope.type === 'birthdate' && ($scope.ngModel instanceof Date)) {
                    $scope.ngModel = moment($scope.ngModel).format('M/D/YY')
                }
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountOverviewInputController', AccountOverviewInputController);
}());