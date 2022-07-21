import {app, scene, viewport} from "./app.js";
import {config} from "./config.js";
import {player} from "./start.js";

//Fits game content to the browser window
export function resizeGame(){

    // if (window.innerWidth < window.innerHeight) {
    //
    //     config.width = config.w;
    //     config.height = config.h;
    // }
    // else{
    //
    //     config.width = config.h;
    //     config.height = config.w;
    // }

    const w = Math.max(window.innerWidth, config.element.clientWidth);
    const h = Math.max(window.innerHeight, config.element.clientHeight);

    const scaleFactor = Math.min(
        w / config.width,
        h / config.height
    );

    const newWidth = Math.ceil(config.width * scaleFactor);
    const newHeight = Math.ceil(config.height * scaleFactor);

    app.renderer.resize(newWidth, newHeight);
    app.stage.scale.set(scaleFactor);

    // player.x = config.width / 2 - scene.x;
    // player.y = config.height / 2 - scene.y;
}