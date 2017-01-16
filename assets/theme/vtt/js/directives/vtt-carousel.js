vttApp.directive('vttCarousel', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          model: '=',
          orientation: '@',
          targetDir: '@',
          targetParam: '@',
          title : '=',
          date: '=',
          subscription: '=',
          dateFormat: '@',
          description: '=',
          mylist: "=",
        carouselId: '@'
      },
      controller: ['$scope', '$location', function vttCarouselController($scope, $location) {
          sc = $scope;
          $scope.caruselPosition = 0;
          $scope.relatedPosition = 0;

          $scope.moveLeft = function () {
              if ($scope.caruselPosition == 0) {
                  $scope.caruselPosition = 1;
              }else {
                  $scope.caruselPosition = 0;
              }
          }
          $scope.moveRight = function () {
              if ($scope.caruselPosition == 0) {
                  $scope.caruselPosition = 1;
              }else {
                  $scope.caruselPosition = 0;
              }
          }
          $scope.moveRelated = function () {
              if ($scope.relatedPosition == 0) {
                  $scope.relatedPosition = 1;
              }else {
                  $scope.relatedPosition = 0;
              }
          }

          $scope.go = function(path){
              $location.path(path);
          }

          $scope.removeFromList = function(event){
              event.stopPropagation();
          };

          $scope.subscriptionType = function(type){
              if(type == "commerce_free_media"){
                  return 'free';
              }
              if(type == "commerce_members_media"){
                  return 'member';
              }
              if(type == "commerce_subscription_basic_media"){
                  return 'subscribe';
              }
              return 'free';
          };

          $scope.watch = function(permission, video){
              var permissionType =  $scope.subscriptionType(permission);
              if(permissionType == 'subscribe'){
                  $('.subscription-modal').modal('show')
              }
              else if(permissionType == 'free' || permissionType == 'subscribe'){
                  $('.register-modal').modal('show')
              }
              else{
                  $scope.go($scope.targetDir+'/'+video[$scope.targetParam]);
              }
          }

          $scope.getPosterH = function(video){
              if(video.PosterH){
                  return video.PosterH.downloadUrl;
              }
              var content = video.content;
              var i;
              for(i = 0; i < Object.keys(content).length; i++){
                  if(content[i].assetTypes[0] == "Poster H"){
                      return content[i].downloadUrl;
                  }
              }
          };

      }],
      templateUrl: '/assets/theme/vtt/html/directives/vtt-carousel.html'
    };
  })
