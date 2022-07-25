import {app, game} from "./app.js";
import {resizeGame} from "./resize.js";
import {player, initPlayer} from "./player.js";
import {Bar} from "./bar.js";
import {cameraMove, subscribe, initCamera, camera, scene} from "./camera.js";
import {initCity} from "./city.js";
import {initRoad} from "./road.js";
import {initDisplay, viewport, bgGroup} from "./display.js";

//Declare variables for images
export let  car, car_count,
            bar,
            style


//Setup images and add them to stage
export function setup(){

    initDisplay();
    initCamera();


    bar = new Bar();
    bar.progress(0);

    app.stage.addChild(bar);

    initPlayer({x: game.worldWidth / 2 - 1000, y: game.worldHeight / 2});

    initCity();

    initRoad();
}

//This function will run when the image has loaded
export function start(){

    resizeGame();

    subscribe(camera);

    app.ticker.add(gameLoop);
}

export function gameLoop(delta){

    bar.progress(player.score);
    player.grow(player.score);

    cameraMove(delta);

    // DINNER TIME
    for (let i = 0; i < scene.children.length; i++){

        let food = scene.children[i];

        if (food.food){

            if (
                rectIntersect(player.cat, food) &&
                compareSize(player.cat, food)
            ){

                if (!food.catched){

                    // PIXI.sound.play("swish");
                    food.catched = true;
                }
            }

            if (food.catched){

                food.time += delta;

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

    let aBox = a.hitBox.getBounds();
    let bBox = b.hitBox.getBounds();

    return  aBox.x + aBox.width > bBox.x &&
            aBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height;
}

// Return true if A width larger B
function compareSize(a, b){

    let aBox = a.hitBox.getBounds();
    let bBox = b.hitBox.getBounds();

    return  aBox.width > bBox.width ||
            aBox.width > bBox.height ||
            aBox.height > bBox.width ||
            aBox.height > bBox.height
}