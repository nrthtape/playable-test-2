import {app, game, scene, sceneMask} from "./app.js";

//Add sprite by config and return
export function getSpriteByConfig(config){

    config = Object.assign({
        type: PIXI.Sprite,
        parent: app.stage,
        x: 0,
        y: 0,
        angle: 0,
        anchor: [0.5, 0.5],
        scale: 1,
        score: 1,
        mask: false,
        player: false,
        food: true,
        hitBox: {custom: false, show: true}
    }, config);

    const atlas = PIXI.Loader.shared.resources["atlas"].textures;

    const sprite = new config.type(atlas[config.name + ".png"]);

    sprite.x = config.x;
    sprite.y = config.y;
    sprite.anchor.x = config.anchor[0];
    sprite.anchor.y = config.anchor[1];
    sprite.mask = config.mask;
    sprite.angle = config.angle;
    sprite.scale.set(config.scale);
    sprite.parentGroup = config.group;

    sprite.score = config.score;
    sprite.food = config.food;
    sprite.random = Math.random();

    sprite.time = 0;

    config.hitBox.sprite = sprite;

    sprite.hitBox = addHitBox(config.hitBox);


    if (config.parent === scene){

        sprite.mask = sceneMask;

        sprite.x += (game.width - game.worldWidth) / 2;
        sprite.y += (game.height - game.worldHeight) / 2;
    }

    config.parent.addChild(sprite);

    return sprite;
}

function addHitBox(config){

    config = Object.assign({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }, config);

    let sprite = config.sprite;

    let w = 0, h = 0;

    if (config.custom === false) {

        w = config.sprite.width;
        h = config.sprite.height;
    }

    let box = new PIXI.Graphics()
        .beginFill("0x" + randomColor())
        .drawRect(- (w + config.width) / 2 + config.x, - (h + config.height) / 2 + config.y, config.width + w, config.height + h)
        .endFill()

    if (config.show){

        box.alpha = 0.5;
    }
    else{

        box.alpha = 0;
    }

    sprite.addChild(box);
    // box.x = sprite.x + sprite.parent.x
    // box.y = sprite.y + sprite.parent.y

    return box;
}

function randomColor(){

    return Math.floor(Math.random()*16777215).toString(16);
}