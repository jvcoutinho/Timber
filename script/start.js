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
    mainTreeSprite = loadSprite("images/tree.png", 300, 900, canvas.width / 2 - 100, 140);
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
    NUM_GALHOS = 6;
    branchPositionXLEFT = mainTreeSprite.initialPosition.x;
    branchPositionXRIGHT = mainTreeSprite.initialPosition.x + 144;
    branchSprites = [];
    branchPositions = [];
    for (let index = 0; index < NUM_GALHOS; index++) {
        branchSprites.push(loadSprite("images/branch.png", 440, 80, 2000, -2000));
        branchPositions.push(2000);
    }
        
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
                    updateBranchPositions();
                    timeRemaining += 150;
                    break;

                case 37: // <-
                    playerSide = sideEnum.LEFT;
                    // playerSprite.updatePosition(playerPositionXLEFT, playerSprite.currentPosition.y);
                    axeSprite.updatePosition(axePositionXLEFT, axeSprite.currentPosition.y);
                    updateBranchPositions();
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
    sideEnum = Object.freeze({"LEFT": 1, "RIGHT": 2, "NONE": 3});
    playerSide = sideEnum.LEFT;

    // Tempo.
    timeBarStartDimensions = {width: 400, height: 30};
    timeRemaining = 6000.0; //seconds;
    timeDecreaseSpeed = timeBarStartDimensions.width / timeRemaining;
    currentTime = Date.now();

    // Fluxo de jogo.
    gameOver = false;

}

function updateBranchPositions() {
    // Mover todos os galhos uma posição abaixo.
    for (let i = NUM_GALHOS - 1; i > 0; i--) 
        branchPositions[i] = branchPositions[i - 1];
    
    // Surgir um novo galho na posição 0.
    let position = Math.floor(Math.random() * 5);
    switch(position) {
        case 0:
            branchPositions[0] = sideEnum.LEFT;
            break;
        case 1:
            branchPositions[0] = sideEnum.RIGHT;
            break;
        default:
            branchPositions[0] = sideEnum.NONE;
    }
}
