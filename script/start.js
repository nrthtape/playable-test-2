import {app, sceneRect, scene, camera, viewport} from "./app.js";
import {resizeGame} from "./resize.js";
import {getSpriteByConfig} from "./resourses.js";
import {Player} from "./player.js";
import {Bar} from "./bar.js";
import {cameraMove, subscribe} from "./camera.js";

//Declare variables for images
export let  player,
            car, car_count,
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

    app.stage.sortableChildren = true;
    app.stage.addChild(new PIXI.display.Layer(cityGroup));
    app.stage.addChild(new PIXI.display.Layer(uiGroup));
    app.stage.addChild(new PIXI.display.Layer(flyingGroup));
    app.stage.addChild(new PIXI.display.Layer(playerGroup));
    app.stage.addChild(new PIXI.display.Layer(bgGroup));

    sceneRect.parentGroup = bgGroup;

    player = new Player();
    scene.addChild(player);

    bar = new Bar();
    bar.progress(0);

    app.stage.addChild(bar);

    car_count = 100;

    for (let i = 0; i < car_count; i++){

        let name, sprite;

        if (Math.random() > 0.5){
            name = "car_yellow";
        }
        else{
            name = "car_violet";
        }

        sprite = getSpriteByConfig({
            name: name,
            parent: scene,
            x: Math.random() * scene.width / 2,
            y: Math.random() * scene.height / 2,
            group: cityGroup
        });
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

            if (rectIntersect(food, player.cat)){

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
function rectIntersect(a, b){

    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return  aBox.x + aBox.width > bBox.x &&
            aBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height;
}