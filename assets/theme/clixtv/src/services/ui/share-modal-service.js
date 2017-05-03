(function() {

    var shareModalService = [
        '$log',
        '$rootScope',
        '$uibModal',
        'modalService',
        function($log, $rootScope, $uibModal, modalService) {

            function _showModalForType(type, item) {

                var resolve = {
                    shareModalVideo: (type === 'video') ? item : undefined,
                    shareModalOffer: (type === 'offer') ? item : undefined,
                    shareModalCelebrity: (type === 'celebrity') ? item : undefined,
                    shareModalBrand: (type === 'brand') ? item : undefined,
                    shareModalCharity: (type === 'charity') ? item : undefined,
                    shareModalCategory: (type === 'category') ? item : undefined
                };

                modalService.showModal({
                    templateUrl: 'ui/common/modal/share/view.share.html',
                    controller: 'ShareController',
                    data: resolve
                });
            }

            return {
                launchVideoShareModal: function(item) {
                    _showModalForType('video', item);
                },

                launchOfferShareModal: function(item) {
                    _showModalForType('offer', item);
                },

                launchCelebrityShareModal: function(item) {
                    _showModalForType('celebrity', item);
                },

                launchBrandShareModal: function(item) {
                    _showModalForType('brand', item);
                },

                launchCharityShareModal: function(item) {
                    _showModalForType('charity', item);
                },

                launchCategoryShareModal: function(item) {
                    _showModalForType('category', item);
                },

                launchShareModal: function(type, item) {
                    _showModalForType(type, item);
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('shareModalService', shareModalService);
}());