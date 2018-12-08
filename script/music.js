var spotifyAPI = new SpotifyWebApi();
spotifyAPI.setAccessToken("BQBDPlcBXXfJQQaMWC3JXa6BH8niTzepycnzTDchWlBSANq7gVLaLqI8dkdu84BVlZTA7AWt_3kM_gQ-jXSgYscXG3oSvYP4fnOjOOuGnRspy4iphcmGXsNoS9qiryjeWrmtR1h1iXR0vLcJMQlSDFTW");

spotifyAPI.getAudioAnalysisForTrack('044m5wI5SDOeJpFwmr69nI', function(err, data) {
    if(err) console.error(err);
    else {
        for(let i = 0; i < data.bars.length; i++) {
            bars.push(data.bars[i].start);
        }
        gameOver = false;
    }
});

bars = [];
