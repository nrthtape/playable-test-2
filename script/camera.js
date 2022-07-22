import {game, camera, scene} from "./app.js";
import {player} from "./player.js";

let cameraAngle = 0, cameraSpeed = 0, offsetX = 0, offsetY = 0;

export function cameraMove(delta){

    if (!camera.dragging){

        if (cameraSpeed > 0){

            cameraSpeed -= 0.15 * delta;
        }
        else{

            cameraSpeed = 0;
        }
    }

    if (cameraSpeed !== 0) {

        if (scene.x > game.worldWidth / 2 - player.cat.width * player.scale.x / 2) {

            offsetX = scene.x - game.worldWidth / 2 + player.cat.width * player.scale.x / 2;
        } else if (scene.x < game.worldWidth / 2 * -1 + player.cat.width * player.scale.x / 2) {

            offsetX = scene.x - game.worldWidth / 2 * -1 - player.cat.width * player.scale.x / 2;
        } else {
            offsetX = 0;
        }

        scene.x -= cameraSpeed * delta * Math.cos(cameraAngle) + offsetX;
        player.x += cameraSpeed * delta * Math.cos(cameraAngle) + offsetX;

        if (scene.y > game.worldHeight / 2 - player.cat.height * player.scale.y / 2) {

            offsetY = scene.y - game.worldHeight / 2 + player.cat.height * player.scale.y / 2;
        } else if (scene.y < game.worldHeight / 2 * -1 + player.cat.height * player.scale.y / 2) {

            offsetY = scene.y - game.worldHeight / 2 * -1 - player.cat.height * player.scale.y / 2;
        } else {
            offsetY = 0;
        }

        scene.y -= cameraSpeed * delta * Math.sin(cameraAngle) + offsetY;
        player.y += cameraSpeed * delta * Math.sin(cameraAngle) + offsetY;
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