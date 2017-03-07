var acc = null;

clixApp.controller('accountController', function accountController ($scope, $http, User,$routeParams, $location, AuthService, fileFactory, knetikFactory) {
    acc = $scope;

    $scope.moreInfoStage=-1;
    $scope.editableAccount = false;
    $scope.tabs = {
        shownTab: 'stars',
        rewardTabs: 'summary',
        innerReward: 'all'
    }
    $scope.shownTab = 'stars';
    $scope.rewardTabs = 'summary';

    // changes the tabs view
    $scope.hover = '';
    $scope.shownView=$routeParams.accountPage;
    $scope.user = User.getUser();

    $scope.CCnumberFormat = function(){
        var input = $scope.userEdit.creditCard.number;
        input = input.replace(/[^0-9]+/g, '');

        var split = 4;
        var chunk = [];

        for (var i = 0, len = input.length; i < len; i += split) {
            // split = ( i >= 8 && i <= 16 ) ? 4 : 8;
            chunk.push( input.substr( i, split )+' ' );
        }

        $scope.userEdit.creditCard.number = chunk.join("");

    }

    $scope.CCexpiryFormat = function(){
        var input = $scope.userEdit.creditCard.expiry;
        input = input.replace(/[^0-9]+/g, '');

        var split = 2;
        var chunk = [];

        for (var i = 0, len = input.length; i < len; i += split) {
            chunk.push( input.substr( i, split )+'/' );
        }

        $scope.userEdit.creditCard.expiry = chunk.join("");

    }



    User.getNotifications().then(function(data){
        if(data)
            $scope.notifications = data;

    });

    $scope.unreadNotificationsCount = function(){
        var count = 0;
        for (n in $scope.notifications)
          if(!$scope.notifications[n].read)
              count++;
        return count;
    }

    User.getWatchList().then(function (data) {
         $scope.watchlist = data;
    });

    User.getFavoritesByType('favoriteCelebs').then(function (data) {
         $scope.favoriteCelebs = data;
    });

    User.getFavoritesByType('favoriteBrands').then(function (data) {
         $scope.favoriteBrands = data;
    });

    User.getFavoritesByType('favoriteCategories').then(function (data) {

         $scope.favoriteCategories = data;
    });

    User.getFavoritesByType('favoriteCharities').then(function (data) {
         $scope.favoriteCharities = data;
    });

    User.getFavoritesByType('offersSaved').then(function (data) {
         $scope.offersSaved = data;
    });

    User.getNotifications().then(function(data){
        if (data && data) $scope.notifications = data;
    });

    knetikFactory.getCataloge().then(function(data){
        $scope.giftCards = data;
    });

    $scope.$on("auth-login-success", function (){
        $scope.user = User.getUser();
        User.getWatchList().then(function (data) {
             $scope.watchlist = data;
             $scope.addStaticData();
        })
        User.getNotifications().then(function(data){
            if (data && data) $scope.notifications = data;
        });
        $scope.addStaticData();
    });

    $scope.saveSettings= function(){
        $scope.users.settings= angular.copy($scope.settingsEdit);
        $scope.shownView='account';
    };

    //List of celebs
    $scope.celebsList = ['a','aa', 'aaaa', 'bb', 'bbbbb','ccccc'];

    $scope.recivedInfo = [{
      previousBalance: 50,
      date: '21/7/2010',
      previousBalance: 100,
      videoWatching: 55,
      likes: 65,
      share: 35
    }];

    $scope.startEdit = function (field) {
        $scope.userEdit = angular.copy($scope.user);
        $scope.editableAccount = field;
    }

    $scope.update_user= function(){
        $scope.editableAccount = false;
        console.log($scope.userEdit);
        User.updateProfile($scope.userEdit);
    }

    $scope.cancelEdit = function () {
        $scope.editableAccount = false;
        $scope.userEdit = null;
    }

    $scope.changeAccountView = function (view) {
        $scope.shownView = view;
    };

    $scope.addNewCeleb = function (){
        $scope.celebsList.push($scope.addThisNewCeleb);
        $scope.addThisNewCeleb = '';
    };

    $scope.openUploadDialog= function(){
        var fileuploader = angular.element("#profilePicFile");
        fileuploader.on('click',function(){
        })
        fileuploader.trigger('click')
    }

    $scope.uploadProfileImage=function(selectedfile) {
        fileFactory.fileUpload(selectedfile, '/assets/theme/clixtv/images/uploads');
    }

    $scope.addStaticData = function () {
        if ($scope.user){
        $scope.user.reward = {
            current_balance: 1280,
            previous_balance: 2000,
            recent_actions: [
                {
                    img: 'http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d71ac801b1000371112a/geico_thumbnail.jpg',
                    name: 'watch',
                    value: 50,
                    timestamp: 1480888886000
                },
                {
                    img: 'http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d71ac801b1000371112a/geico_thumbnail.jpg',
                    name: 'watch',
                    value: 50,
                    timestamp: 1478766666000
                },
                {
                    img: 'http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d71ac801b1000371112a/geico_thumbnail.jpg',
                    name: 'like',
                    value: 50,
                    timestamp: 1478766666000
                },
                {
                    img: 'http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d71ac801b1000371112a/geico_thumbnail.jpg',
                    name: 'share',
                    value: 50,
                    timestamp: 1478766666000
                },
                {
                    img: 'http://advncedcdn.vo.llnwd.net/clixtv_storage/storage/57cdc2665aad0b6fcf67bb3d/5804d71ac801b1000371112a/geico_thumbnail.jpg',
                    name: 'buy',
                    value: 200,
                    timestamp: 1478766666000
                }
            ]
        };
        }
    }

    $scope.addStaticData();

    $scope.openRedeemModal = function (card){
        $scope.selectedRedeemCard = card;
        $("#redeemModal").modal('show');
    }

    $scope.redeemCard = function(card) {
        knetikFactory.redeemCard(card,200);
        $("#redeemModal").modal('hide');
    }

    $scope.go = function (path) {
        $location.path(path);
    }

});
