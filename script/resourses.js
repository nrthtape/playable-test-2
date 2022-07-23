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
        hitBox: null,
        hitBoxAlpha: 0.5
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

    if (config.hitBox === null){

        sprite.hitBox = sprite;
    }
    else{

        sprite.hitBox = config.hitBox;
        sprite.hitBox.visible = 0
        sprite.addChild(sprite.hitBox)
    }

    sprite.hitBoxAlpha = config.hitBoxAlpha

    if (config.parent === scene){

        sprite.mask = sceneMask;

        sprite.x += (game.width - game.worldWidth) / 2;
        sprite.y += (game.height - game.worldHeight) / 2;
    }

    if (config.hitBoxAlpha > 0){

        showHitBox(sprite);
    }

    config.parent.addChild(sprite);

    return sprite;
}

function showHitBox(sprite){

    let bound = sprite.hitBox.getBounds();

    let box = new PIXI.Graphics()
        .beginFill("0x" + randomColor())
        .drawRect(- bound.width / 2, - bound.height / 2, bound.width, bound.height)
        .endFill()
    box.alpha = sprite.hitBoxAlpha;

    sprite.addChild(box);
}

function randomColor(){

    return Math.floor(Math.random()*16777215).toString(16);
}