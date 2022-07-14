import {app, sceneRect, Graphics, Display, scene, camera, tweenManager} from "./app.js";
import {resizeGame} from "./resize.js";
import {Layer, getSpriteByConfig} from "./resourses.js";
import {config} from "./config.js";

//Declare variables for images
export let  cat, catTween, catMask,
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

    // console.log(cat === cat);
    for (let i = 0; i < scene.children.length; i++){

        if (scene.children[i] !== cat && scene.children[i] !== sceneRect){

            if (rectIntersect(scene.children[i], cat)){

                vacuum(scene.children[i], cat);
            }
        }
    }

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

function vacuum(source, target){;

    let speed = 0.05;

    let dist = getDistance(source, {x: target.x, y: target.y + 10});

    source.x = lerp(source.x, target.x, speed);
    source.y = lerp(source.y, target.y + 10, speed);

    console.log(source.scale);

    if (dist < 300){

        if (source.scale.x > 0.1){

            source.scale.set(1 / 300 * dist);
        }
        else{

            source.parent.removeChild(source);
            // source.visible = false;
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
        const maxDiff = 300;
        const xDiff = (newPosition.x - this.dragPoint.x);
        const yDiff = (newPosition.y - this.dragPoint.y);

        dragAngle = Math.atan2(yDiff, xDiff);
        dragSpeed = Math.min(maxDiff, Math.hypot(xDiff, yDiff)) / 30;

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