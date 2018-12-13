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
        
        // Beat counter.
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
    drawClouds();
    drawPlayer();
    mainTreeSprite.render(mainTreeSprite.currentPosition.x, mainTreeSprite.currentPosition.y);
    mainTreeSpriteReplicate.render(mainTreeSpriteReplicate.initialPosition.x, mainTreeSpriteReplicate.initialPosition.y);
    drawBranches();
    axeSprite.render(axeSprite.currentPosition.x, axeSprite.currentPosition.y);
    drawTimeBar();
    updateScore();
 }

 function drawClouds(){

    let jump = (beat) ? 10 : 0;

    // Left.
    cloud1.render(0, 0 + jump);
    cloud2.render(100, 0 + jump);
    cloud2.render(300, 0 + jump);
    cloud4.render(500, 0  + jump);
    cloud4.render(700, 100  + jump);
    cloud4.render(100, 20  + jump);
    cloud2.render(250, 50  + jump);
    cloud1.render(50, 25  + jump);
    cloud3.render(800, 60  + jump);
    cloud4.render(300, 80  + jump);
    cloud2.render(50, 150 + jump);


    // Right.
    cloud1.render( canvas.width/2 + 0, 0 + jump);
    cloud2.render( canvas.width/2 + 100, 0 + jump);
    cloud2.render( canvas.width/2 + 300, 0 + jump);
    cloud4.render( canvas.width/2 + 500, 0 + jump);
    cloud4.render( canvas.width/2 + 700, 100 + jump);
    cloud4.render( canvas.width/2 + 100, 20 + jump);
    cloud2.render( canvas.width/2 + 250, 50 + jump);
    cloud1.render( canvas.width/2 + 50, 25 + jump);
    cloud3.render( canvas.width/2 + 800, 60 + jump);
    cloud4.render( canvas.width/2 + 300, 80 + jump);
    cloud2.render( canvas.width/2 + 50, 150 + jump);
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
            if(visibleBranches[i].sprite.currentPosition.y <= playerSprite.currentPosition.y + playerSprite.height / 2.5) { 
                if(visibleBranches[i].position.side === sideEnum.LEFT) {
                    visibleBranches[i].sprite.context.save();
                    visibleBranches[i].sprite.context.translate(branchPositionXLEFT + visibleBranches[i].sprite.width, visibleBranches[i].sprite.currentPosition.y + visibleBranches[i].sprite.height);
                    visibleBranches[i].sprite.context.rotate(Math.PI);
                    visibleBranches[i].sprite.context.translate(-branchPositionXLEFT + visibleBranches[i].sprite.width, -visibleBranches[i].sprite.currentPosition.y + visibleBranches[i].sprite.height);
                    visibleBranches[i].sprite.render(branchPositionXLEFT, visibleBranches[i].sprite.currentPosition.y + branchSpeed);
                    visibleBranches[i].sprite.context.restore();
                } else if(visibleBranches[i].position.side === sideEnum.RIGHT) {
                    visibleBranches[i].sprite.render(branchPositionXRIGHT, visibleBranches[i].sprite.currentPosition.y + branchSpeed);
                }
                    
                // Condição de perda: esmagamento!
                if(visibleBranches[i].sprite.currentPosition.y >= playerSprite.currentPosition.y && visibleBranches[i].position.side === playerSide) 
                    gameOver = true;
            } else {
                visibleBranchesIndex++;
                score++;
            }
        }
    }
}

function drawPlayer() {
    if(playerSide === sideEnum.LEFT)
        playerSprite.render(playerPositionXLEFT, playerSprite.currentPosition.y);
    else if(playerSide === sideEnum.RIGHT)
        playerSprite.render(playerPositionXRIGHT, playerSprite.currentPosition.y);
}

function updateScore() {
    scoreDIV.innerHTML = "SCORE: " + score;
    branchSpeed += 0.00001 * score;
    INITIAL_TIME -= 0.00001 * score;
}
