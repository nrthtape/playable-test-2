import {app, Graphics, Display, scene, camera, tweenManager} from "./app.js";
import {resizeGame} from "./resize.js";
import {Layer, getSpriteByConfig} from "./resourses.js";
import {config} from "./config.js";

//Declare variables for images
export let  cat, catTween, catMask,
            road_tile


//Setup images and add them to stage
export function setup(){

    cat = getSpriteByConfig({name: "cat", parent: scene});

    catMask = new Graphics()
        .beginFill(0xff0000, 1)
        // .drawRoundedRect(-80, -60, 160, 100, 100)
        .drawCircle(0, -15, 60)
        .endFill()
    catMask.width *= 1.5;
    catMask.visible = false;
    cat.addChild(catMask);

    road_tile = getSpriteByConfig({name: "road_tile", parent: scene, position: [200, 200]});
}

//This function will run when the image has loaded
export function start(){

    resizeGame();

    subscribe(camera);

    app.ticker.add(gameLoop);
}

let dist;

let trigger = false;

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

        scene.x -= dragSpeed * Math.cos(dragAngle) + offsetX;
        scene.y -= dragSpeed * Math.sin(dragAngle) + offsetY;
        cat.x += dragSpeed * Math.cos(dragAngle) + offsetX;
        cat.y += dragSpeed * Math.sin(dragAngle) + offsetY;
    }

    // console.log(scene.x > config.worldWidth / 2);


    vacuum(road_tile, cat, 500);

    tweenManager.update();
}

window.onresize = function(){

    resizeGame();
}

// Проверка, пересекаются ли объекты
function rectIntersect(a, b){

    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return  aBox.x + aBox.width > bBox.x &&
            aBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height;
}

// Get distance between two points
function getDistance(p1, p2) {

    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

function vacuum(source, target, trigger){;

    let speed = 0;

    let dist = getDistance(source, target);

    if (dist < trigger) {

        speed = 0.01

        if (rectIntersect(source, target)){

            // target.children[0].visible = true;
            // source.mask = target.children[0];
            speed = 0.25
        }
    }

    source.x = lerp(source.x, target.x, speed);
    source.y = lerp(source.y, target.y + 10, speed);

    if (rectIntersect(source, target)){

        if (source.width > 0){


            source.width -= source.width / 10;
            source.height -= source.height / 10;
        }
        else{

            // source.parent.removeChild(source);
            source.visible = false;
        }
    }
}

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

        // Смещение точки нажатия для более удобного управления
        this.dragPoint.x += dragSpeed * Math.cos(dragAngle) / 2;
        this.dragPoint.y += dragSpeed * Math.sin(dragAngle) / 2;

        // Проверка смещения точки нажатия
        // this.addChild(
        //     new Graphics()
        //         .beginFill(0xff0000, 1)
        //         .drawCircle(this.dragPoint.x, this.dragPoint.y, 10)
        //         .endFill()
        //
        // );
    }
}

function lerp(a, b, n) {
    return (1 - n) * a + n * b;
}