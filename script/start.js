import {app, Display, scene, tweenManager} from "./app.js";
import {resizeGame} from "./resize.js";
import {Layer, getSpriteByConfig} from "./resourses.js";
import {config} from "./config.js";

//Declare variables for images
export let  cat,
            road_tile, road_tile_v


//Setup images and add them to stage
export function setup(){

    cat = getSpriteByConfig({name: "cat", parent: scene});

    road_tile = getSpriteByConfig({name: "road_tile", parent: scene, position: [200, 200]});
}

//This function will run when the image has loaded
export function start(){

    resizeGame();

    subscribe(scene);

    app.ticker.add(gameLoop);
}

let dist;

// let xSpeed = scene.x + 100 * dragAngle;
// let ySpeed = scene.y + 100 * dragAngle;

export function gameLoop(delta){

    if (dragSpeed !== 0){

        // if (scene.x > config.worldWidth / 2){
        //     dragSpeed = 0;
        // }
            scene.x -= dragSpeed * Math.cos(dragAngle);
            scene.y -= dragSpeed * Math.sin(dragAngle);
            cat.x += dragSpeed * Math.cos(dragAngle);
            cat.y += dragSpeed * Math.sin(dragAngle);
    }

    console.log(scene.x > config.worldWidth / 2);

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

    const pos = data.getLocalPosition(scene);
    console.log(pos);
}

// const dragGroup = new Display.Group(0, true);
// dragged objects has to processed after sorted, so we need a flag here too
// dragGroup.sortPriority = 1;
// app.stage.addChild(new Display.Layer(dragGroup));

// / === DRAG ZONE ===
function subscribe(obj) {
    obj.interactive = true;
    obj.on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
}

let dragAngle = 0, dragSpeed = 0;

function onDragStart(event) {

    if (!this.dragging) {

        this.data = event.data;
        this.dragging = true;
        this.dragPoint = event.data.getLocalPosition(this.parent);

        dragSpeed = 0;
        dragAngle = 0;
    }
}

function onDragEnd() {

    if (this.dragging) {

        this.dragging = false;
        this.data = null;

        dragSpeed = 0;
        dragAngle = 0;
    }
}

function onDragMove() {
    if (this.dragging) {

        const newPosition = this.data.getLocalPosition(this.parent);
        const maxDiff = 10;
        const xDiff = (newPosition.x - this.dragPoint.x);
        const yDiff = (newPosition.y - this.dragPoint.y);

        dragAngle = Math.atan2(yDiff, xDiff);
        dragSpeed = Math.min(maxDiff, Math.hypot(xDiff, yDiff));
    }
}