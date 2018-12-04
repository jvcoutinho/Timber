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
    //Juliano: aqui tem q colocar pra renderizar os galhos. mas como ele fica no array, teria de faezr um for auqi?
    //Alem do mais tem de ver como vai atualizar as posicoes, no caso com um incremento fixo a posicao atual, coisa assim.
    //dai tem q ver uma condicional pra colocar quando chegar na altura da cabeça do boy.
    //nesse caso, caso nao corte... game over. pq nao pode tocar na cabela do boy.
}
