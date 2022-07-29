import {app, game} from "./app.js";
import {resizeGame, blackout} from "./resize.js";
import {player, initPlayer} from "./player.js";
import {initBar, bar} from "./bar.js";
import {cameraMove, initCamera, camera} from "./camera.js";
import {initCity} from "./city.js";
import {initMap, scene} from "./map.js";
import {cityGroup, initDisplay, uiGroup} from "./display.js";
import {addRect, addTween, getSpriteByConfig} from "./resourses.js";
import {tutorial, initTutor} from "./tutorial.js";
import {initChars, moveChars} from "./characters.js";
import {final, initFinal} from "./final.js";

let startGame, stopGame, maxScore = 0;

//This function will run when the image has loaded
export function initGame() {

    initDisplay();

    initCamera();

    initMap();

    initCity();

    initChars();

    initPlayer({
        x: 1035,
        y: 1950
    });

    initBar();

    initTutor();

    initFinal();

    resizeGame();

    PIXI.sound.play("music", {loop: true});

    maxScore = getMaxScore();

    function screenTouch(){

        if (stopGame){

            openStore();
        }
        else{

            tutorial.end()
        }
    }

    camera
        .on("mousedown", screenTouch)
        .on("touchstart", screenTouch)

    blackout.on("end", function(){

        startGame = true;
    })

    app.ticker.add(gameLoop);
}

export function gameLoop(delta){

    moveChars(delta);

    if (!startGame){

        bar.progress(0, 1);
    }

    if (startGame){

        bar.progress(player.score, maxScore);
        player.grow(player.score);

        if (bar.getValue > 50){

            stopGame = true;
        }

        cameraMove(delta);

        // DINNER TIME
        for (let i = 0; i < scene.children.length; i++){

            let food = scene.children[i];

            if (food.food){

                if ((
                        rectIntersect(player.cat.hitBox, food.hitBox) ||
                        rectIntersect(player.vacuum.hitBox, food.hitBox)) &&
                        compareSize(player.cat.hitBox, food.hitBox) &&
                        !stopGame
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
    }

    if (stopGame){

        if (!final.showed){

            bar.visible = false;

            camera.dragging = false;

            final.show()
            final.showed = true;
        }
        // camera.dragging = false;
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

    return  (aBox.width > bBox.width &&
            aBox.height > bBox.height) ||
            (aBox.width > bBox.height &&
            aBox.height > bBox.width)
}

function getMaxScore(){

    let score = 0;

    for (let i = 0; i < scene.children.length; i++){

        let child = scene.children[i];

        if (child.food){

            score += child.score;
        }
    }

    return score;
}

//Check OS
const   detect = new MobileDetect(window.navigator.userAgent),
    os = detect.os()


//Go to game page depending on OS
function openStore(){
    let href;
    if (os === "iOS"){
        href = "https://apps.apple.com/RU/app/id1195621598?mt=8";
    }
    else if (os === "AndroidOS"){
        href = "https://go.onelink.me/app/e35c91b";
    }
    else{
        href = "https://game.playrix.com/homescapes/lp/hs001v1";
    }
    window.open(href, "_self");
}