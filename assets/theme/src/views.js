angular.module('turnon').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('models/home/home.html',
    "<div class=\"container-fluid home_page\"><div class=\"col-xs-12 sport_list_container\"><div class=kinds_of_sports ng-repeat=\"sl in sportLogos\"><div class=sport_logo style=\"background-image: url('{{sl.url}}')\"></div><div class=sport_title></div></div></div><div class=\"col-xs-12 center_container\"><div class=\"col-xs-12 center_image\" style=\"background-image: url('assets/theme/src/images/bg/football-manch.png')\"></div></div><div class=\"col-xs-12 channels_container\"><div class=channel ng-repeat=\"channel in channels\"><div class=channel_logo style=\"background-image: url('{{channel.url}}')\"></div></div></div><div class=\"col-xs-12 content_container\"><div class=\"col-xs-12 content_title title1\">GAIN POINTS!</div><div class=\"col-xs-12 points_container\"><div class=\"col-xs-15 point\"><div class=point_logo></div></div><div class=\"col-xs-15 point\"></div><div class=\"col-xs-15 point\"></div><div class=\"col-xs-15 point\"></div></div></div></div>"
  );

}]);
