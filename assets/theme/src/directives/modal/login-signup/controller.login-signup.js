(function() {

    var LoginSignupController = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'userService',
        'data',
        'clixConfig',
        function($scope, $rootScope, $uibModalInstance, userService, data, clixConfig) {

            $scope.signup = data.signup;

            $scope.isBeta = (clixConfig.beta === true);

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
                realFirstName: '',
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
                $scope.error = undefined;
                if (!$scope.loginModel.email || !$scope.loginModel.password) {
                    $scope.error = 'All fields are required';
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
                            $scope.error = 'Incorrect login information';
                            console.log(error);
                        }
                    );
            };

            $scope.onSignupSubmit = function() {

                // Honeypot field...
                if ($scope.signupModel.firstName) {
                    return;
                }

                $scope.error = undefined;

                if (
                    !$scope.signupModel.email ||
                    !$scope.signupModel.password ||
                    !$scope.signupModel.realFirstName ||
                    !$scope.signupModel.lastName/* ||
                    !$scope.signupModel.birthdate ||
                    !$scope.signupModel.gender*/
                ) {
                    $scope.error = 'All fields are required';
                    return;
                }

                if ($scope.signupModel.email !== $scope.signupModel.emailConfirm) {
                    $scope.error = 'Email and confirmation do not match';
                    return;
                }

                if ($scope.signupModel.password !== $scope.signupModel.passwordConfirm) {
                    $scope.error = 'Password and confirmation do not match';
                    return;
                }



                userService.signupUser($scope.signupModel.email, $scope.signupModel.password, $scope.signupModel.realFirstName, $scope.signupModel.lastName)
                    .then(
                        function onSuccess(data) {
                            $uibModalInstance.close();
                            userService.addUserToNewsletter($scope.signupModel.email, $scope.signupModel.realFirstName, $scope.signupModel.lastName);
                        }
                    )
                    .catch(
                        function onError(error) {
                            $scope.error = 'Account already exists with this email address';
                            console.log(error);
                        }
                    );
            };

            $scope.onCloseIconPress = function() {
                $uibModalInstance.close();
            };

            $scope.onFacebookLoginPress = function() {
                window.open('/hauth/login/Facebook', 'fb', 'left=20,top=20,width=600,height=500,toolbar=1,resizable=0');
            };

            $scope.onGoogleLoginPress = function() {
                window.open('/hauth/login/Google', 'google', 'left=20,top=20,width=600,height=500,toolbar=1,resizable=0');
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
                            userService.addUserToNewsletter(data.email, data.firstName, data.lastName);
                        }
                    );
            };
        }
    ];

    angular
        .module('turnon')
        .controller('LoginSignupController', LoginSignupController);
}());