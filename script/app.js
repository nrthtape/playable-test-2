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
                tweenManager = PIXI.tweenManager,
                Easing = PIXI.tween.Easing


export let app, viewport;

window.onload = function(){

    //Create a Pixi Application
    app = new Application({
        width: config.width,             // default: 800
        height: config.height,            // default: 600
        antialias: true,                // default: false
        transparent: false,             // default: false
        roundPixels: true,
        resolution: 1,
        backgroundColor: 0x4cc0cd,
        autoResize: true
    });

    app.view.id = 'pixi-canvas';

    //Add the canvas that Pixi automatically created for you to the HTML document
    config.element.appendChild(app.view);

    const scene = new Container();

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
}



