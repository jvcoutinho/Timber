/**
 *  Carregando texturas. 
 */

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




