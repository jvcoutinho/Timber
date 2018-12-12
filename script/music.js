var spotifyAPI = new SpotifyWebApi();
spotifyAPI.setAccessToken("BQAi16DRMvScGvd6ejim1MHq1ghJJUgDTCP3u85LpGB7cvWroc_7S6On1J76ETdhhkZQSRLiiSC1ldlurY8mxoTSDhxG4zsaVribF3AxPAKuMOAhHnnTENisBwbRI_Ey42NwkunpkR7L0j6StNwl6GLLPVA");

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
