var h = null;
turnOnApp.controller('homeController', function homeController ($scope, $location, $http, $log,$interval) {
  h = $scope;

  $scope.sportLogos = [{title:'Soccer',
                  url:'assets/theme/src/images/sport/1_gray.png'},
                  {title:'American football',
                  url:'assets/theme/src/images/sport/2_gray.png'},
                  {title:'American football_3',
                  url:'assets/theme/src/images/sport/3_gray.png'},
                  {title:'American football_4',
                  url:'assets/theme/src/images/sport/4_gray.png'},
                  {title:'American football_5',
                  url:'assets/theme/src/images/sport/5_gray.png'},
                  {title:'American football_6',
                  url:'assets/theme/src/images/sport/6_gray.png'},
                  {title:'American football_7',
                  url:'assets/theme/src/images/sport/7_gray.png'},
                  {title:'American football_8',
                  url:'assets/theme/src/images/sport/8_gray.png'},
                  {title:'American footbal_9',
                  url:'assets/theme/src/images/sport/9_gray.png'},
                  {title:'Golf',
                  url:'assets/theme/src/images/sport/10_gray.png'},
                  {title:'American football_11',
                  url:'assets/theme/src/images/sport/11_gray.png'},
                  {title:'American footbal_12',
                  url:'assets/theme/src/images/sport/12_gray.png'},
                  {title:'American football_13',
                  url:'assets/theme/src/images/sport/13_gray.png'},
                  {title:'American football_14',
                  url:'assets/theme/src/images/sport/14_gray.png'},
                  {title:'American football_15',
                  url:'assets/theme/src/images/sport/15_gray.png'},
                  {title:'American football_16',
                   url:'assets/theme/src/images/sport/16_gray.png'}];

   $scope.channels = [{title:'1',
                   url:'assets/theme/src/images/logo/espn_network.png'},
                   {title:'2',
                   url:'assets/theme/src/images/logo/espn_2.png'},
                   {title:'3',
                   url:'assets/theme/src/images/logo/nfl.png'},
                   {title:'4',
                   url:'assets/theme/src/images/logo/fox_sport.png'},
                   {title:'5',
                   url:'assets/theme/src/images/logo/euro_sport.png'},
                   {title:'6',
                   url:'assets/theme/src/images/logo/espn_network.png'},
                   {title:'7',
                   url:'assets/theme/src/images/logo/nfl.png'}];

   $scope.points = [{title:'Share with friends',
                   url:'assets/theme/src/images/icon/share.png',
                   url_hover:'assets/theme/src/images/icon/share-white.png',
                   points: '150',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '},
                   {title:'Watch advertising',
                   url:'assets/theme/src/images/icon/combined-shape.png',
                   url_hover:'assets/theme/src/images/icon/combined-shape-white.png',
                   points: '300',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '},
                   {title:'Participate in a survey',
                   url:'assets/theme/src/images/icon/survey.png',
                   url_hover:'assets/theme/src/images/icon/survey-white.png',
                   points: '500',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '},
                   {title:'Download application',
                   url:'assets/theme/src/images/icon/phone.png',
                   url_hover:'assets/theme/src/images/icon/phone-white.png',
                   points: '250',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '},
                   {title:'Visit a sponsor page',
                   url:'assets/theme/src/images/icon/dollar-qoute.png',
                   url_hover:'assets/theme/src/images/icon/dollar-qoute-white.png',
                   points: '200',
                   description: 'Do you want to download free song for ipod? If so, reading this article could save you from getting in to a lot of trouble! '}];


 $scope.videosList = [{title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/1.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '150',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/2.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '300',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/3.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '500',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/4.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '250',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/1.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '200',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Top Story 3',
                 url_image:'assets/theme/src/images/news/2.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '500',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Download application',
                 url_image:'assets/theme/src/images/news/3.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '250',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'},

                 {title:'Visit a sponsor page',
                 url_image:'assets/theme/src/images/news/4.png',
                 url_logo:'assets/theme/src/images/logo/nfl-logo.png',
                 points: '200',
                 description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to'}];


});
