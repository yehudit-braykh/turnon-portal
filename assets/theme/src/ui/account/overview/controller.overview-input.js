(function() {

    var AccountOverviewInputController = [
        '$scope',
        '$rootScope',
        '$timeout',
        function($scope, $rootScope, $timeout) {

            // var oldValue;
            //
            // function _getRangeDropdownOptions(from, to) {
            //     var options = [];
            //     for(var i = from, length = to; i <= length; i++) {
            //         options.push({
            //             label: i
            //         });
            //     }
            //     return options;
            // }
            //
            // function _disableAllErrorStates() {
            //     [
            //         'showEmailError',
            //         'showEmailConfirmationError',
            //         'showOldPasswordError',
            //         'showNewPasswordError',
            //         'showNewPasswordConfirmError',
            //         'showPhoneError'
            //     ].forEach(function(key) {
            //         $scope[key] = false;
            //     });
            //     $scope.formHasErrors = false;
            // }
            //
            // function _isEmailValid() {
            //     _disableAllErrorStates();
            //
            //     // Invalid email...
            //     if ($scope.ngModel === undefined || $scope.ngModel === null) {
            //         $scope.emailErrorMessage = 'Invalid email address';
            //         $timeout(function() {
            //             $scope.showEmailError = true;
            //         });
            //         return false;
            //     }
            //
            //     // Empty email...
            //     if ($scope.ngModel.length === 0) {
            //         $scope.emailErrorMessage = 'Email is required';
            //         $timeout(function() {
            //             $scope.showEmailError = true;
            //         });
            //         return false;
            //     }
            //
            //     // Matching email confirmation...
            //     if ($scope.ngModel !== $scope.emailConfirm) {
            //         $scope.emailConfirmationErrorMessage = 'Email does not match';
            //         $timeout(function() {
            //             $scope.showEmailConfirmationError = true;
            //         });
            //         return false;
            //     }
            //
            //     return true;
            // }
            //
            // function _isPasswordValid() {
            //     _disableAllErrorStates();
            //
            //     // Invalid old password...
            //     if ($scope.ngModel === undefined || $scope.ngModel === '') {
            //         $scope.oldPasswordErrorMessage = 'Password is required';
            //         $timeout(function() {
            //             $scope.showOldPasswordError = true;
            //         });
            //         return false;
            //     }
            //
            //     // Invalid new password...
            //     if ($scope.newPassword === undefined || $scope.newPassword === '') {
            //         $scope.newPasswordErrorMessage = 'Password is required';
            //         $timeout(function() {
            //             $scope.showNewPasswordError = true;
            //         });
            //         return false;
            //     }
            //
            //     // Matching password confirmation...
            //     if ($scope.newPassword !== $scope.newPasswordConfirm) {
            //         $scope.newPasswordConfirmErrorMessage = 'Password does not match';
            //         $timeout(function() {
            //             $scope.showNewPasswordConfirmError = true;
            //         });
            //         return false;
            //     }
            //
            //     return true;
            // }
            //
            // function _isPhoneNumberValid() {
            //     var phoneNumber;
            //     _disableAllErrorStates();
            //     if (!$scope.ngModel) {
            //         return true;
            //     }
            //
            //     phoneNumber = $scope.ngModel.replace(/[^0-9]/g, '');
            //
            //     if (phoneNumber.length !== 10) {
            //         $scope.phoneErrorMessage = 'Not a valid phone number';
            //         $timeout(function() {
            //             $scope.showPhoneError = true;
            //         });
            //         return false;
            //     }
            //
            //     return true;
            // }
            //
            // $scope.editing = false;
            // $scope.days = _getRangeDropdownOptions(1, 31);
            // $scope.months = _getRangeDropdownOptions(1, 12);
            // $scope.years = _getRangeDropdownOptions(1900, 2000);
            //
            // $scope.genders = [
            //     {
            //         label: 'Male',
            //         value: 'male'
            //     },
            //     {
            //         label: 'Female',
            //         value: 'female'
            //     },
            //     {
            //         label: 'Other',
            //         value: 'other'
            //     }
            // ];
            //
            // $scope.onFieldEdit = function() {
            //     oldValue = $scope.ngModel;
            //     $rootScope.$broadcast('account.edit');
            //     $scope.editing = true;
            //
            //     if ($scope.type === 'email') {
            //         $scope.ngModel = '';
            //         $scope.emailConfirm = '';
            //     }
            //
            //     if ($scope.type === 'password') {
            //         $scope.ngModel = '';
            //         $scope.newPassword = '';
            //         $scope.newPasswordConfirm = '';
            //     }
            // };
            //
            // $scope.onCancelPress = function() {
            //     $scope.editing = false;
            //     $scope.ngModel = oldValue;
            //     _disableAllErrorStates();
            // };
            //
            // $scope.onSavePress = function() {
            //     var isValid = true;
            //
            //     $scope.formHasErrors = false;
            //
            //     if ($scope.type === 'email') {
            //         isValid = _isEmailValid();
            //     }
            //
            //     if ($scope.type === 'password') {
            //         isValid = _isPasswordValid();
            //     }
            //
            //     if ($scope.type === 'phone') {
            //         isValid = _isPhoneNumberValid();
            //     }
            //
            //     if ($scope.type === 'birthdate' && $scope.birthdate) {
            //         $scope.ngModel = $scope.birthdate;
            //     }
            //
            //     if ($scope.type === 'gender' && $scope.gender) {
            //         $scope.ngModel = $scope.gender.value;
            //     }
            //
            //     if (isValid) {
            //         $timeout(function() {
            //             $scope.editing = false;
            //             $scope.onSave();
            //         });
            //     } else {
            //         $scope.formHasErrors = true;
            //     }
            // };
            //
            // $rootScope.$on('account.edit', function() {
            //     if ($scope.editing) {
            //         $scope.onCancelPress();
            //     }
            // });
            //
            // $scope.$watch('ngModel', function() {
            //     if ($scope.type === 'birthdate' && ($scope.ngModel instanceof Date)) {
            //         $scope.birthdateLabel = moment($scope.ngModel).format('M/D/YY')
            //     }
            //
            //     if ($scope.type === 'gender' && (typeof $scope.ngModel === 'string')) {
            //         $scope.gender = $scope.genders.filter(function(availableGender) {
            //             return availableGender.value === $scope.ngModel.toLowerCase();
            //         })[0];
            //     }
            // });
        }
    ];

    angular
        .module('turnon')
        .controller('AccountOverviewInputController', AccountOverviewInputController);
}());
