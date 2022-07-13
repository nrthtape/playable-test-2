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

const sceneRect = new Graphics();
sceneRect.beginFill(0x4cc0cd);
sceneRect.drawRect((config.width - config.worldWidth) / 2, (config.height - config.worldHeight) / 2, config.worldWidth, config.worldHeight);
sceneRect.endFill();
// sceneRect.alpha = 0;

scene.addChild(sceneRect);

app.stage.addChild(scene);

// // create viewport
// viewport = new pixi_viewport.Viewport({
//     screenWidth: config.width,
//     screenHeight: config.height,
//     worldWidth: config.worldWidth,
//     worldHeight: config.worldHeight,
//
//     interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
// })
//
//
// // activate plugins
// viewport
//     .drag({wheel: false})
//     // .mouseEdges({radius: 500, right: 10})
//     .decelerate()

// add the viewport to the stage
// app.stage.addChild(viewport)

//Load an image and run the `setup` function when it's done
loader
    .add("images/atlas.json")
    .load(setup)
    .onComplete.add(start)



