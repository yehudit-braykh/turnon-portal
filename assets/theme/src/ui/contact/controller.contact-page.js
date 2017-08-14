(function() {

    var ContactPageController = [
        '$scope',
        '$log',
        '$rootScope',
        '$stateParams',
        'userService',
        'notificationsService',
        'modalService',
        function($scope, $log, $rootScope, $stateParams, userService, notificationsService, modalService) {
            //
            // $scope.helpTypes = [
            //     {
            //         label: 'Investor Relations',
            //         data: 'investor-relations'
            //     },
            //     {
            //         label: 'Advertisers',
            //         data: 'advertisers'
            //     },
            //     {
            //         label: 'Jobs',
            //         data: 'jobs'
            //     },
            //     {
            //         label: 'Press',
            //         data: 'press'
            //     },
            //     {
            //         label: 'News',
            //         data: 'news'
            //     },
            //     {
            //         label: 'Affiliates',
            //         data: 'affiliates'
            //     },
            //     {
            //         label: 'Rewards',
            //         data: 'rewards'
            //     },
            //     {
            //         label: 'Help',
            //         data: 'help'
            //     }
            // ];
            //
            // $scope.form = {
            //     name: '',
            //     email: '',
            //     subject: '',
            //     description: ''
            // };
            //
            // $scope.onSubmit = function() {
            //     var error = false,
            //         helpType = ($scope.selectedHelpType) ? $scope.selectedHelpType.data : '';
            //     _resetErrorStates();
            //     if (!$scope.form.name) {
            //         $scope.showNameError = true;
            //         error = true;
            //     }
            //
            //     if (!$scope.form.email) {
            //         $scope.showEmailError = true;
            //         error = true;
            //     }
            //
            //     if (!$scope.form.subject) {
            //         $scope.showSubjectError = true;
            //         error = true;
            //     }
            //
            //     if (!$scope.form.description) {
            //         $scope.showDescriptionError = true;
            //         error = true;
            //     }
            //
            //     if (error) {
            //         return;
            //     }
            //
            //     notificationsService.sendContactNotification(helpType || 'help', $scope.form.name, $scope.form.email, $scope.form.subject, $scope.form.description)
            //         .then(
            //             function onSuccess(data) {
            //                 if (!data || !data.success) {
            //                     throw new Error('Invalid response from API');
            //                 }
            //                 modalService.showAlertModal('Success', 'Your message has been sent.<br />We will respond back as soon as we can!');
            //                 $scope.form.subject = '';
            //                 $scope.form.description = '';
            //             }
            //         )
            //         .catch(
            //             function onError(error) {
            //                 $log.error(error);
            //                 modalService.showAlertModal('Error', 'There was an error sending your message.<br />Please try again later.');
            //             }
            //         )
            // };
            //
            // if ($stateParams.section) {
            //     var selected = $scope.helpTypes.filter(function(type) {
            //         return type.data === $stateParams.section;
            //     })[0];
            //     if (selected) {
            //         $scope.selectedHelpType = selected;
            //     }
            // }
            //
            // function _resetErrorStates() {
            //     $scope.showNameError = false;
            //     $scope.showEmailError = false;
            //     $scope.showSubjectError = false;
            //     $scope.showDescriptionError = false;
            // }
            //
            // function _setDefaultInfo(user) {
            //     if (!user) {
            //         return;
            //     }
            //     if (!$scope.form.name) {
            //         $scope.form.name = user.firstName + ' ' + user.lastName;
            //     }
            //     if (!$scope.form.email) {
            //         $scope.form.email = user.email;
            //     }
            // }
            //
            // $rootScope.$on('user.login', function(event, data) {
            //     _setDefaultInfo(data);
            // });
            //
            // userService.getLoggedInUser()
            //     .then(
            //         function onSuccess(data) {
            //             _setDefaultInfo(data);
            //         }
            //     );
        }
    ];

    angular
        .module('turnon')
        .controller('ContactPageController', ContactPageController);
}());
