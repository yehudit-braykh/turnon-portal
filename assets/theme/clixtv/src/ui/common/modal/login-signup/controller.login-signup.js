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

            $scope.onCloseIconPress = function() {
                $uibModalInstance.close();
            };

            /**
             * @fixme - This is legacy "login with social network" code that'll take a much larger effort to refactor
             */
            $scope.onFacebookLoginPress = function() {

                // ...gross
                window.open('/hauth/login/Facebook', 'fb', 'left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
            };

            /**
             * @fixme - This is legacy "login with social network" code that'll take a much larger effort to refactor
             */
            $scope.onGoogleLoginPress = function() {

                // ...gross again
                window.open('/hauth/login/Google', 'google', 'left=20,top=20,width=500,height=400,toolbar=1,resizable=0');
            };

            /**
             * @fixme - This is legacy "login with social network" code that'll take a much larger effort to refactor
             */
            // ...gross again, again
            window.finished_login = function() {
                userService.getLoggedInUser()
                    .then(
                        function onSuccess(data) {
                            $rootScope.$broadcast('user.login', data);
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