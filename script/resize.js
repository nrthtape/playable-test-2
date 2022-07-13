import {app, viewport} from "./app.js";
import {config} from "./config.js";

//Fits game content to the browser window
export function resizeGame(){

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
}