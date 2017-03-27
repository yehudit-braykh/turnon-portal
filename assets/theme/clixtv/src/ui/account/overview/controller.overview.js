(function() {

    var AccountOverviewController = [
        '$scope',
        '$rootScope',
        'userService',
        function($scope, $rootScope, userService) {


            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        console.log(data);
                        $scope.form = {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            password: '*********',
                            gender: (data.gender) ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : undefined,
                            phone: data.phone
                        }
                    }
                )
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountOverviewController', AccountOverviewController);
}());