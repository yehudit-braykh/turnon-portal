(function() {

    var AccountController = [
        '$q',
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'userService',
        function($q, $scope, $rootScope, $state, $stateParams, userService) {

            // var loggedInUserChecked = false;
            //
            // $scope.activeItem = $stateParams.section;
            //
            // $scope.onNavigationItemSelect = function(item) {
            //     $scope.activeItem = item;
            // };
            //
            // function _setLoggedInUser(user) {
            //     if (!user && loggedInUserChecked) {
            //         $state.go('home');
            //         return;
            //     }
            //     loggedInUserChecked = true;
            //     $scope.loggedInUser = user;
            //     if (user) {
            //         $scope.ready = true;
            //     }
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     _setLoggedInUser(data);
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     $state.go('home');
            // });
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             _setLoggedInUser(data);
            //         }
            //     );

        }
    ];

    angular
        .module('turnon')
        .controller('AccountController', AccountController);
}());
