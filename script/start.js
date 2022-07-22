import {app, game, sceneRect, scene, camera, viewport} from "./app.js";
import {resizeGame} from "./resize.js";
import {getSpriteByConfig} from "./resourses.js";
import {player, initPlayer} from "./player.js";
import {Bar} from "./bar.js";
import {cameraMove, subscribe} from "./camera.js";
import {initCity} from "./city.js";
import {initRoad} from "./road.js";

//Declare variables for images
export let  car, car_count,
            bar,
            style,
            grid,
            uiGroup, flyingGroup, bgGroup, cityGroup, playerGroup


//Setup images and add them to stage
export function setup(){

    uiGroup = new PIXI.display.Group(2, false);
    flyingGroup = new PIXI.display.Group(1, true);
    playerGroup = new PIXI.display.Group(-1, false);
    bgGroup = new PIXI.display.Group(-2, false);
    cityGroup = new PIXI.display.Group(0, (sprite) => {
        sprite.zOrder = sprite.y;
    });

    app.stage.addChild(new PIXI.display.Layer(cityGroup));
    app.stage.addChild(new PIXI.display.Layer(uiGroup));
    app.stage.addChild(new PIXI.display.Layer(flyingGroup));
    app.stage.addChild(new PIXI.display.Layer(playerGroup));
    app.stage.addChild(new PIXI.display.Layer(bgGroup));

    sceneRect.parentGroup = bgGroup;

    bar = new Bar();
    bar.progress(0);

    app.stage.addChild(bar);

    initPlayer({x: game.worldWidth / 2, y: game.worldHeight / 2});

    initCity();

    initRoad();

    car_count = 99;

    for (let i = 0; i < car_count; i++){

        let name, sprite;

        if (Math.random() > 0.5){
            name = "fish_cookie";
        }
        else{
            name = "car_violet";
        }

        sprite = getSpriteByConfig({
            name: name,
            parent: scene,
            group: cityGroup,
            score: 1
        });

        sprite.x += Math.random() * (game.worldWidth + sprite.width / 2);
        sprite.y += Math.random() * (game.worldHeight + sprite.height / 2);
    }
}

//This function will run when the image has loaded
export function start(){

    resizeGame();

    subscribe(camera);

    app.ticker.add(gameLoop);
}

export function gameLoop(delta){

    bar.progress(Math.round(player.score));
    player.grow(Math.round(player.score));

    cameraMove(delta);

    // DINNER TIME
    for (let i = 0; i < scene.children.length; i++){

        let food = scene.children[i];

        if (food.food){

            if (
                rectIntersect(player.cat, food, 15) &&
                compareSize(player.cat, food, 0)
            ){

                if (!food.catched){

                    food.catched = true;
                }
            }

            if (food.catched){

                food.catchTime += delta;

                player.eat(food);
            }
        }
    }

    PIXI.tweenManager.update();
}

window.onresize = function(){

    resizeGame();
}

// Check intersect between two objects
function rectIntersect(a, b, offset = 0){

    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return  aBox.x + aBox.width - offset > bBox.x &&
            aBox.x + offset < bBox.x + bBox.width &&
            aBox.y + aBox.height - offset > bBox.y &&
            aBox.y + offset < bBox.y + bBox.height;
}

// Return true if A width larger B
function compareSize(a, b, offset = 0){

    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return  aBox.width - offset > bBox.width ||
            aBox.width - offset > bBox.height
}