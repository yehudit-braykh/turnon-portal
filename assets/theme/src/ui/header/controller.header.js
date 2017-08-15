(function() {

    var HeaderController = [
        '$q',
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        '$uibModal',
        'notificationsService',
        'knetikService',
        'modalService',
        'catchMediaService',
        'turnonConfig',
        function($q, $scope, $rootScope, $window, $timeout, $uibModal, notificationsService, knetikService, modalService, catchMediaService, turnonConfig) {

            // var latestOffset = 0;
            //
            // $scope.isBeta = (turnonConfig.beta === true);
            //
            // function _populateHeaderData() {
            //     $q.all(
            //             [
            //                 notificationsService.getNotifications(),
            //                 knetikService.getPoints()
            //             ]
            //         )
            //         .then(
            //             function onSuccess(data) {
            //                 var points = data[1];
            //                 $scope.notifications = data[0];
            //                 if (points && !isNaN(points.balance)) {
            //                     $scope.points = parseInt(points.balance);
            //                 } else {
            //                     $scope.points = 0;
            //                 }
            //             }
            //         );
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     $scope.loggedInUser = data;
            //     _populateHeaderData();
            // });
            //
            // $rootScope.$on('user.update', function(event, data) {
            //     $scope.loggedInUser = data;
            // });
            //
            // $rootScope.$on('user.logout', function(event, data) {
            //     delete $scope.loggedInUser;
            // });
            //
            // $scope.onArrowPress = function() {
            //     $rootScope.$broadcast('rightnav.open');
            // };
            //
            // $scope.onNamePress = function() {
            //     if ($scope.notifications.notifications.length === 0) {
            //         return;
            //     }
            //     $scope.tooltipsShown = !$scope.tooltipsShown;
            // };
            //
            // $scope.hideNotificationMenu = function(event) {
            //     $scope.tooltipsShown = false;
            // };
            //
            // $scope.onLoginSignupPress = function(signup) {
            //     if (signup) {
            //         modalService.showSignUpModal();
            //     } else {
            //         modalService.showLogInModal();
            //     }
            // };
            //
            // angular.element($window).on('scroll', function() {
            //     var direction;
            //     if (latestOffset > this.pageYOffset) {
            //         direction = 'down';
            //     } else if (latestOffset < this.pageYOffset && this.pageYOffset > 250) {
            //         direction = 'up';
            //     }
            //     latestOffset = this.pageYOffset;
            //     if ($scope.scrollDirection !== direction) {
            //         $scope.scrollDirection = direction;
            //         $timeout(function() {
            //             $scope.$apply();
            //         });
            //     }
            // });
            //
            // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            //     if (toState) {
            //         $scope.selectedStateName = toState.name;
            //     }
            // });
        }
    ];

    angular
        .module('turnon')
        .controller('HeaderController', HeaderController);
}());
