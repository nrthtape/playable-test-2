import {app, sceneRect, scene, camera} from "./app.js";
import {resizeGame} from "./resize.js";
import {getSpriteByConfig} from "./resourses.js";
import {Player} from "./player.js";
import {config} from "./config.js";
import {Bar} from "./bar.js";

//Declare variables for images
export let  player, playerSpeed,
            car, car_count,
            bar,
            style,
            grid,
            uiGroup, bgGroup, cityGroup, playerGroup


//Setup images and add them to stage
export function setup(){

    uiGroup = new PIXI.display.Group(1, true);
    playerGroup = new PIXI.display.Group(-1, true);
    bgGroup = new PIXI.display.Group(-2, true);
    cityGroup = new PIXI.display.Group(0, (sprite) => {
        sprite.zOrder = sprite.y;
    });

    sceneRect.parentGroup = bgGroup;

    player = new Player();
    scene.addChild(player);

    bar = new Bar();
    // bar.starsFill(5);
    // bar.starsJump(1);
    bar.progress(0);
    // bar.scale.set(5)

    app.stage.addChild(bar);

    car_count = 100;

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
            y: Math.random() * scene.height / 2,
            group: cityGroup
        });
    }

    app.stage.sortableChildren = true;
    app.stage.addChild(new PIXI.display.Layer(cityGroup));
    app.stage.addChild(new PIXI.display.Layer(uiGroup));
    app.stage.addChild(new PIXI.display.Layer(playerGroup));
    app.stage.addChild(new PIXI.display.Layer(bgGroup));
}

//This function will run when the image has loaded
export function start(){

    resizeGame();

    subscribe(camera);

    app.ticker.add(gameLoop);
}

let cameraAngle = 0, cameraSpeed = 0, offsetX = 0, offsetY = 0;

let playerSize = 1;

export function gameLoop(delta){

    bar.progress(Math.round(player.score));

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

        if (scene.x > config.worldWidth / 2 - player.cat.width / 2){

            offsetX = scene.x - config.worldWidth / 2 + player.cat.width / 2;
        }
        else if (scene.x < config.worldWidth / 2 * -1 + player.cat.width / 2){

            offsetX = scene.x - config.worldWidth / 2 * -1 - player.cat.width / 2;
        }
        else{
            offsetX = 0;
        }

        if (scene.y > config.worldHeight / 2 - player.cat.height / 2){

            offsetY = scene.y - config.worldHeight / 2 + player.cat.height / 2;
        }
        else if (scene.y < config.worldHeight / 2 * -1 + player.cat.height / 2){

            offsetY = scene.y - config.worldHeight / 2 * -1 - player.cat.height / 2;
        }
        else{
            offsetY = 0;
        }

        scene.x -= cameraSpeed / playerSize * delta * Math.cos(cameraAngle) + offsetX;
        scene.y -= cameraSpeed / playerSize * delta * Math.sin(cameraAngle) + offsetY;
        player.x += cameraSpeed * delta * Math.cos(cameraAngle) + offsetX;
        player.y += cameraSpeed * delta * Math.sin(cameraAngle) + offsetY;
    }

    scene.scale.set(1 / playerSize);
    player.scale.set(playerSize);

    // DINNER TIME
    for (let i = 0; i < scene.children.length; i++){

        let food = scene.children[i];

        if (food.food){

            if (rectIntersect(food, player.cat)){

                if (!food.catched){

                    food.catched = true;
                }
            }

            if (food.catched){

                food.catchTime += delta;

                player.eat(food);
            }
        }
    }

    PIXI.tweenManager.update();
}

window.onresize = function(){

    resizeGame();
}

// Check intersect between two objects
function rectIntersect(a, b){

    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return  aBox.x + aBox.width > bBox.x &&
            aBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height;
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
        //     new PIXI.Graphics()
        //         .beginFill(0xff0000, 1)
        //         .drawCircle(this.dragPoint.x, this.dragPoint.y, 10)
        //         .endFill()
        //
        // );
    }
}