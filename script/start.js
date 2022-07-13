import {app, viewport, tweenManager, Container} from "./app.js";
import {resizeGame} from "./resize.js";
import {Layer, getSpriteByConfig} from "./resourses.js";

// app.stage.addChild(city);

//Declare variables for images
export let  cat,
            road_tile, road_tile_v

//Setup images and add them to stage
export function setup(){

    cat = getSpriteByConfig({name: "cat"});

    road_tile = getSpriteByConfig({name: "road_tile", position: [200, 200]});
}

//This function will run when the image has loaded
export function start(){

    resizeGame();

    app.stage.interactive = true;

    app.stage.on("pointerdown", function(e){
        app.stage.x = e.data.global.x;
        app.stage.y = e.data.global.y;
        app.stage.dragging = true;

    })

    app.stage.on("pointermove", function(e){
        if (app.stage.dragging) {
            app.stage.x = e.data.global.x;
            app.stage.y = e.data.global.y;
        }
    })

    app.stage.on("pointerup", function(e) {
        app.stage.x = e.data.global.x;
        app.stage.y = e.data.global.y;
        app.stage.dragging = false;
    })

    app.ticker.add(gameLoop);
}

let dist;

export function gameLoop(delta){

    // cat.x -= 10;
    // cat.y -= 10;

    if (rectIntersect(road_tile, cat)){

        // vacuum(road_tile, cat).start();
    }

    tweenManager.update();
}

window.onresize = function(){

    resizeGame();
}

function rectIntersect(a, b){

    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return  aBox.x + 100 + aBox.width > bBox.x &&
            aBox.x + 100 < bBox.x + bBox.width &&
            aBox.y + 100 + aBox.height > bBox.y &&
            aBox.y + 100 < bBox.y + bBox.height;
}

function getWorldPosition(layer){

    let x = layer.getBounds().x;
    let y = layer.getBounds().y;

    return [x, y];
}

function vacuum(source, target){

    const   vacuum = tweenManager.createTween(source);

            vacuum.to({x: target.x, y: target.y, width: source.width - source.width, height: source.height - source.height});
            vacuum.time = 300;
            // vacuum.to({width: source.width - source.width, height: source.height - source.height});

    return vacuum;
}

const onPointerDown = ({data}) => {

    const pos = data.getLocalPosition(app.stage);
    console.log(pos);
}