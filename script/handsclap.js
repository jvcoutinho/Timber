/**
 * Classe para reconhecer entradas no microfone.
 * @param{cb} Array de entrada.
 */
var Recording = function(cb){
    var recorder = null;
    var recording = true;
    var audioInput = null;
    var volume = null;
    var audioContext = null;
    var callback = cb;

    // Conectando ao microfone.
    navigator.getUserMedia = navigator.getUserMedia    || navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if(navigator.getUserMedia){
      navigator.getUserMedia({audio:true},
        function(e){ //success
          var AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContext = new AudioContext();
          volume = audioContext.createGain(); // Cria um nó gain.
          audioInput = audioContext.createMediaStreamSource(e); // Cria um nó de áudio da entrada.
          audioInput.connect(volume); // Conecta a entrada ao gain.
          recorder = audioContext.createScriptProcessor(2048, 1, 1);

          recorder.onaudioprocess = function(e){
              if(!recording) return;
              var left = e.inputBuffer.getChannelData(0);
              //var right = e.inputBuffer.getChannelData(1);
              callback(new Float32Array(left));
          };
          volume.connect(recorder);// connect the recorder
          recorder.connect(audioContext.destination);
        },
        function(e){ //failure
          alert('Error capturing audio.');
        }
      );
    } else {
      alert('getUserMedia not supported in this browser.');
    }
};

var lastClap = (new Date()).getTime();

function detectClap(data){
    var t = (new Date()).getTime();
    if(t - lastClap < 50) return false; // TWEAK HERE
    var zeroCrossings = 0, highAmp = 0;
    //console.log(data);
    for(var i = 1; i < data.length; i++){
        if(Math.abs(data[i]) > 0.1) highAmp++; // TWEAK HERE
        if(data[i] > 0 && data[i-1] < 0 || data[i] < 0 && data[i-1] > 0) zeroCrossings++;
    }
    if(highAmp > 20 && zeroCrossings > 30){ // TWEAK HERE
        console.log(highAmp+' / '+zeroCrossings);
        lastClap = t;
        return true;
    }
    return false;
}

var rec = new Recording(data => {
    if(detectClap(data)) {
        console.log('clap!');
        playerSide = (playerSide === sideEnum.LEFT) ? sideEnum.RIGHT : sideEnum.LEFT;
        axeSprite.updatePosition((playerSide === sideEnum.LEFT) ? axePositionXLEFT : axePositionXRIGHT, axeSprite.currentPosition.y);
        timeRemaining += (beat) ? 1000 : 150;
        timeRemaining = Math.min(timeRemaining, INITIAL_TIME);
    }
});
