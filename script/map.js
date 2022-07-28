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
        parent: scene
    })

    road = new PIXI.Container();
    road.parentGroup = bgGroup;
    road.mask = sceneMask;
    road.x += (game.width - game.worldWidth) / 2;
    road.y += (game.height - game.worldHeight) / 2;

    scene.addChild(road);

    // parking 1
    addRoad({w: 2.6, h: 1.8, angle: 90, x: 1335, y: 1020});

    // parking 2
    addRoad({w: 2.6, h: 1.8, angle: 90, x: 1335, y: 2580});

    // vertical
    addRoad({h: 6, angle: 0, x: 1180});
    addRoad({h: 6, angle: 0, x: 3200});
    addRoad({h: 3, angle: 0, x: 2850, y: 2050});

    // horizontal
    addRoad({w: 13, angle: 90, y: 2050});
    addRoad({w: 8.3, angle: 90, y: 3200});
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

function addRoad(config){

    config = Object.assign({
        y: 0,
        x: 0,
        w: 1,
        h: 1,
        angle: 0
    }, config);

    let tile = getSpriteByConfig({
        name: "road",
        // anchor: 1,
        x: config.x,
        y: config.y,
        angle: config.angle,
        parent: road,
        food: false,
        type: PIXI.TilingSprite
    })

    tile.width = tile.texture.width
    tile.height = tile.texture.height

    if (config.angle === 0){

        tile.width *= config.w
        tile.height *= config.h
        tile.y += tile.height / 2
    }
    else if (config.angle === 90){

        tile.width *= config.h
        tile.height *= config.w
        tile.x += tile.height / 2
        tile.y -= tile.texture.width * (config.h - 1) / 2
    }
}