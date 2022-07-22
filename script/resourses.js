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
        food: true
    }, config);

    let offset = {x: 0, y: 0};

    let mask = config.mask;

    if (config.parent === scene){

        mask = sceneMask;

        offset.x = (game.width - game.worldWidth) / 2;
        offset.y = (game.height - game.worldHeight) / 2;
    }

    const atlas = PIXI.Loader.shared.resources["atlas"].textures;

    const sprite = new config.type(atlas[config.name + ".png"]);
    sprite.x = config.x + offset.x;
    sprite.y = config.y + offset.y;
    sprite.anchor.x = config.anchor[0];
    sprite.anchor.y = config.anchor[1];
    sprite.mask = mask;
    sprite.angle = config.angle;
    sprite.scale.set(config.scale);
    sprite.parentGroup = config.group;

    sprite.score = config.score;
    sprite.food = config.food;
    sprite.random = Math.random();

    sprite.catched = false;
    sprite.catchTime = 0;

    config.parent.addChild(sprite);

    return sprite;
}