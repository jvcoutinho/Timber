/**
 *  Carregando texturas. 
 */

// Árvore principal.
var mainTreeImage = loadTexture("images/tree.png");
var mainTreeSprite = loadSprite(mainTreeImage, 200, 600, canvas.width/2, 0);
mainTreeImage.onload = function() {
    mainTreeSprite.render(canvas.width/2, 0);
};

// Jogador.
var playerImage = loadTexture("images/player.png");
var playerSprite = loadSprite(playerImage, 150, 192, canvas.width/2 - 150, 420);
playerImage.onload = function() {
    playerSprite.render(canvas.width/2 - 150, 420);
};





