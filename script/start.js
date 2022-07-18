import {app, Group, Layer, sceneRect, resources, Sprite, Graphics, scene, camera, tweenManager, TextStyle} from "./app.js";
import {resizeGame} from "./resize.js";
import {getSpriteByConfig} from "./resourses.js";
import {Cat} from "./cat.js";
import {config} from "./config.js";

//Declare variables for images
export let  cat, catSpeed,
            car, car_count,
            fpsCounter,
            style,
            grid

const ui = new PIXI.display.Group(0, true);
const city = new PIXI.display.Group(1, ((sprite) => {
    // blue bunnies go up
    sprite.zOrder = sprite.y;
}));

//Setup images and add them to stage
export function setup(){

    cat = getSpriteByConfig({
        name: "cat",
        parent: scene,
        x: app.view.width / 2,
        y: app.view.height / 2,
        type: Cat
    });

    cat.parentGroup = ui;

    car_count = 300;

    for (let i = 0; i < car_count; i++){

        let name, sprite;

        if (Math.random() > 0.5){
            name = "car_yellow";
        }
        else{
            name = "car_violet";
        }

        sprite = getSpriteByConfig({
            name: name,
            parent: scene,
            x: Math.random() * scene.width / 2,
            y: Math.random() * scene.height / 2
        });

        sprite.parentGroup = city;

        sprite.catched = false;
        sprite.catchTime = 0;
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

let count = 0;

export function gameLoop(delta){

    // catSpeed.text = "Cars: " + Math.round(count);
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

        let car = scene.children[i];

        if (car !== cat &&
            car !== sceneRect
        ){

            if (rectIntersect(car, cat)){

                if (!car.catched){

                    car.catched = true;
                }
            }
        }
    }

    for (let i = 0; i < scene.children.length; i++){

        let car = scene.children[i];

        if (car !== cat &&
            car !== sceneRect
        ){

            if (car.catched){

                car.catchTime += delta;

                let speed = 0.01 * car.catchTime;

                goStomach(car, cat, speed);
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

function goStomach(source, target, speed){

    const delta = app.ticker.deltaTime;

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
            source.catchTime = 0;
            count++;
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
    }
}

function onDragEnd() {

    if (this.dragging) {

        this.dragging = false;
        this.data = null;
    }
}

function onDragMove() {
    if (this.dragging) {

        const newPosition = this.data.getLocalPosition(this.parent);
        const maxDiff = 100;
        const xDiff = (newPosition.x - this.dragPoint.x);
        const yDiff = (newPosition.y - this.dragPoint.y);

        cameraAngle = Math.atan2(yDiff, xDiff);
        cameraSpeed = Math.min(maxDiff, Math.hypot(xDiff, yDiff)) / 10;

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