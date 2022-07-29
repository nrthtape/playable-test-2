import {initGame} from "./start.js";

//Set the game options
export let game = {
    width: 1080,
    height: 1920,
    // width: 4320,
    // height: 3500,
    worldWidth: 4320,
    worldHeight: 3500,
    element: document.body
}

//Create a Pixi Application
export const app = new PIXI.Application({
    width: game.width,             // default: 800
    height: game.height,            // default: 600
    antialias: true,                // default: false
    roundPixels: true,
    resolution: 1,
    // backgroundColor: 0x4cc0cd,
    backgroundColor: 0x5dd1de,
    autoResize: true
});

app.view.id = 'pixi-canvas';

//Add the canvas that Pixi automatically created for you to the HTML document
game.element.appendChild(app.view);

//Load an image and run the `setup` function when it's done
PIXI.Loader.shared
    .add("atlas", "image/atlas.json")
    .add("music", "sound/music.mp3")
    .add("tap", "sound/tap.mp3")
    .add("size", "sound/size.mp3")
    .add("swish", "sound/swish.mp3")
    .add("star", "sound/star.mp3")
    .add("ok", "sound/ok.mp3")
    .load(initGame)



