import {app, sceneRect, resources, Sprite, Graphics, Display, scene, camera, tweenManager, TextStyle} from "./app.js";
import {resizeGame} from "./resize.js";
import {Layer, getSpriteByConfig} from "./resourses.js";
import {config} from "./config.js";

//Declare variables for images
export let  cat, catSpeed,
            car, car_count,
            fpsCounter,
            style,
            grid

//Setup images and add them to stage
export function setup(){

    cat = getSpriteByConfig({name: "cat", parent: scene});

    car_count = 100;

    for (let i = 0; i < car_count; i++){

        let sprite;

        if (Math.random() > 0.5){
            sprite = "car_yellow";
        }
        else{
            sprite = "car_violet";
        }

        getSpriteByConfig({name: sprite, parent: scene, position: [Math.random() * scene.width / 2, Math.random() * scene.height / 2]});

    }

    style = new TextStyle({
        fill: ['#ffff00'],
        stroke: '#004620',
        strokeThickness: 3
    });

    catSpeed = new PIXI.Text("catSpeed", style);
    catSpeed.x = 0;
    catSpeed.y = 150;
    catSpeed.anchor.set(0.5)
    catSpeed.scale.set(2)

    cat.addChild(catSpeed);

    fpsCounter = new PIXI.Text("fpsCounter", style);
    fpsCounter.x = 10;
    fpsCounter.y = 0;
    fpsCounter.scale.set(2)

    app.stage.addChild(fpsCounter);
}

//This function will run when the image has loaded
export function start(){

    resizeGame();

    subscribe(camera);

    // app.ticker.maxFPS = 30;
    app.ticker.add(gameLoop);
}

let cameraAngle = 0, cameraSpeed = 0, offsetX = 0, offsetY = 0;

export function gameLoop(delta){

    catSpeed.text = "Speed: " + Math.round(cameraSpeed);
    fpsCounter.text = "FPS: " + Math.round(app.ticker.FPS);

    //camera function?

    if (!camera.dragging){

        if (cameraSpeed > 0){

            cameraSpeed -= 0.15 * delta;
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

        scene.x -= cameraSpeed * delta * Math.cos(cameraAngle) + offsetX;
        scene.y -= cameraSpeed * delta * Math.sin(cameraAngle) + offsetY;
        cat.x += cameraSpeed * delta * Math.cos(cameraAngle) + offsetX;
        cat.y += cameraSpeed * delta * Math.sin(cameraAngle) + offsetY;
    }

    // dinner time!
    for (let i = 0; i < scene.children.length; i++){

        if (scene.children[i] !== cat &&
            scene.children[i] !== sceneRect
        ){

            if (rectIntersect(scene.children[i], cat)){

                goStomach(scene.children[i], cat, delta);
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

function goStomach(source, target, delta){;

    let speed = 0.05;

    let dist = getDistance(source, {x: target.x, y: target.y + 10});

    source.x = lerp(source.x, target.x, speed * delta);
    source.y = lerp(source.y, target.y + 10, speed * delta);

    let minDist = 300;

    if (dist < minDist){

        if (source.scale.x > 0.1){

            source.angle += 5 / minDist * (minDist - dist) * delta;
            source.scale.set(1 / minDist * dist);
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
        const maxDiff = 300;
        const xDiff = (newPosition.x - this.dragPoint.x);
        const yDiff = (newPosition.y - this.dragPoint.y);

        cameraAngle = Math.atan2(yDiff, xDiff);
        cameraSpeed = Math.min(maxDiff, Math.hypot(xDiff, yDiff)) / 30;

        // Смещение точки нажатия для более удобного управления
        this.dragPoint.x += cameraSpeed * Math.cos(cameraAngle) / 4;
        this.dragPoint.y += cameraSpeed * Math.sin(cameraAngle) / 4;

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