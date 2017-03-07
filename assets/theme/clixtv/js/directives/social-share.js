var ssd=null;
clixApp.directive('socialShare', function() {
    return {
      restrict: 'EA',
      transclude: true,
      scope: {
      },
      controller: ['$scope', '$http', '$rootScope', 'socialFactory', '$location', '$q', function socialShareController($scope, $http, $rootScope, socialFactory, $location, $q) {
          ssd = $scope;
          $scope.tags=[];
          $scope.shareMessage='';
          $scope.postText='';
          $scope.twitterText;
          $scope.selectedTab="post";
          $scope.mentio = false;
          $scope.selectedSocialMedia='facebook';

          $scope.items =[];

          $rootScope.$on("socialModal",function(evt, data){
              $scope.model=data;
              console.log(data);
              socialFactory.facebookAuthenticate();
              $scope.showSocialShareModal();
          })

          $rootScope.$on('FBisReady',function(){
              $scope.friends = socialFactory.facebookGetFriendsList();
              $scope.showSocialShareModal();

          });

          $scope.go = function (path) {
              $location.path(path);
          }
          $scope.showSocialShareModal = function(){
              $scope.tags=[];
              $scope.shareMessage='';
              $scope.postText='';
              $scope.twitterText;
              $scope.selectedTab="post";
              $scope.mentio = true;
              $scope.selectedSocialMedia='facebook';
              $('#social-share-modal').modal('show');

          }

          $scope.closeModal = function(){
              $scope.model=null;
              $scope.postText=null;
              $scope.tags=null;
              $scope.shareMessage=null;
              $scope.twitterText;
              $scope.selectedTab="post";
              $scope.mentio = false;
              $('#social-share-modal').modal('hide');
          }

          $('#social-share-modal').on('hidden.bs.modal', function(e) {
                $scope.closeModal();
            });

          $scope.send = function(){
              console.log($scope.postText, $scope.tags);
          }

        $scope.share= function(){
        //    console.log($scope.selectedSocialMedia);
            if ($scope.selectedSocialMedia=='facebook')
                $scope.facebookShare();
            else if ($scope.selectedSocialMedia=='twitter')
                $scope.twitterShare();
            else if ($scope.selectedSocialMedia=='tumblr')
                $scope.tumblrShare();
        }

        $scope.facebookShare = function(){
    //        console.log($scope.shareMessage, $scope.tags);
            socialFactory.facebookShare($scope.model, $scope.shareMessage, $scope.tags);
            $scope.closeModal();

        }


        $scope.sendFacebookMessage = function() {

        }

        $scope.twitterShare = function(){
            socialFactory.postTwitterStatus($scope.model,document.getElementById('twitterText').value);
            $scope.model=null;
            $scope.postText=null;
            $scope.tags=null;
            $('#social-share-modal').modal('hide');
        }


      }],
      templateUrl: '/assets/theme/clixtv/html/directives/social-share.html'
    };
}).filter('friendsTagFilter', function($sce) {
    return function(label, query, item, options, element) {
        return $sce.trustAsHtml("<div class='tag-item'><div class='item-pic' style='background-image:url("+item.picture.data.url+")'></div>"+ item.name + "</div>");

        return $sce.trustAsHtml(html);
    };
});
