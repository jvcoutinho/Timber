function loop() {

    if(!gameOver) {

        timeRemaining -= (Date.now() - currentTime);
        if(timeRemaining <= 0)
            gameOver = true;
        currentTime = Date.now();
        //console.log(timeRemaining);


        // Esmagado.
         if(branchPositions[NUM_GALHOS - 1] === playerSide) {
            branchPositions[NUM_GALHOS - 1] = sideEnum.NONE;
            gameOver = true;
         }
             

    } else {
        
    }
    restartSetup();
    draw();
    requestAnimationFrame(loop);
}

function restartSetup() {
    acceptInput = true;  
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    mainTreeSprite.render(mainTreeSprite.currentPosition.x, mainTreeSprite.currentPosition.y);
    mainTreeSpriteReplicate.render(mainTreeSpriteReplicate.initialPosition.x, mainTreeSpriteReplicate.initialPosition.y);
    drawBranches();
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
        if(branchPositions[i] === sideEnum.LEFT) {
            branchSprites[i].context.save();
            branchSprites[i].context.translate(branchPositionXLEFT + branchSprites[i].width, branchSprites[i].currentPosition.y + branchSprites[i].height);
            branchSprites[i].context.rotate(Math.PI);
            branchSprites[i].context.translate(-branchPositionXLEFT + branchSprites[i].width, -branchSprites[i].currentPosition.y + branchSprites[i].height);
            branchSprites[i].render(branchPositionXLEFT, (i - 1) * 150);
            branchSprites[i].context.restore();
        } else if(branchPositions[i] === sideEnum.RIGHT)
            branchSprites[i].render(branchPositionXRIGHT, (i - 1) * 150);
    }
}

function drawPlayer() {
    if(playerSide === sideEnum.LEFT)
        playerSprite.render(playerPositionXLEFT, playerSprite.currentPosition.y);
    else if(playerSide === sideEnum.RIGHT)
        playerSprite.render(playerPositionXRIGHT, playerSprite.currentPosition.y);
}
