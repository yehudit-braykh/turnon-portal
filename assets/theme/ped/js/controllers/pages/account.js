var acc = null;
peruDigitalApp.controller('accountController', function accountController ($scope) {
      acc = $scope;
      $scope.editing = false;
      $scope.user = {
          first_name: 'Mark',
          last_name: 'Roze',
          email: 'bla@bli.blu',
          birth: "2014-02-09",
          address: 'Tel Aviv, Israel',
          phone: '+972 52 2222222',
          image_url: 'https://assets.entrepreneur.com/content/16x9/822/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg'
      }
      $scope.enableEdit = function () {
          $scope.editing = !$scope.editing
      }
  });
