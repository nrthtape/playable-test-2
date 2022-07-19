import {config} from "./config.js";
import {start, setup} from "./start.js";

//Create a Pixi Application
export const app = new PIXI.Application({
    width: config.width,             // default: 800
    height: config.height,            // default: 600
    antialias: true,                // default: false
    transparent: false,             // default: false
    roundPixels: true,
    resolution: 1,
    // backgroundColor: 0x4cc0cd,
    autoResize: true
});

app.view.id = 'pixi-canvas';

//Add the canvas that Pixi automatically created for you to the HTML document
config.element.appendChild(app.view);

app.stage = new PIXI.display.Stage();

export const scene = new PIXI.Container();

export const sceneRect = new PIXI.Graphics();
sceneRect.beginFill(0x4cc0cd);
sceneRect.drawRect((config.width - config.worldWidth) / 2, (config.height - config.worldHeight) / 2, config.worldWidth, config.worldHeight);
sceneRect.endFill();

scene.addChild(sceneRect);

app.stage.addChild(scene);

export const camera = new PIXI.Container();
camera.dragging = false;

const cameraRect = new PIXI.Graphics();
cameraRect.beginFill(0x4cc0cd);
cameraRect.drawRect((config.width - config.worldWidth) / 2, (config.height - config.worldHeight) / 2, config.worldWidth, config.worldHeight);
cameraRect.endFill();
cameraRect.alpha = 0;

camera.addChild(cameraRect);

app.stage.addChild(camera);

//Load an image and run the `setup` function when it's done
PIXI.Loader.shared
    .add("images/atlas.json")
    .load(setup)
    .onComplete.add(start)



