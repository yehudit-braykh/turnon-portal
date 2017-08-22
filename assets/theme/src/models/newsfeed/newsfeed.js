var nf = null;
turnOnApp.controller('newsfeedController', function newsfeedController ($scope, $location, $http, $log,$interval) {
  nf = $scope;




  $scope.videosList = [{id: '1',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/1.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
        status: 'purchased',
        points: '150',
        description: 'After ten minutes with Ed Tettemer in the offices of the agency he founded with partner, Steve Red, you begin to […]'},

        {id: '2',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/2.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
        status: 'buy',
        points: '300',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '3',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/3.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'buy',
        points: '500',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '4',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/4.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'live',
        points: '250',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '5',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/1.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'purchased',
        points: '200',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '6',
         title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/2.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'live',
        points: '500',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '7',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/3.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'purchased',
        points: '250',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'},

        {id: '8',
        title:'Real Madrid Vs. Arsenal ',
        url_image:'assets/theme/src/images/news/4.png',
        url_logo:'assets/theme/src/images/logo/nfl-logo@2x.png',
         status: 'live',
        points: '200',
        description: 'The cast brass and cast stainless steel burners have the smallest burrs by far. This will mean less chaos in the gas flow, fewer trapped particulate matter in the burner and a cleaner burning grill. The following comparison shows how the ports are formed. Why is port formation important? Several reasons. If the hole is punched into a sheet metal.'}];


});
