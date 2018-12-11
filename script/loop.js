function loop() {

    if(!gameOver) {

        timeInterval = (Date.now() - currentTime);
        timeRemaining -= timeInterval;
        elapsedTime += timeInterval;
        tempoTime += timeInterval / 1000;

        // Condição de perda 1: tempo esgotado.
        if(timeRemaining <= 0)
            gameOver = true;

        // Changing beats.
        if(index < beats.length && beats[index].start <= elapsedTime / 1000) 
            index++;
        
        // 
        if(tempoTime >= tempo - 0.1 && tempoTime <= tempo + 0.1) {
            beat = true;
           // console.log(true);
        } else if(tempoTime > tempo + 0.1) {
            beat = false;
            tempoTime = 0;
            //console.log(false);
        }
        
        currentTime = Date.now();

        

        if(index2 <= branchPositions.length && branchPositions[index2].time <= elapsedTime / 1000) {
            index2++;
            visibleBranches.push({sprite: branchSprites[index2], position: branchPositions[index2]});
        }

        // Esmagado.
        //  if(branchPositions[NUM_GALHOS - 1] === playerSide) {
        //     branchPositions[NUM_GALHOS - 1] = sideEnum.NONE;
        //     gameOver = true;
        //      gameover_sound.play()
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
    
    if(ready && !gameOver) {
        for(let i = visibleBranchesIndex; i < visibleBranches.length; i++) {
            if(visibleBranches[i].sprite.currentPosition.y <= playerSprite.currentPosition.y + playerSprite.height / 2) { 
                if(visibleBranches[i].position.side === sideEnum.LEFT) {
                    visibleBranches[i].sprite.context.save();
                    visibleBranches[i].sprite.context.translate(branchPositionXLEFT + visibleBranches[i].sprite.width, visibleBranches[i].sprite.currentPosition.y + visibleBranches[i].sprite.height);
                    visibleBranches[i].sprite.context.rotate(Math.PI);
                    visibleBranches[i].sprite.context.translate(-branchPositionXLEFT + visibleBranches[i].sprite.width, -visibleBranches[i].sprite.currentPosition.y + visibleBranches[i].sprite.height);
                    visibleBranches[i].sprite.render(branchPositionXLEFT, visibleBranches[i].sprite.currentPosition.y + 10 / energy);
                    visibleBranches[i].sprite.context.restore();
                } else if(visibleBranches[i].position.side === sideEnum.RIGHT) {
                    visibleBranches[i].sprite.render(branchPositionXRIGHT, visibleBranches[i].sprite.currentPosition.y + 10 / energy);
                }
                    
                // Condição de perda: esmagamento!
                if(visibleBranches[i].sprite.currentPosition.y >= playerSprite.currentPosition.y && visibleBranches[i].position.side === playerSide) 
                    gameOver = true;
            } else 
                visibleBranchesIndex++;
        }
    }
}

function drawPlayer() {
    if(playerSide === sideEnum.LEFT)
        playerSprite.render(playerPositionXLEFT, playerSprite.currentPosition.y);
    else if(playerSide === sideEnum.RIGHT)
        playerSprite.render(playerPositionXRIGHT, playerSprite.currentPosition.y);
}
