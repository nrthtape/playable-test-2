import {config} from "./config.js";
import {start, setup} from "./start.js";

//Aliases
export const    Application = PIXI.Application,
                Container = PIXI.Container,
                ParticleContainer = PIXI.ParticleContainer,
                loader = PIXI.Loader.shared,
                resources = PIXI.Loader.shared.resources,
                Graphics = PIXI.Graphics,
                TextureCache = PIXI.utils.TextureCache,
                Sprite = PIXI.Sprite,
                Text = PIXI.Text,
                TextStyle = PIXI.TextStyle,
                Display = PIXI.display,
                tweenManager = PIXI.tweenManager,
                Easing = PIXI.tween.Easing


export let app, viewport;

//Create a Pixi Application
app = new Application({
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

export const scene = new Container();

export const sceneRect = new Graphics();
sceneRect.beginFill(0x4cc0cd);
sceneRect.drawRect((config.width - config.worldWidth) / 2, (config.height - config.worldHeight) / 2, config.worldWidth, config.worldHeight);
sceneRect.endFill();

scene.addChild(sceneRect);

app.stage.addChild(scene);

export const camera = new Container();
camera.dragging = false;

const cameraRect = new Graphics();
cameraRect.beginFill(0x4cc0cd);
cameraRect.drawRect((config.width - config.worldWidth) / 2, (config.height - config.worldHeight) / 2, config.worldWidth, config.worldHeight);
cameraRect.endFill();
cameraRect.alpha = 0;

camera.addChild(cameraRect);

app.stage.addChild(camera);

//Load an image and run the `setup` function when it's done
loader
    .add("images/atlas.json")
    .add("images/grid.jpg")
    .load(setup)
    .onComplete.add(start)



