var ch = null;
clixApp.controller('charityController', function charityController ($scope, $rootScope, $location, brandsFactory, videosFactory, $routeParams, celebrityFactory) {
      ch = $scope;
      $scope.shownTab='Home';

     // console.log($routeParams);
      brandsFactory.getCharityByName($routeParams.charityName).then(function(data){
          $scope.charity=data;

          brandsFactory.getBrandCelebs($scope.charity._id).then(function(celebs){
              $scope.celebrities= celebs;
        });
      })
        .then(function(){
            $scope.charity.cover_url='/assets/theme/clixtv/images/charities/cover.png';

            brandsFactory.getBrandCelebs($scope.charity._id).then(function(data){
                $scope.charity.celebrities=data;

            });
            brandsFactory.getBrandVideos($scope.charity._id).then(function(data){
                $scope.charity.relatedVideos=data;
                $scope.charity.video=$scope.charity.relatedVideos[0];
            });

        });

        setInterval(function () {
                $(".details").css('height', $(".player").height());
        },10);



    window.onscroll = function(){
        var windowYOffset = window.pageYOffset,
            elBackgrounPos = "50% " + (-1*windowYOffset * 0.5) + "px";
        $(".charity-header").css('background-position', elBackgrounPos);
      };

      $scope.go = function (path) {
          $location.path(path);
      }

      $scope.shareModal = function(){
          $rootScope.$broadcast("socialModal", $scope.charity);
      }

      $scope.openDonateModal = function (){
         // $scope.selectedRedeemCard = card;
          $("#donateModal").modal('show');
      }



    // Resize based on text if text.length > 0
    // Otherwise resize based on the placeholder
    function resizeForText(text) {
        var $this = $(this);
        // $this.style.width = ((this.value.length + 1) * 8) + 'px';
        if (!text.trim()) {
            text = $this.attr('placeholder').trim();
        }
        // var $span = $this.parent().find('span');
        // $span.text(text);
        // var $inputSize = $span.width();
        $this.css("width", (text.length+1) * 25);
    }

    $("#points-input").keypress(function (e) {
        if (e.which && e.charCode) {
            var c = String.fromCharCode(e.keyCode | e.charCode);
            var $this = $(this);
            resizeForText.call($this, $this.val() + c);
        }
    });

    // Backspace event only fires for keyup
    $("#points-input").keyup(function (e) {
        if (e.keyCode === 8 || e.keyCode === 46) {
            resizeForText.call($(this), $(this).val());
        }
    });

  });
