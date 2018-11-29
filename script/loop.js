function loop() {

    restartSetup();
    draw();
    requestAnimationFrame(loop);
}

function restartSetup() {
    acceptInput = true;  
}

function draw() {
    mainTreeSprite.render(mainTreeSprite.currentPosition.x, mainTreeSprite.currentPosition.y);
    playerSprite.render(playerSprite.currentPosition.x, playerSprite.currentPosition.y);
    axeSprite.render(axeSprite.currentPosition.x, axeSprite.currentPosition.y);
}
