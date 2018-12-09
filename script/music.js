var spotifyAPI = new SpotifyWebApi();
spotifyAPI.setAccessToken("BQDKvGdHaCpbBZ1_hhjPqn3FdclYcJPo8dtn56_M3_9V1wbBG20iexl4xH9UY9RO0zolFsAcXj9OmRhGpst8jRSxjCyevCAo16Pw0fuzXiXZiRTLKO6UB9fdgNLsgi_GNXbFWOrSirF-bMy7jyi_hWH2");

function loadMusic(id) {
    beats = [];
    spotifyAPI.getAudioAnalysisForTrack(id, function(err, data) {
        if(err) console.error(err);
        else {
            
            for(let i = 0; i < data.tatums.length; i++) {
                    if(data.tatums[i].confidence > 0.1)
                    beats.push(data.tatums[i].start);            
            }
            spotifyAPI.getAudioFeaturesForTrack(id, function(err, data) {
                if(err) console.error(err);
                else {
                    tempo = 1 / (data.tempo / 60); // Beats per Minute => Beats per Second => Seconds per Beat
                    //console.log(tempo, beats);
                    createBranchPositions(beats, tempo);
                    gameOver = false;
                }
            });
        }
    });

    
}

/* MUSIC IDs
Colorblind: 044m5wI5SDOeJpFwmr69nI
Oath to Order: 3ud0rVJAHfuPghaTw4WOUC
 */
