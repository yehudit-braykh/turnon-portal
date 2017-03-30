(function() {

    var LoginSignupController = [
        '$scope',
        '$uibModalInstance',
        'userService',
        'signup',
        function($scope, $uibModalInstance, userService, signup) {

            $scope.signup = signup;

            $scope.loginModel = {
                email: '',
                password: ''
            };

            $scope.signupModel = {
                email: '',
                password: ''
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

            $scope.onFacebookLoginPress = function() {

                // ...gross
                window.open('/hauth/login/Facebook', 'fb', 'left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
            };

            $scope.onGoogleLoginPress = function() {

                // ...gross again
                window.open('/hauth/login/Google', 'google', 'left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
            };

            $scope.onCloseIconPress = function() {
                $uibModalInstance.close();
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('LoginSignupController', LoginSignupController);
}());