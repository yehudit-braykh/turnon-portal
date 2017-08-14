(function() {

    var OfferModalController = [
        '$q',
        '$scope',
        '$window',
        '$rootScope',
        'modalService',
        'educationModalService',
        'offersService',
        'userService',
        'data',
        'knetikService',
        'catchMediaService',
        function($q, $scope, $window, $rootScope, modalService, educationModalService, offersService, userService, data, knetikService, catchMediaService) {

            function _setIsSaved() {
                if ($scope.offer) {
                    $scope.isSavedOffer = userService.isSavedOffer($scope.offer.id);
                }
            }

            $rootScope.$on('user.login', _setIsSaved);

            offersService.getOfferBySlug(data.offerSlug)
                .then(
                    function onSuccess(data) {
                        var brand = data.brand || data.campaign;
                        $scope.offer = data;

                        knetikService.viewOffer($scope.offer.id);

                        $rootScope.pageTitle = $scope.offer.title + ' Offer at ' + (brand ? brand.title : '') + ' - turnon';

                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'offer',
                            target_id: $scope.offer.id
                        });
                    }
                );

            $scope.onClosePress = function() {
                modalService.close();
            };

            $scope.onSaveOfferPress = function() {
                if ($scope.isSavedOffer) {
                    userService.removeSavedOffer($scope.offer.id)
                        .then(
                            function onSuccess() {
                                $scope.isSavedOffer = false;
                            }
                        );
                } else {
                    userService.addSavedOffer($scope.offer.id);
                    knetikService.saveOffer($scope.offer.id);
                    $scope.isSavedOffer = true;

                    userService.getLoggedInUser()
                        .then(
                            function onSuccess(data) {
                                if (data !== false) {
                                    catchMediaService.trackMediaEvent($scope.offer.id, 'offer', 'offer_saved');
                                }
                            }
                        );
                }
            };

            $scope.onOfferRedeemPress = function() {
                var rfiLink, slug = $scope.offer.slug;

                if ($scope.offer.rfiLink) {
                    $window.open($scope.offer.rfiLink, '_blank');
                    return;
                }

                /**
                 * @todo - Remove this once the CMS works correctly...
                 */
                switch (slug) {
                    case 'up-to-50percent-off-mens-sneakers':
                        rfiLink = 'http://store.nike.com/us/en_us/pw/mens-clearance-shoes/47Z7puZoi3?mid=38660&mid=38660&cp=usns_aff_nike_080113_FPWseZFEpyY&site=FPWseZFEpyY-0vukNjv0tIeI5INdBP9IdQ';
                        break;
                    case 'up-to-50percent-off-hoodies-and-pullovers':
                        rfiLink = 'http://store.nike.com/us/en_us/pw/mens-clearance-sweatshirts-hoodies/47Z7puZobq?ipp=63&mid=38660&cp=usns_aff_nike_080113_FPWseZFEpyY&site=FPWseZFEpyY-ecYOD_SFVLx2TReCgcdgAA';
                        break;
                    case 'save-on-items-for-girls':
                        rfiLink = 'http://store.nike.com/us/en_us/pw/girls-clearance/47Z7pw?ipp=120';
                        break;
                    case '50percent-off-scuderia-ferrari-tincan-carbon-sunglasses':
                        rfiLink = 'https://www.groupon.com/deals/gg-oakley-scuderia-ferrari-tincan-carbon-sunglasses';
                        break;
                    case '57percent-off-sunglasses-for-men-and-women':
                        rfiLink = 'https://www.groupon.com/deals/gg-oakley-sunglasses-for-men-and-women-5';
                        break;
                    case '30percent-off-patio-furniture':
                        rfiLink = 'http://www.target.com/p/7pc-sling-folding-patio-dining-set-turquoise-room-essentials-153/-/A-51611881';
                        break;
                    case 'dollar30-off-kitchenaidr-mixer':
                        rfiLink = 'https://www.target.com/p/kitchenaid-174-ultra-power-plus-4-5-qt-tilt-head-stand-mixer-ksm96/-/A-51575208';
                        break;
                    case '70percent-off-schwinn-mens-trailway-28':
                        rfiLink = 'http://www.target.com/p/schwinn-men-s-trailway-28-700c-hybrid-bike-bronze/-/A-15547829';
                        break;
                    case 'pandora-trial-subscriptions':
                        rfiLink = 'https://www.pandora.com/account/register';
                        break;
                    case 'dollar20-lyft-credit':
                        rfiLink = 'https://www.lyft.com/promo-coupon-code-free-rides';
                        break;
                    case 'dollar10-lyft-credit':
                        rfiLink = 'https://www.lyft.com/promo-coupon-code-free-rides';
                        break;
                    case 'dollar9-lyft-credit':
                        rfiLink = 'https://www.lyft.com/promo-coupon-code-free-rides';
                        break;
                    case 'up-to-55percent-off-dentalife':
                        rfiLink = 'https://www.groupon.com/deals/gs-purina-dentalife-daily-oral-care-small-medium-dog-treats';
                        break;
                    case '60percent-off-dentalife-cat-treats':
                        rfiLink = 'https://www.groupon.com/deals/gs-purina-dentalife-flavored-cat-treats-1-8-oz-pouch-pack-of-10';
                        break;
                    case '10percent-below-msrp-on-select-2017-corvettes':
                        rfiLink = 'http://www.chevrolet.com/current-deals?ppc=GOOGLE_700000001294388_71700000018229594_58700002071064306_p16389339423&gclid=CjwKEAjw3pTJBRChgZ3e7s_YhAkSJAASG9VrrN1r6Q0jEWZNtwT78okGE1hHmJ-o3YsbRBcobrkSNBoCPozw_wcB&gclsrc=aw.ds';
                        break;
                    case 'dollar1500-purchase-bonus-cash-on-select-2017-camaros':
                        rfiLink = 'http://www.chevrolet.com/current-deals?ppc=GOOGLE_700000001294388_71700000018229594_58700002071064306_p16389339423&gclid=CjwKEAjw3pTJBRChgZ3e7s_YhAkSJAASG9VrrN1r6Q0jEWZNtwT78okGE1hHmJ-o3YsbRBcobrkSNBoCPozw_wcB&gclsrc=aw.ds';
                        break;
                    case '39percent-apr-for-60-months-plus-dollar4500-purchase-bonus-cash':
                        rfiLink = 'http://www.chevrolet.com/current-deals?ppc=GOOGLE_700000001294388_71700000018229594_58700002071064306_p16389339423&gclid=CjwKEAjw3pTJBRChgZ3e7s_YhAkSJAASG9VrrN1r6Q0jEWZNtwT78okGE1hHmJ-o3YsbRBcobrkSNBoCPozw_wcB&gclsrc=aw.ds';
                        break;
                    case 'dollar5-thin-crust-spinach-and-mushroom':
                        rfiLink = 'http://www.target.com/p/digiorno-thin-crust-spinach-and-mushroom-pizza-18-oz/-/A-41982816';
                        break;
                    case 'dollar5-thin-crust-pepperoni':
                        rfiLink = 'http://www.target.com/p/digiorno-pizzeria-thin-crust-primo-pepperoni-pizza-17-2-oz/-/A-17092815';
                        break;
                    case 'dollar5-thin-crust-supreme-special':
                    case 'dollar5-thin-crust-supreme-speciale':
                        rfiLink = 'http://www.target.com/p/pizza-digiorno/-/A-17092814';
                        break;
                    case 'dollar20-off-select-polos':
                        rfiLink = 'http://store.partyrock.com/sport/tennis-polos/tennis-polo-lime-black.html';
                        break;
                    case '33percent-off-mens-select-tennis-shorts':
                        rfiLink = 'http://store.partyrock.com/sport/tennis-shorts/tennis-shorts-black-zebra.html';
                        break;
                    case '58percent-off-livingston-sweater':
                        rfiLink = 'http://www.6pm.com/p/vans-livingston-cement-heather-black/product/8601289/color/308643';
                        break;
                    case '57percent-off-satellite-tank-top':
                        rfiLink = 'http://www.6pm.com/p/vans-satellite-tank-top-black/product/8736416/color/3';
                        break;
                    case '38percent-off-classic-slip-ontm-shoes':
                        rfiLink = 'http://www.6pm.com/p/vans-kids-classic-slip-on-little-kid-big-kid-prism-pink-perf-leather/product/8689692/color/618221';
                        break;
                    case '20percent-off-party-socks':
                        rfiLink = 'http://store.partyrock.com/';
                        break;
                }

                $window.open(rfiLink, '_blank');
            };

            $scope.onCopyToClipboardSuccess = function(e) {

            };

            _setIsSaved();
        }
    ];



    angular
        .module('turnon')
        .controller('OfferModalController', OfferModalController);
}());