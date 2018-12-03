function start() {
    loadTextures();
    handleInput();
    setGameVariables();
}

/**
 * Carregar texturas.
 */
function loadTextures() {
    
    // Árvore principal.
    mainTreeSprite = loadSprite("images/tree.png", 200, 600, canvas.width / 2 - 100, 0);

    // Jogador.
    playerPositionXLEFT = mainTreeSprite.initialPosition.x - 200;
    playerPositionXRIGHT = mainTreeSprite.initialPosition.x + 250;
    playerSprite = loadSprite("images/player.png", 150, 192, playerPositionXLEFT, 410);

    // Machado.
    axePositionXLEFT = playerSprite.initialPosition.x + 100;
    axePositionXRIGHT = playerSprite.initialPosition.x + 330;
    axeSprite = loadSprite("images/axe.png", 152, 28, axePositionXLEFT, 525);

    // Galhos.
    const NUM_GALHOS = 6;
    var branchImage = loadTexture("images/branch.png");
    var branchSprites = [];
    for (let index = 0; index < NUM_GALHOS; index++)
        branchSprites.push(loadSprite(branchImage, -2000, -2000));
}

/**
 * Lidar com a entrada, inicialmente pelas setas do teclado.
 */
function handleInput() {
    document.addEventListener("keydown", e => {

        if(acceptInput) {
            let key = e.which || e.keyCode;

            // Atualizando posições.
            switch (key) {
                
                case 39: // ->
                    playerSprite.updatePosition(playerPositionXRIGHT, playerSprite.currentPosition.y);
                    axeSprite.updatePosition(axePositionXRIGHT, axeSprite.currentPosition.y);
                    timeRemaining += 150;
                    break;

                case 37: // <-
                    playerSprite.updatePosition(playerPositionXLEFT, playerSprite.currentPosition.y);
                    axeSprite.updatePosition(axePositionXLEFT, axeSprite.currentPosition.y);
                    timeRemaining += 150;
                    break;

                default:
                    break;

            }

            acceptInput = false;
        }
        
    });


    document.addEventListener("keyup", e => {
        axeSprite.updatePosition(2000, axeSprite.currentPosition.y); 
    })
}

/**
 * Setar as variáveis do jogo.
 */
function setGameVariables() {
    playerSideEnum = Object.freeze({"LEFT": 1, "RIGHT": 2});

    // Tempo.
    timeBarStartDimensions = {width: 400, height: 30};
    timeRemaining = 6000.0; //seconds;
    timeDecreaseSpeed = timeBarStartDimensions.width / timeRemaining;
    currentTime = Date.now();

    // Fluxo de jogo.
    gameOver = false;

}

