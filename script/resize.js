import {app, game} from "./app.js";
import {player} from "./player.js";
import {scene} from "./map.js";
import {uiGroup, viewport} from "./display.js";
import {addRect, addTween} from "./resourses.js";

export let blackout;

//Fits game content to the browser window
export function resizeGame(){

    let gameW = game.width,
        gameH = game.height

    // if (window.innerWidth < window.innerHeight) {
    //     gameW = game.width;
    //     gameH = game.height;
    // }
    // else{
    //     gameW = game.height;
    //     gameH = game.width;
    // }

    const w = Math.max(window.innerWidth, game.element.clientWidth);
    const h = Math.max(window.innerHeight, game.element.clientHeight);

    const scaleFactor = Math.min(
        w / gameW,
        h / gameH
    );

    const newWidth = Math.ceil(gameW * scaleFactor);
    const newHeight = Math.ceil(gameH * scaleFactor);

    app.renderer.resize(newWidth, newHeight);
    app.stage.scale.set(scaleFactor);

    blackout = addTween({
        sprite: addRect({
            parent: app.stage,
            group: uiGroup,
            width: game.worldWidth,
            height: game.worldHeight,
            color: "black"
        }),
        to: {alpha: 0},
        delay: 500
    })
}

window.onresize = function(){

    resizeGame();
}