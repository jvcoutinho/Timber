function loop() {

    if(!gameOver) {

        timeRemaining -= (Date.now() - currentTime);
        elapsedTime += (Date.now() - currentTime);

        //console.log(elapsedTime);
        // if(timeRemaining <= 0)
        //     gameOver = true;
        currentTime = Date.now();
        //console.log(timeRemaining);

        //console.log(index, )
        if(index < beats.length && beats[index] <= elapsedTime / 1000) {
            index++;
            playerSide = (playerSide === sideEnum.LEFT) ? sideEnum.RIGHT : sideEnum.LEFT;
        }

        if(index2 <= branchPositions.length && branchPositions[index2].time <= elapsedTime / 1000) {
            index2++;
            visibleBranches.push({sprite: branchSprites[index2], position: branchPositions[index2]});
        }

        // Esmagado.
        //  if(branchPositions[NUM_GALHOS - 1] === playerSide) {
        //     branchPositions[NUM_GALHOS - 1] = sideEnum.NONE;
        //     gameOver = true;
        //  }
             

    } else {
        currentTime = Date.now();
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
    
    if(ready) {
        for(let i = 0; i < visibleBranches.length; i++) {
            if(visibleBranches[i].position.side === sideEnum.LEFT) {
                visibleBranches[i].sprite.context.save();
                visibleBranches[i].sprite.context.translate(branchPositionXLEFT + visibleBranches[i].sprite.width, visibleBranches[i].sprite.currentPosition.y + visibleBranches[i].sprite.height);
                visibleBranches[i].sprite.context.rotate(Math.PI);
                visibleBranches[i].sprite.context.translate(-branchPositionXLEFT + visibleBranches[i].sprite.width, -visibleBranches[i].sprite.currentPosition.y + visibleBranches[i].sprite.height);
                visibleBranches[i].sprite.render(branchPositionXLEFT, visibleBranches[i].sprite.currentPosition.y + 10);
                visibleBranches[i].sprite.context.restore();
            } else if(visibleBranches[i].position.side === sideEnum.RIGHT)
                visibleBranches[i].sprite.render(branchPositionXRIGHT, visibleBranches[i].sprite.currentPosition.y + 10);
        }
    }
}

function drawPlayer() {
    if(playerSide === sideEnum.LEFT)
        playerSprite.render(playerPositionXLEFT, playerSprite.currentPosition.y);
    else if(playerSide === sideEnum.RIGHT)
        playerSprite.render(playerPositionXRIGHT, playerSprite.currentPosition.y);
}
