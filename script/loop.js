function loop() {

    if(!gameOver) {

        timeRemaining -= (Date.now() - currentTime);
        if(timeRemaining <= 0)
            gameOver = true;
        currentTime = Date.now();
        //console.log(timeRemaining);
        restartSetup();
        draw();
        
        requestAnimationFrame(loop);
    }
}

function restartSetup() {
    acceptInput = true;  
}

function draw() {
    mainTreeSprite.render(mainTreeSprite.currentPosition.x, mainTreeSprite.currentPosition.y);
    playerSprite.render(playerSprite.currentPosition.x, playerSprite.currentPosition.y);
    axeSprite.render(axeSprite.currentPosition.x, axeSprite.currentPosition.y);
    drawTimeBar();
}

function drawTimeBar() {
    context.fillStyle = "red"
    context.strokeStyle = "white"
    context.clearRect(50, canvas.height - timeBarStartDimensions.height - 1, timeBarStartDimensions.width, timeBarStartDimensions.height)
    context.strokeRect(50, canvas.height - timeBarStartDimensions.height - 1, timeBarStartDimensions.width, timeBarStartDimensions.height);
    context.fillRect(50, canvas.height - timeBarStartDimensions.height - 1, timeDecreaseSpeed * timeRemaining, timeBarStartDimensions.height);
}
