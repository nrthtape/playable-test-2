import {app, Display, scene, tweenManager} from "./app.js";
import {resizeGame} from "./resize.js";
import {Layer, getSpriteByConfig} from "./resourses.js";

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

    // app.view.interactive = true;
    //
    // app.view.on("mouseover", function (){
    //
    //     app.view.on('pointerdown', function (data) {
    //         app.view.dragging = true;
    //         onPointerDown(data);
    //     });
    //
    //     app.view.on('pointermove', function (data) {
    //         if (app.view.dragging){
    //
    //             onPointerDown(data);
    //         }
    //     });
    //
    //     app.view.on('pointerup', function () {
    //         app.view.dragging = false;
    //     });
    // });

    // app.view.on("pointerup", function(e) {
    //     app.view.x = e.data.global.x;
    //     app.view.y = e.data.global.y;
    //     app.view.dragging = false;
    // })

    app.ticker.add(gameLoop);
}

let dist;

export function gameLoop(delta){

    // cat.x -= 10;
    // cat.y -= 10;

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

    const pos = data.getLocalPosition(app.view);
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
        // this.oldGroup = this.parentGroup;
        // this.parentGroup = dragGroup;
        this.dragging = true;

        // this.scale.x *= 1.1;
        // this.scale.y *= 1.1;
        this.dragPoint = event.data.getLocalPosition(this.parent);
        this.dragPoint.x -= this.x;
        this.dragPoint.y -= this.y;
    }
}

function onDragEnd() {
    if (this.dragging) {
        this.dragging = false;
        // this.parentGroup = this.oldGroup;
        // this.scale.x /= 1.1;
        // this.scale.y /= 1.1;
        // set the interaction data to null
        this.data = null;
    }
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - this.dragPoint.x;
        this.y = newPosition.y - this.dragPoint.y;
    }
}