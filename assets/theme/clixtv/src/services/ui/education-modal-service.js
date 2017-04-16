(function() {

    var educationModalService = [
        '$q',
        '$log',
        '$rootScope',
        '$uibModal',
        'userService',
        'preferencesService',
        function($q, $log, $rootScope, $uibModal, userService, preferencesService) {

            function _launchEducationModal(type, id) {
                $q.all(
                        [
                            userService.getLoggedInUser(),
                            preferencesService.getShowEducationModalPreference(type)
                        ]
                    )
                    .then(
                        function onSuccess(data) {
                            var hide = data[1];
                            if (hide === true || hide === 'true') {
                                return;
                            }
                            var modalInstance = $uibModal.open({
                                animation: true,
                                templateUrl: 'ui/common/modal/education/view.education-modal.html',
                                controller: 'EducationModalController',
                                windowClass: 'clix-modal-window',
                                size: 'clix-lg',
                                resolve: {
                                    itemData: {
                                        loggedInUser: data[0],
                                        type: type,
                                        id: id
                                    }
                                }
                            });

                            modalInstance.opened.then(
                                function onSuccess() {
                                    $rootScope.$broadcast('modal.open');
                                }
                            );

                            modalInstance.closed.then(
                                function onSuccess() {
                                    $rootScope.$broadcast('modal.close');
                                }
                            );

                            modalInstance.result.then(
                                function onSuccess(data) {

                                },
                                function onError(error) {

                                }
                            );
                        }
                    );

            }

            function _launchFavoriteEducationModal(event, data) {
                _launchEducationModal(data.type, data.id);
            }

            return {
                initialize: function() {
                    $log.debug('Initializing education modal service');

                    $rootScope.$on('favorite.added', _launchFavoriteEducationModal);
                    $rootScope.$on('favorite.added.anonymous', _launchFavoriteEducationModal);
                },

                showOfferViewedModal: function(id) {
                    _launchEducationModal('offer-view', id);
                },

                showLearnMoreModal: function() {
                    _launchEducationModal('learn-more');
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('educationModalService', educationModalService);
}());