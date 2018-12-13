var spotifyAPI = new SpotifyWebApi();
spotifyAPI.setAccessToken("BQAyPD0LaNOPwugWMsiGEn1dRwCSxyqHHTFGG1oXS-jw0aeFaw4zNOgh14bcso9M1j2cB5_mjHAEAWE2UOxxOCMnBltOPopAZhS61kMJb2dzorMk2m_5b6AphCp-1wvky4-s8OEcMJKz_-xO6qma_ZUx");

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
                    branchSpeed = 4 / energy;
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
