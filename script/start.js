import {app, Display, scene, camera, tweenManager} from "./app.js";
import {resizeGame} from "./resize.js";
import {Layer, getSpriteByConfig} from "./resourses.js";
import {config} from "./config.js";

//Declare variables for images
export let  cat,
            road_tile


//Setup images and add them to stage
export function setup(){

    cat = getSpriteByConfig({name: "cat", parent: scene});

    road_tile = getSpriteByConfig({name: "road_tile", parent: scene, position: [200, 200]});
}

//This function will run when the image has loaded
export function start(){

    resizeGame();

    subscribe(camera);

    app.ticker.add(gameLoop);
}

let dist;

let dragAngle = 0, dragSpeed = 0, offsetX = 0, offsetY = 0;

export function gameLoop(delta){

    if (dragSpeed !== 0){

        if (scene.x > config.worldWidth / 2){

            offsetX = scene.x - config.worldWidth / 2;
        }
        else if (scene.x < config.worldWidth / 2 * -1){

            offsetX = scene.x - config.worldWidth / 2 * -1;
        }
        else{
            offsetX = 0;
        }

        if (scene.y > config.worldHeight / 2){

            offsetY = scene.y - config.worldHeight / 2;
        }
        else if (scene.y < config.worldHeight / 2 * -1){

            offsetY = scene.y - config.worldHeight / 2 * -1;
        }
        else{
            offsetY = 0;
        }

        console.log(cat.x);

        scene.x -= dragSpeed * Math.cos(dragAngle) + offsetX;
        scene.y -= dragSpeed * Math.sin(dragAngle) + offsetY;
        cat.x += dragSpeed * Math.cos(dragAngle) + offsetX;
        cat.y += dragSpeed * Math.sin(dragAngle) + offsetY;
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