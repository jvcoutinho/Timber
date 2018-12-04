function loadSprite(image, width, height, positionX, positionY) {

    var sprite = createSprite({
        context: context, 
        width: width,
        height: height,
        image: loadTexture(image),
        initialPositionX: positionX,
        initialPositionY: positionY
    });

    sprite.image.onload = function() {
        sprite.render(positionX, positionY);
    };

    return sprite;
} 

function loadTexture(path) {
    var image = new Image();
    image.src = path;

    return image;
}

function createSprite (options) {

    var sprite = {};

    sprite.context = options.context;
    sprite.width = options.width;
    sprite.height = options.height;
    sprite.image = options.image;
    sprite.initialPosition = {
        x: options.initialPositionX,
        y: options.initialPositionY 
    };
    sprite.currentPosition = {
        x: options.initialPositionX,
        y: options.initialPositionY 
    };

    sprite.render = function(x, y) {

        sprite.context.drawImage(
            sprite.image, // Image.
            0, // Coordenada x da área.
            0, // Coordenada y da área.
            sprite.width, // Largura da área.
            sprite.height, // Altura da área.
            x, // Coordenada x da tela para desenhar a imagem.
            y, // Coordenada y da tela para desenhar a imagem.
            sprite.width, // Largura da imagem.
            sprite.height // Altura da imagem.
        );

        sprite.currentPosition = {
            x: x, 
            y: y
        }

    };

    sprite.updatePosition = function(x, y) {
        sprite.context.clearRect(sprite.currentPosition.x, sprite.currentPosition.y, sprite.width, sprite.height);
        sprite.render(x, y);
    }

    return sprite;
}

function updateBranches() {
    NUM_BRANCHES = 6 //ja existe uma var chamada assim em outro arquivo.
    console.log("Entrou no updateBranches");
    for (j = NUM_BRANCHES - 1; j > 0; j--)
	{
		branchPositions[j] = branchPositions[j - 1];
	}

	// Spawn a new branch at position 0   
	// LEFT, RIGHT or NONE   
	r = Math.floor(Math.random() * 4);
	
	switch (r)
        {
        case 0:
            branchPositions[0] = "LEFT";
            break;

        case 1:
            branchPositions[0] = "RIGHT";
            break;
               
        default:
            break;
        }


}
