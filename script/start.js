/**
 * Global Sound Variables to be loaded later
 */
var axe_sound;
var gameover_sound;
var time_bomb;

function start() {
    loadSound();
    loadTextures();
    handleInput();
    setGameVariables();
}

/**
 * Carregar Arquivos de Som
 */

 function loadSound(){
     // load game sound files with Howler.js
      axe_sound = new Howl({
        src: ['sound/chop2.wav'],
        volume: 0.6
      });

      gameover_sound = new Howl({
        src: ['sound/fail.wav'],
        volume: 0.5
      });

      time_bomb = new Howl({
          src: ['sound/time_bomb.mpeg'],
          volume: 1
      })

 }

/**
 * Carregar texturas.
 */
function loadTextures() {
    
    // Árvore principal.
    mainTreeSprite = loadSprite("images/tree.png", 300, 900, canvas.width / 2 - 100, canvas.height - 700);
    mainTreeSpriteReplicate = loadSprite("images/tree.png", 300, 900, canvas.width / 2 - 100, 0);

    // Jogador.
    playerPositionXLEFT = mainTreeSprite.initialPosition.x - 100;
    playerPositionXRIGHT = mainTreeSprite.initialPosition.x + 180;
    playerSprite = loadSprite("images/player.png", 150, 192, playerPositionXLEFT, canvas.height/2 + 140);

    // Machado.
    axePositionXLEFT = playerSprite.initialPosition.x + 60;
    axePositionXRIGHT = playerSprite.initialPosition.x + 220;
    axeSprite = loadSprite("images/axe.png", 152, 28, axePositionXLEFT, canvas.height/2 + 195);

    // Galhos.
    branchPositionXLEFT = mainTreeSprite.initialPosition.x;
    branchPositionXRIGHT = mainTreeSprite.initialPosition.x + 144;
    branchSprites = [];
    branchPositions = [];
    visibleBranches = [];
    visibleBranchesIndex = 0;

    // Nuvens.
    cloud1 = loadSprite("images/Cloud1.png", 174, 157, 0, 0);
    cloud2 = loadSprite("images/Cloud2.png", 238, 128, 0, 0);
    cloud3 = loadSprite("images/Cloud3.png", 190, 118, 0, 0);
    cloud4 = loadSprite("images/Cloud4.png", 512, 211, 0, 0);
    
}
/**
 * Lidar com a entrada, inicialmente pelas setas do teclado.
 */
function handleInput() {
    document.addEventListener("keydown", e => {

        if(acceptInput && !gameOver) {
            let key = e.which || e.keyCode;

            // Atualizando posições.
            switch (key) {
                
                case 39: // ->
                    playerSide = sideEnum.RIGHT;
                    // playerSprite.updatePosition(playerPositionXRIGHT, playerSprite.currentPosition.y);
                    axeSprite.updatePosition(axePositionXRIGHT, axeSprite.currentPosition.y);
                    timeRemaining += (beat) ? 1000 : 150;
                    timeRemaining = Math.min(timeRemaining, INITIAL_TIME);
                    axe_sound.play();
                    break;

                case 37: // <-
                    playerSide = sideEnum.LEFT;
                    // playerSprite.updatePosition(playerPositionXLEFT, playerSprite.currentPosition.y);
                    axeSprite.updatePosition(axePositionXLEFT, axeSprite.currentPosition.y);
                    timeRemaining += (beat) ? 1000 : 150;
                    timeRemaining = Math.min(timeRemaining, INITIAL_TIME);
                    axe_sound.play();
                    break;

                default:
                    break;
                    

            }

            acceptInput = false;
        }
        
    });


    document.addEventListener("keyup", () => {
        axeSprite.updatePosition(2000, axeSprite.currentPosition.y); 
    })
}

/**
 * Setar as variáveis do jogo.
 */
function setGameVariables() {
    sideEnum = Object.freeze({"LEFT": 1, "RIGHT": 2, "NONE": 3});
    playerSide = sideEnum.LEFT;

    // Tempo.
    INITIAL_TIME = 2000.0;
    timeBarStartDimensions = {width: 400, height: 30};
    timeRemaining = INITIAL_TIME; //milisseconds;
    timeDecreaseSpeed = timeBarStartDimensions.width / timeRemaining;
    currentTime = Date.now();
    elapsedTime = 0;
    tempoTime = 0;
    index = 0;
    index2 = 0;

    // Fluxo de jogo.
    gameOver = true;
    beat = true;

}

/**
 * Criar galhos de acordo com a batida da música.
 * @param {beats} Batidas 
 */
ready = false;
function createBranchPositions(beats, tempo) {
    ready = false;
    for (let i = 0; i < beats.length; i++) {
        branchSprites.push(loadSprite("images/branch.png", 440, 80, 2000, -i * 50));
        let position = Math.floor(Math.random() * 2);   
        switch(position) {
            case 0:
                branchPositions.push({side: sideEnum.LEFT, time: tempo * (i + 1)});
                break;
            case 1:
                branchPositions.push({side: sideEnum.RIGHT, time: tempo * (i + 1)});
                break;
            default:
                branchPositions.push({side: sideEnum.NONE, time: tempo * (i + 1)});
        }
    }
    ready = true;    
}
