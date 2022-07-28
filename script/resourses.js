import {app, game} from "./app.js";
import {scene, sceneMask} from "./map.js";

//Add sprite by config and return
export function getSpriteByConfig(config){

    config = Object.assign({
        type: PIXI.Sprite,
        parent: app.stage,
        x: 0,
        y: 0,
        angle: 0,
        anchor: 0.5,
        scale: 1,
        score: 1,
        food: true,
        load: true,
        speed: 1,
        hitBox: {}
    }, config);

    const sprite = new config.type(getTextureByName(config.name));

    sprite.x = config.x;
    sprite.y = config.y;
    sprite.anchor.set(config.anchor);
    sprite.mask = config.mask;
    sprite.angle = config.angle;
    sprite.scale.set(config.scale);
    sprite.parentGroup = config.group;

    sprite.name = config.name;
    sprite.score = config.score;

    if (config.parent === scene){

        sprite.food = config.food;
    }

    sprite.random = Math.random();
    sprite.area = randomArea({x: 25, y: 15});
    sprite.speed = config.speed;

    sprite.time = 0;

    if (sprite.food){

        // config.hitBox.show = true;
    }

    // if (config.hitBox){

        config.hitBox.sprite = sprite;
        sprite.hitBox = addBound(config.hitBox);
    // }
    // else{
    //
    //     sprite.hitBox = sprite;
    // }

    if (config.sizeBox){

        config.sizeBox.sprite = sprite;
        sprite.sizeBox = addBound(config.sizeBox);
    }
    else{

        sprite.sizeBox = sprite;
    }

    if (config.parent === scene){

        sprite.x += (game.width - game.worldWidth) / 2;
        sprite.y += (game.height - game.worldHeight) / 2;
    }

    if (config.load){

        config.parent.addChild(sprite);
    }

    return sprite;
}

export function getTextureByName(name){

    const atlas = PIXI.Loader.shared.resources["atlas"].textures;

    return atlas[name + ".png"];
}

function addBound(config){

    config = Object.assign({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        custom: false,
        show: false
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

        box.alpha = 0.75;
    }
    else{

        box.alpha = 0;
    }

    sprite.addChild(box);

    return box;
}

function randomColor(){

    return Math.floor(Math.random() * 16777215).toString(16);
}

function randomArea(radius){

    let theta = Math.random() * 2 * Math.PI,
        rX = Math.sqrt(Math.random()) * radius.x,
        rY = Math.sqrt(Math.random()) * radius.y

    return {x: rX * Math.cos(theta), y: rY * Math.sin(theta)}
}

export function addTween(config){

    config = Object.assign({
        delay: 0,
        time: 500,
        easing: PIXI.tween.Easing.inOutSine(),
        loop: false,
        cycle: false,
        speed: 1,
        repeat: 0
    }, config);

    const tween = PIXI.tweenManager.createTween(config.sprite);

    tween.from(config.from);
    tween.to(config.to);
    tween.path = config.path;
    tween.delay = config.delay;
    tween.time = config.time;
    tween.speed = config.speed;
    tween.easing = config.easing;
    tween.loop = config.loop;
    tween.pingPong = config.cycle;
    tween.repeat = config.repeat;
    tween.start();

    return tween;
}

export function addRect(config){

    config = Object.assign({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        color: 0xff0000,
        visible: true,
        alpha: 1
    }, config);

    const rect = new PIXI.Graphics();
    rect.beginFill(config.color);
    rect.drawRect(config.x, config.y, config.width, config.height);
    rect.endFill();
    rect.parentGroup = config.group;
    rect.visible = config.visible;
    rect.alpha = config.alpha;

    config.parent.addChild(rect);

    return rect;
}

export function addText(config){


}