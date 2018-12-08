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
            sprite.resize().x, // Largura da imagem.
            sprite.resize().y // Altura da imagem.
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

    sprite.resize = function() {
        let ratio = canvas.width/canvas.height;
        let width = sprite.width / ratio;
        let height = sprite.height / ratio;  
        return {x: width, y: height};
    }

    return sprite;
}