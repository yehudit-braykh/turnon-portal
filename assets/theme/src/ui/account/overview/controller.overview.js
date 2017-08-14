(function() {

    var AccountOverviewController = [
        '$scope',
        '$rootScope',
        'userService',
        function($scope, $rootScope, userService) {
        // 
        //     $rootScope.pageTitle = 'Your Account Overview - turnon';
        //
        //     userService.getLoggedInUser()
        //         .then(
        //             function onSuccess(data) {
        //                 $scope.loggedInUser = data;
        //                 $scope.form = {
        //                     firstName: data.firstName,
        //                     lastName: data.lastName,
        //                     email: data.email,
        //                     password: '*********',
        //                     gender: (data.gender) ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : undefined,
        //                     phone: data.phone,
        //                     birthdate: (data.birthdate) ? new Date(parseFloat(data.birthdate) * 1000) : undefined
        //                 };
        //             }
        //         );
        //
        //     $scope.onSaveField = function() {
        //         userService.updateUser({
        //             firstName: $scope.form.firstName,
        //             lastName: $scope.form.lastName,
        //             birthdate: ($scope.form.birthdate instanceof Date) ? ($scope.form.birthdate.getTime() / 1000) : null,
        //             gender: ($scope.form.gender) ? $scope.form.gender.toLowerCase() : null,
        //             phone: ($scope.form.phone) ? $scope.form.phone.replace(/[^0-9]/g, '') : null
        //         });
        //     }
        // }
    ];

    angular
        .module('turnon')
        .controller('AccountOverviewController', AccountOverviewController);
}());
