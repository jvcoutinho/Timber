function loadTexture(path) {
    var image = new Image();
    image.src = path;

    return image;
}

function loadSprite(image, width, height, posx, posy) {

    var sprite = createSprite({
        context: context, 
        width: width,
        height: height,
        image: image
    });

    return sprite;
} 


function createSprite (options) {

    var sprite = {};

    sprite.context = options.context;
    sprite.width = options.width;
    sprite.height = options.height;
    sprite.image = options.image;

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

    };

    return sprite;
}