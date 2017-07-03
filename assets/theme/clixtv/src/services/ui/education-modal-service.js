(function() {

    var educationModalService = [
        '$q',
        '$log',
        '$rootScope',
        '$uibModal',
        'userService',
        'modalService',
        'preferencesService',
        function($q, $log, $rootScope, $uibModal, userService, modalService, preferencesService) {

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

                            modalService.showModal({
                                templateUrl: 'ui/common/modal/education/view.education-modal.html',
                                controller: 'EducationModalController',
                                data: {
                                    loggedInUser: data[0],
                                    type: type,
                                    id: id
                                }
                            });
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

                showOfferSavedModal: function (id) {
                    _launchEducationModal('offer', id);
                },

                showLearnMoreModal: function() {
                    _launchEducationModal('learn-more');
                },

                showNotificationsComingSoonModal: function() {
                    _launchEducationModal('notifications-coming-soon');
                },

                showAnonymousLikedVideo: function() {
                    _launchEducationModal('anonymous-liked-video');
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('educationModalService', educationModalService);
}());