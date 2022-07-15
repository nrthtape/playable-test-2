import {app, sceneRect, Graphics, Display, scene, camera, tweenManager} from "./app.js";
import {resizeGame} from "./resize.js";
import {Layer, getSpriteByConfig} from "./resourses.js";
import {config} from "./config.js";

//Declare variables for images
export let  cat, catSpeed,
            road_tile

//Setup images and add them to stage
export function setup(){

    cat = getSpriteByConfig({name: "cat", parent: scene});

    road_tile = getSpriteByConfig({name: "road_tile", parent: scene, position: [200, 200]});

    catSpeed = new PIXI.Text('Basic text in pixi');
    catSpeed.x = 0;
    catSpeed.y = 150;
    catSpeed.anchor.set(0.5)
    catSpeed.scale.set(3)

    cat.addChild(catSpeed);
}

//This function will run when the image has loaded
export function start(){

    resizeGame();

    subscribe(camera);

    app.ticker.add(gameLoop);
}

let cameraAngle = 0, cameraSpeed = 0, offsetX = 0, offsetY = 0;

export function gameLoop(delta){

    catSpeed.text = Math.round(cameraSpeed);

    if (!camera.dragging){

        if (cameraSpeed > 0){

            cameraSpeed -= 0.15;
        }
        else{

            cameraSpeed = 0;
        }
    }

    if (cameraSpeed !== 0){

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

        scene.x -= cameraSpeed * Math.cos(cameraAngle) + offsetX;
        scene.y -= cameraSpeed * Math.sin(cameraAngle) + offsetY;
        cat.x += cameraSpeed * Math.cos(cameraAngle) + offsetX;
        cat.y += cameraSpeed * Math.sin(cameraAngle) + offsetY;
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

    if (dist < 300){

        if (source.scale.x > 0.1){

            source.angle += 5 / 300 * (300 - dist);
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

        // cameraSpeed = 0;
        // cameraAngle = 0;
    }
}

function onDragEnd() {

    if (this.dragging) {

        this.dragging = false;
        this.data = null;

        // cameraSpeed = 0;
        // cameraAngle = 0;
    }
}

function onDragMove() {
    if (this.dragging) {

        const newPosition = this.data.getLocalPosition(this.parent);
        const maxDiff = 50;
        const xDiff = (newPosition.x - this.dragPoint.x);
        const yDiff = (newPosition.y - this.dragPoint.y);

        cameraAngle = Math.atan2(yDiff, xDiff);
        cameraSpeed = Math.min(maxDiff, Math.hypot(xDiff, yDiff)) / 5;

        // Смещение точки нажатия для более удобного управления
        this.dragPoint.x += cameraSpeed * Math.cos(cameraAngle) / 3;
        this.dragPoint.y += cameraSpeed * Math.sin(cameraAngle) / 3;

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