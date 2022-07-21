import {app} from "./app.js";

//Add sprite by config and return
export function getSpriteByConfig(config){

    config = Object.assign({
        type: PIXI.Sprite,
        parent: app.stage,
        x: 0,
        y: 0,
        rotation: 0,
        anchor: [0.5, 0.5],
        scale: 1,
        score: 1,
        mask: false,
        food: true
    }, config);

    const atlas = PIXI.Loader.shared.resources["images/atlas.json"].textures;

    const sprite = new config.type(atlas[config.name + ".png"]);
    sprite.x = config.x;
    sprite.y = config.y;
    sprite.anchor.x = config.anchor[0];
    sprite.anchor.y = config.anchor[1];
    sprite.mask = config.mask;
    sprite.rotation = config.rotation;
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