(function() {

    var LoginSignupController = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'userService',
        'signup',
        function($scope, $rootScope, $uibModalInstance, userService, signup) {

            $scope.signup = signup;

            $scope.loginModel = {
                email: '',
                password: ''
            };

            $scope.signupModel = {
                email: '',
                emailConfirm: '',
                password: '',
                passwordConfirm: '',
                firstName: '',
                lastName: '',
                birthdate: '',
                gender: ''
            };

            $scope.onLoginPress = function() {
                $scope.signup = false;
            };

            $scope.onSignupPress = function() {
                $scope.signup = true;
            };

            $scope.onLoginSubmit = function() {
                if (!$scope.loginModel.email || !$scope.loginModel.password) {
                    // todo - Error state for validation...
                    return;
                }
                userService.loginWithEmailPassword($scope.loginModel.email, $scope.loginModel.password)
                    .then(
                        function onSuccess(data) {
                            $uibModalInstance.close();
                        }
                    )
                    .catch(
                        function onError(error) {
                            // todo - Error state...
                            console.log(error);
                        }
                    );
            };

            $scope.onSignupSubmit = function() {

                if (
                    !$scope.signupModel.email ||
                    !$scope.signupModel.password ||
                    !$scope.signupModel.firstName ||
                    !$scope.signupModel.lastName/* ||
                    !$scope.signupModel.birthdate ||
                    !$scope.signupModel.gender*/
                ) {
                    // todo - Error state for validation...
                    return;
                }

                if ($scope.signupModel.email !== $scope.signupModel.emailConfirm) {
                    // todo - Error state for validation...
                    return;
                }

                if ($scope.signupModel.password !== $scope.signupModel.passwordConfirm) {
                    // todo - Error state for validation...
                    return;
                }

                userService.signupUser($scope.signupModel.email, $scope.signupModel.password, $scope.signupModel.firstName, $scope.signupModel.lastName)
                    .then(
                        function onSuccess(data) {
                            $uibModalInstance.close();
                        }
                    )
                    .catch(
                        function onError(error) {
                            // todo - Error state...
                            console.log(error);
                        }
                    );
            };

            $scope.onCloseIconPress = function() {
                $uibModalInstance.close();
            };

            $scope.onFacebookLoginPress = function() {
                window.open('/hauth/login/Facebook', 'fb', 'left=20,top=20,width=600,height=800,toolbar=1,resizable=0');
            };

            $scope.onGoogleLoginPress = function() {
                window.open('/hauth/login/Google', 'google', 'left=20,top=20,width=600,height=800,toolbar=1,resizable=0');
            };

            /**
             * @fixme - This is legacy "login with social network" code that'll take a much larger effort to refactor
             */
            // gross...
            window.finished_login = function() {
                userService.setLoggedInUser()
                    .then(
                        function onSuccess(data) {
                            $uibModalInstance.close();
                        }
                    );
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('LoginSignupController', LoginSignupController);
}());