(function() {

    angular
        .module('clixtv')
        .factory('SeasonModel', [
            'VideoModel',
            function(VideoModel) {
                return function(data) {
                    this.id = data._id;
                    this.title = data.title;
                    this.description = data.description;
                    this.seasonNumber = parseInt(data.season_number);

                    if (data.episodes) {
                        this.episodes = data.episodes.map(function(episode) {
                            return new VideoModel(episode);
                        });
                    }
                }
            }
        ]);
}());