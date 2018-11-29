/***********************
 *  Carregando texturas. 
 ***********************/

// Árvore principal.
var mainTreeImage = loadTexture("images/tree.png");
var mainTreeSprite = loadSprite(mainTreeImage, 200, 600);
mainTreeImage.onload = function() {
    mainTreeSprite.render(canvas.width/2, 0);
};

// Jogador.
var playerImage = loadTexture("images/player.png");
var playerSprite = loadSprite(playerImage, 150, 192);
playerImage.onload = function() {
    playerSprite.render(canvas.width/2 - 150, 420);
};

// Machado.
var axeImage = loadTexture("images/axe.png");
var axeSprite = loadSprite(axeImage, 152, 28);
axeImage.onload = function() {
    axeSprite.render(canvas.width/2 - 280, 530);
};


/********************
 * Variáveis de jogo.
 ********************/
var playerSideEnum = Object.freeze({"LEFT": 1, "RIGHT": 2});


/**********************
 * Controle da entrada.
 **********************/
var acceptInput = false;
document.addEventListener("keydown", e => {
    if(acceptInput) {
        let key = e.which || e.keyCode;
        switch (key) {
            case 39: // ->
                // Atualizando posição do lenhador.
                updatePosition(playerSprite, canvas.width/2 - 150, 420, canvas.width/2 + 205, 420);

                // Atualizando posição do machado.
                updatePosition(axeSprite, canvas.width/2 - 280, 530, canvas.width/2 + 205, 535);
                break;
            
            case 37: // <-
                // Atualizando posição do lenhador.
                updatePosition(playerSprite, canvas.width/2 + 205, 420, canvas.width/2 - 150, 420);

                // Atualizando posição do machado.
                updatePosition(axeSprite, canvas.width/2 + 205, 535, canvas.width/2 - 280, 530);
                break;
            default:
                break;
        }
    }
    acceptInput = false;
});

function updatePosition(sprite, oldX, oldY, newX, newY) {
    context.clearRect(oldX, oldY, sprite.width, sprite.height);
    sprite.render(newX, newY);
}

