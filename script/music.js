var spotifyAPI = new SpotifyWebApi();
spotifyAPI.setAccessToken("BQDt3hQU4BLtBFFXkTBspA6--cthp5cEBRVXIxA94_Sr0gFcbv7vspYtRrMhP3vODng2uJvKXoWocMRk6hwiRXo8a6EG33m6VUflGSe18YqLnhEhibyJ2L-7uEO9HOc95v8l4-76nqrfIBRoksQaoU_F");

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
                    time_bomb.play();
                    currentTime = Date.now();
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
