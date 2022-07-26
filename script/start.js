import {app, game} from "./app.js";
import {resizeGame} from "./resize.js";
import {player, initPlayer} from "./player.js";
import {initBar, bar} from "./bar.js";
import {cameraMove, initCamera, camera} from "./camera.js";
import {initCity} from "./city.js";
import {initMap, scene} from "./map.js";
import {initDisplay} from "./display.js";

//This function will run when the image has loaded
export function start() {

    initDisplay();

    initCamera();

    initMap();

    initCity();

    initPlayer({
        x: 1035,
        y: 1950
    });

    initBar();

    resizeGame();

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
                (rectIntersect(player.cat.hitBox, food.hitBox) ||
                rectIntersect(player.vacuum.hitBox, food.hitBox)) &&
                compareSize(player.cat.hitBox, food.hitBox)
            ){

                if (!food.catched){

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

// Check intersect between two objects
export function rectIntersect(a, b){

    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return  aBox.x + aBox.width > bBox.x &&
            aBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height;
}

// Return true if A width larger B
function compareSize(a, b){

    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return  aBox.width > bBox.width ||
            aBox.height > bBox.height ||
            aBox.width > bBox.height ||
            aBox.height > bBox.width
}