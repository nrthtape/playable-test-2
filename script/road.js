import {getSpriteByConfig} from "./resourses.js";
import {app, game, scene} from "./app.js";
import {bgGroup} from "./start.js";
import {player} from "./player.js";

export function initRoad(){

    // vertical
    buildRoad({length: 6, angle: 0, x: 1180});
    buildRoad({length: 6, angle: 0, x: 3200});
    buildRoad({length: 3, angle: 0, x: 2850, y: 2050});

    // parking
    buildRoad({length: 2, angle: 90, x: 1500, y: 2550});
    buildRoad({length: 2, angle: 90, x: 1500, y: 2300});

    // horizontal
    buildRoad({length: 12, angle: 90, y: 2050});
    buildRoad({length: 9, angle: 90, x: -250, y: 3200});

}

function buildRoad(config){

    config = Object.assign({
        length: 1,
        y: 0,
        x: 0,
        angle: 0
    }, config);

    for (let i = 0; i < config.length; i++){

        let tile = getSpriteByConfig({name: "road_tile", food: false, parent: scene, group: bgGroup})

        tile.angle = config.angle;

        if (tile.angle === 0){

            tile.x += config.x;

            tile.y += tile.height / 2 + config.y;
            tile.y += (tile.height) * i;
        }
        else{

            tile.x += tile.height / 2 + config.x;
            tile.x += (tile.height) * i;

            tile.y += config.y;
        }
    }
}