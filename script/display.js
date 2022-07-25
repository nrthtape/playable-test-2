import {app, game} from "./app.js";

export let viewport

export let uiGroup, flyingGroup, cityGroup, playerGroup, bgGroup

export function initDisplay(){

    app.stage = new PIXI.display.Stage();

    app.stage.sortableChildren = true;

    viewport = new pixi_viewport.Viewport({
        screenWidth: game.width,
        screenHeight: game.height,
        worldWidth: game.worldWidth,
        worldHeight: game.worldHeight,
        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    app.stage.addChild(viewport);

    uiGroup = new PIXI.display.Group(2, false);
    app.stage.addChild(new PIXI.display.Layer(uiGroup));

    flyingGroup = new PIXI.display.Group(1, true);
    app.stage.addChild(new PIXI.display.Layer(flyingGroup));

    cityGroup = new PIXI.display.Group(0, (sprite) => {
        sprite.zOrder = sprite.y;
    });
    app.stage.addChild(new PIXI.display.Layer(cityGroup));

    playerGroup = new PIXI.display.Group(-1, false);
    app.stage.addChild(new PIXI.display.Layer(playerGroup));

    bgGroup = new PIXI.display.Group(-2, false);
    app.stage.addChild(new PIXI.display.Layer(bgGroup));
}


