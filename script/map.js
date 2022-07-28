import {addRect, getSpriteByConfig} from "./resourses.js";
import {bgGroup, viewport} from "./display.js";
import {game} from "./app.js";

export let road, scene, sceneRect, sceneMask

export function initMap(){

    scene = new PIXI.Container();

    viewport.addChild(scene);

    sceneRect = addRect({
        x: (game.width - game.worldWidth) / 2,
        y: (game.height - game.worldHeight) / 2,
        width: game.worldWidth,
        height: game.worldHeight,
        color: 0x4cc0cd,
        group: bgGroup,
        parent: scene
    })

    sceneMask = addRect({
        x: (game.width - game.worldWidth) / 2,
        y: (game.height - game.worldHeight) / 2,
        width: game.worldWidth,
        height: game.worldHeight,
        color: 0x4cc0cd,
        parent: scene,
        visible: false
    })

    road = new PIXI.Container();
    road.parentGroup = bgGroup;
    road.mask = sceneMask;
    road.x += (game.width - game.worldWidth) / 2;
    road.y += (game.height - game.worldHeight) / 2;

    scene.addChild(road);

    // parking 1
    buildRoad({length: 3, angle: 90, w: 50, h: 50, x: 1300, y: 770 + 250});
    buildRoad({length: 3, angle: 90, w: 50, h: 50, x: 1300, y: 770});

    // parking 2
    buildRoad({length: 3, angle: 90, w: 50, h: 60, x: 1350, y: 2330 + 250});
    buildRoad({length: 3, angle: 90, w: 50, h: 60, x: 1350, y: 2330});

    // vertical
    buildRoad({length: 6, angle: 0, x: 1180});
    buildRoad({length: 6, angle: 0, x: 3200});
    buildRoad({length: 3, angle: 0, x: 2850, y: 2050});

    // horizontal
    buildRoad({length: 13, angle: 90, y: 2050});
    buildRoad({length: 9, angle: 90, x: -210, y: 3200});
}

function buildRoad(config){

    config = Object.assign({
        length: 1,
        y: 0,
        x: 0,
        w: 0,
        h: 5,
        angle: 0
    }, config);

    for (let i = 0; i < config.length; i++){

        let tile = getSpriteByConfig({
            name: "road",
            parent: road,
            food: false
        })

        tile.mask = addRect({
            parent: tile,
            x: - (tile.width - config.w) / 2,
            y: - (tile.height - config.h) / 2,
            width: tile.width - config.w,
            height: tile.height - config.h
        });

        tile.angle = config.angle;

        if (tile.angle === 0){

            tile.x += config.x;

            tile.y += (tile.height - config.h) / 2 + config.y;
            tile.y += (tile.height - config.h) * i;
        }
        else{

            tile.x += (tile.height - config.h) / 2 + config.x;
            tile.x += (tile.height - config.h) * i;

            tile.y += config.y;
        }
    }
}