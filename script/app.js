import {start, setup} from "./start.js";

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
    transparent: false,             // default: false
    roundPixels: true,
    resolution: 1,
    // backgroundColor: 0x4cc0cd,
    autoResize: true
});

app.view.id = 'pixi-canvas';

//Add the canvas that Pixi automatically created for you to the HTML document
game.element.appendChild(app.view);

app.stage = new PIXI.display.Stage();

app.stage.sortableChildren = true;

export const viewport = new pixi_viewport.Viewport({
    screenWidth: game.width,
    screenHeight: game.height,
    worldWidth: game.worldWidth,
    worldHeight: game.worldHeight,
    interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});

app.stage.addChild(viewport);

export const scene = new PIXI.Container();

export const sceneRect = new PIXI.Graphics();
sceneRect.beginFill(0x4cc0cd);
sceneRect.drawRect((game.width - game.worldWidth) / 2, (game.height - game.worldHeight) / 2, game.worldWidth, game.worldHeight);
sceneRect.endFill();

scene.addChild(sceneRect);
viewport.addChild(scene);

export const sceneMask = new PIXI.Graphics();
sceneMask.beginFill(0x4cc0cd);
sceneMask.drawRect((game.width - game.worldWidth) / 2, (game.height - game.worldHeight) / 2, game.worldWidth, game.worldHeight);
sceneMask.endFill();

scene.addChild(sceneMask);

export const camera = new PIXI.Container();
camera.dragging = false;

const cameraRect = new PIXI.Graphics();
cameraRect.beginFill(0x4cc0cd);
cameraRect.drawRect((game.width - game.worldWidth) / 2, (game.height - game.worldHeight) / 2, game.worldWidth, game.worldHeight);
cameraRect.endFill();
cameraRect.alpha = 0;

camera.addChild(cameraRect);
app.stage.addChild(camera);

//Load an image and run the `setup` function when it's done
PIXI.Loader.shared
    .add("atlas", "image/atlas.json")
    .add("tap", "sound/tap.mp3")
    .add("tap2", "sound/tap2.mp3")
    .add("swish", "sound/swish.mp3")
    .add("star", "sound/star.mp3")
    .load(setup)
    .onComplete.add(start)



