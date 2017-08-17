var nf = null;
turnOnApp.controller('newsfeedControler', function newsfeedControler ($scope, $location, $http, $log,$interval) {
  nf = $scope;




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
