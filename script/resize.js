import {app, game} from "./app.js";
import {player} from "./player.js";
import {scene} from "./map.js";
import {viewport} from "./display.js";

//Fits game content to the browser window
export function resizeGame(){

    let gameW,
        gameH

    gameW = game.width;
    gameH = game.height;

    // if (window.innerWidth < window.innerHeight) {
    //
    //     gameW = game.width;
    //     gameH = game.height;
    // }
    // else{
    //
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
}

window.onresize = function(){

    resizeGame();
}