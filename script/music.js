var spotifyAPI = new SpotifyWebApi();
spotifyAPI.setAccessToken("BQCNuyAI1HW3OgU974Px2VqZqYi9y6i1or4-dG6QR6dFULLtIrF3hnFyJ7FEoLpt49ykBSbYMhrBV1P0thP4G08HCQfURxJySPIPxcblOkI2CvUORHulAx_iJpR9nvLZ2nGqW7WBMbtpWN8i_igSzAzY");

function loadMusic(id) {
    beats = [];
    spotifyAPI.getAudioAnalysisForTrack(id, function(err, data) {
        if(err) console.error(err);
        else {
            
            for(let i = 0; i < data.tatums.length; i++) {
                   //if(data.beats[i].confidence > 0.1)
                    beats.push(data.tatums[i]);            
            }
            spotifyAPI.getAudioFeaturesForTrack(id, function(err, data) {
                if(err) console.error(err);
                else {
                    tempo = 1 / (data.tempo / 60); // Beats per Minute => Beats per Second => Seconds per Beat
                    energy = data.energy;
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
Time Bomb: 6U7VUPf8d3K1dY0UNMdDXS
 */
