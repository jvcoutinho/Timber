var spotifyAPI = new SpotifyWebApi();
spotifyAPI.setAccessToken("BQBmYXa1sPlEcaNAYd3qYXDgbFCY9whib3IciDDjNp76V1wMxgnfoNOyacyuEQnTCYxm_SM5xjMdXgNZsJCsS0XBo_dYiCXd6YPnYuE4CpHQSd8HmD5wIkJlbhXerqW9B2mxnLCQmncNztVTLtT_TX7iOnM");

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
