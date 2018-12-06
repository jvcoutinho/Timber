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
    drawBranches();
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

function drawBranches() {
    for(let i = 0; i < NUM_GALHOS; i++) {
        
        if(branchPositions[i] === branchPositionXLEFT) {
            branchSprites[i].context.save();
            branchSprites[i].context.translate(branchPositionXLEFT + branchSprites[i].width, branchSprites[i].currentPosition.y + branchSprites[i].height);
            branchSprites[i].context.rotate(Math.PI);
            branchSprites[i].context.translate(-branchPositionXLEFT + branchSprites[i].width, -branchSprites[i].currentPosition.y + branchSprites[i].height);
            branchSprites[i].render(branchPositionXLEFT, i * 150);
            branchSprites[i].context.restore();
        } else
            branchSprites[i].render(branchPositions[i], i * 150);
            
       
    }
}
