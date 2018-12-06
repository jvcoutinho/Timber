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
    mainTreeSprite = loadSprite("images/tree.png", canvas.width/10, canvas.height/2 + 250, canvas.width / 2 - 100, 0);

    // Jogador.
    playerPositionXLEFT = mainTreeSprite.initialPosition.x - 200;
    playerPositionXRIGHT = mainTreeSprite.initialPosition.x + 200;
    playerSprite = loadSprite("images/player.png", 150, 192, playerPositionXLEFT, canvas.height/2 + 50);

    // Machado.
    axePositionXLEFT = playerSprite.initialPosition.x + 120;
    axePositionXRIGHT = playerSprite.initialPosition.x + 270;
    axeSprite = loadSprite("images/axe.png", 152, 28, axePositionXLEFT, canvas.height/2 + 160);

    // Galhos.
    NUM_GALHOS = 6;
    branchPositionXLEFT = mainTreeSprite.initialPosition.x;
    branchPositionXRIGHT = mainTreeSprite.initialPosition.x + 137;
    branchSprites = [];
    branchPositions = [];
    for (let index = 0; index < NUM_GALHOS; index++) {
        branchSprites.push(loadSprite("images/branch.png", 440, 80, -2000, -2000));
        branchPositions.push(-2000);
    }
        
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
                    updateBranchPositions();
                    timeRemaining += 150;
                    break;

                case 37: // <-
                    playerSprite.updatePosition(playerPositionXLEFT, playerSprite.currentPosition.y);
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
    playerSideEnum = Object.freeze({"LEFT": 1, "RIGHT": 2});

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
            branchPositions[0] = branchPositionXLEFT;
            break;
        case 1:
            branchPositions[0] = branchPositionXRIGHT;
            break;
        default:
            branchPositions[0] = -2000;
    }
}
