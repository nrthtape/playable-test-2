import {app, game} from "./app.js";
import {player} from "./player.js";
import {bgGroup, viewport} from "./display.js";

let cameraAngle = 0,
    cameraSpeed = 0,
    offsetX = 0,
    offsetY = 0,
    maxDiff = 100

export let camera, scene, sceneRect, sceneMask;

export function initCamera(){

    scene = new PIXI.Container();

    sceneRect = new PIXI.Graphics();
    sceneRect.beginFill(0x4cc0cd);
    sceneRect.drawRect((game.width - game.worldWidth) / 2, (game.height - game.worldHeight) / 2, game.worldWidth, game.worldHeight);
    sceneRect.endFill();
    sceneRect.parentGroup = bgGroup;

    scene.addChild(sceneRect);
    viewport.addChild(scene);

    sceneMask = new PIXI.Graphics();
    sceneMask.beginFill(0x4cc0cd);
    sceneMask.drawRect((game.width - game.worldWidth) / 2, (game.height - game.worldHeight) / 2, game.worldWidth, game.worldHeight);
    sceneMask.endFill();

    scene.addChild(sceneMask);

    camera = new PIXI.Container();

    const cameraRect = new PIXI.Graphics();
    cameraRect.beginFill(0x4cc0cd);
    cameraRect.drawRect((game.width - game.worldWidth) / 2, (game.height - game.worldHeight) / 2, game.worldWidth, game.worldHeight);
    cameraRect.endFill();
    cameraRect.alpha = 0;

    camera.addChild(cameraRect);
    app.stage.addChild(camera);
}

export function cameraMove(delta){

    let speedFix = 1 + (player.scale.x - 1) / 2;

    if (!camera.dragging){

        if (cameraSpeed > 0){

            cameraSpeed -= 0.1 * delta;
        }
        else{

            cameraSpeed = 0;
        }
    }

    if (cameraSpeed !== 0) {

        let tempX = game.worldWidth / 2,
            tempY = game.worldHeight / 2

        if (scene.x > tempX) {

            offsetX = scene.x - tempX;
        }
        else if (scene.x < - tempX) {

            offsetX = scene.x + tempX;
        }
        else {
            offsetX = 0;
        }

        if (scene.y > tempY) {

            offsetY = scene.y - tempY;
        }
        else if (scene.y < - tempY) {

            offsetY = scene.y + tempY;
        }
        else {
            offsetY = 0;
        }

        let moveX = cameraSpeed * speedFix * delta * Math.cos(cameraAngle) + offsetX,
            moveY = cameraSpeed * speedFix * delta * Math.sin(cameraAngle) + offsetY

        scene.x += - moveX;
        scene.y += - moveY;

        player.x += moveX;
        player.y += moveY;
    }
}

// / === DRAG ZONE ===
export function subscribe(obj) {
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

        const xDiff = (newPosition.x - this.dragPoint.x);
        const yDiff = (newPosition.y - this.dragPoint.y);

        cameraAngle = Math.atan2(yDiff, xDiff);
        cameraSpeed = Math.min(maxDiff, Math.hypot(xDiff, yDiff)) / 10;

        // shift drag point
        this.dragPoint.x += cameraSpeed * Math.cos(cameraAngle) / 4;
        this.dragPoint.y += cameraSpeed * Math.sin(cameraAngle) / 4;

        // check position of drag point
        // this.addChild(
        //     new PIXI.Graphics()
        //         .beginFill(0xff0000, 1)
        //         .drawCircle(this.dragPoint.x, this.dragPoint.y, 10)
        //         .endFill()
        //
        // );
    }
}