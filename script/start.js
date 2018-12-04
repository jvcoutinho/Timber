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
    playerPositionXRIGHT = mainTreeSprite.initialPosition.x + 250;
    playerSprite = loadSprite("images/player.png", 150, 192, playerPositionXLEFT, canvas.height/2 + 50);

    // Machado.
    axePositionXLEFT = playerSprite.initialPosition.x + 120;
    axePositionXRIGHT = playerSprite.initialPosition.x + 320;
    axeSprite = loadSprite("images/axe.png", 152, 28, axePositionXLEFT, canvas.height/2 + 150);

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
                    break;

                case 37: // <-
                    playerSprite.updatePosition(playerPositionXLEFT, playerSprite.currentPosition.y);
                    axeSprite.updatePosition(axePositionXLEFT, axeSprite.currentPosition.y);
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
}

