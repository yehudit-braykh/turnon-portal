(function() {

    var AccountOverviewInputController = [
        '$scope',
        '$rootScope',
        '$timeout',
        function($scope, $rootScope, $timeout) {

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

            function _isEmailValid() {
                $scope.showEmailError = false;
                $scope.showEmailConfirmationError = false;

                if (!$scope.ngModel) {
                    $scope.showEmailError = true;
                    $scope.emailErrorMessage = 'Email is required';
                    return false;
                }
                return true;
            }

            $scope.editing = false;
            $scope.days = _getRangeDropdownOptions(1, 31);
            $scope.months = _getRangeDropdownOptions(1, 12);
            $scope.years = _getRangeDropdownOptions(1900, 2000);

            $scope.genders = [
                {
                    label: 'Male',
                    value: 'male'
                },
                {
                    label: 'Female',
                    value: 'female'
                },
                {
                    label: 'Other',
                    value: 'other'
                }
            ];

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
                var isValid = true;
                $scope.editing = false;

                if ($scope.type === 'email') {
                    isValid = _isEmailValid();
                }

                if ($scope.type === 'birthdate' && $scope.birthdate) {
                    $scope.ngModel = $scope.birthdate;
                }

                if ($scope.type === 'gender' && $scope.gender) {
                    $scope.ngModel = $scope.gender.value;
                }

                if (isValid) {
                    $timeout(function() {
                        $scope.onSave();
                    });
                }
            };

            $rootScope.$on('account.edit', function() {
                if ($scope.editing) {
                    $scope.onCancelPress();
                }
            });

            $scope.$watch('ngModel', function() {
                if ($scope.type === 'birthdate' && ($scope.ngModel instanceof Date)) {
                    $scope.birthdateLabel = moment($scope.ngModel).format('M/D/YY')
                }
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountOverviewInputController', AccountOverviewInputController);
}());