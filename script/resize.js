import {app, game, scene, viewport} from "./app.js";

//Fits game content to the browser window
export function resizeGame(){

    // if (window.innerWidth < window.innerHeight) {
    //
    //     game.width = game.w;
    //     game.height = game.h;
    // }
    // else{
    //
    //     game.width = game.h;
    //     game.height = game.w;
    // }

    const w = Math.max(window.innerWidth, game.element.clientWidth);
    const h = Math.max(window.innerHeight, game.element.clientHeight);

    const scaleFactor = Math.min(
        w / game.width,
        h / game.height
    );

    const newWidth = Math.ceil(game.width * scaleFactor);
    const newHeight = Math.ceil(game.height * scaleFactor);

    app.renderer.resize(newWidth, newHeight);
    app.stage.scale.set(scaleFactor);

    // player.x = game.width / 2 - scene.x;
    // player.y = game.height / 2 - scene.y;
}