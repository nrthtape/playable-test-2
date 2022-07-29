import {addRect, getSpriteByConfig} from "./resourses.js";
import {app, game} from "./app.js";
import {cityGroup} from "./display.js";
import {road, scene} from "./map.js";
import {rectIntersect} from "./start.js";

// добавляет все съедобные спрайты в сцену
export function initCity(){

    // ship
    addObject({
        name: "ship",
        score: 140,
        place: [
            {x: 332,y: 912},
            {x: 3489, y: 2313}
        ],
        hitBox: {custom: true, x: -25, y: 120, width: 500, height: 250}
    })

    // pump
    addObject({
        name: "pump",
        score: 80,
        place: [{x: 1157, y: 2447}],
        hitBox: {x: 0, y: 120, width: -30, height: -300}
    })

    // house_big
    addObject({
        name: "house_big",
        score: 300,
        place: [
            {x: 2676, y: 985},
            {x: 616, y: 2560},
            {x: 4056, y: 3224}
        ],
        hitBox: {x: 10, y: 270, width: -70, height: -600}
    })

    // house_orange
    addObject({
        name: "house_orange",
        score: 100,
        place: [
            {x: 1230, y: 2800},
            {x: 1640, y: 2800}
        ],
        hitBox: {x: 5, y: 100, width: -40, height: -250}
    })

    // house_violet
    addObject({
        name: "house_violet",
        score: 100,
        place: [
            {x: 2780, y: 1620}
        ],
        hitBox: {x: 10, y: 100, width: -30, height: -250}
    })

    // cafe_big
    addObject({
        name: "cafe_big",
        score: 160,
        place: [
            {x: 2250, y: 1560}
        ],
        hitBox: {x: 20, y: 140, width: -75, height: -285}
    })

    // cafe
    addObject({
        name: "cafe",
        score: 80,
        place: [
            {x: 1546, y: 1670},
            {x: 3745, y: 1370},
            {x: 4210, y: 1370}
        ],
        hitBox: {y: 75, width: -30, height: -150}
    })

    // garage
    addObject({
        name: "garage",
        score: 100,
        place: [
            {x: 560, y: 1585},
            {x: 3325, y: 2870}
        ],
        hitBox: {y: 40, width: -20, height: -190}
    })

    // table
    addObject({
        name: "table",
        score: 30,
        hitBox: {y: 20, height: -40},
        place: [
            {x: 1470, y: 1445},
            {x: 1470 + 200, y: 1445},
            {x: 1470 + 400, y: 1445},
            {x: 1470 + 400, y: 1445 + 200},
            {x: 3565, y: 1070},
            {x: 3565 + 200, y: 1070},
            {x: 3565 + 400, y: 1070},
            {x: 3565 + 600, y: 1070},
            {x: 3605, y: 1700},
            {x: 3605 + 200, y: 1700},
            {x: 3605 + 400, y: 1700},
            {x: 3605 + 600, y: 1700},
        ]
    })

    // car_yellow
    addObject({
        name: "car_yellow",
        score: 50,
        place: [
            {x: 1500, y: 775},
            {x: 1500 + 400, y: 775},
            {x: 1500, y: 2330},
            {x: 1500 + 400, y: 2330},
            {x: 1500, y: 775 + 240},
            {x: 1500 + 400, y: 775 + 240},
            {x: 1500, y: 2330 + 240},
            {x: 1500 + 400, y: 2330 + 240}
        ],
        hitBox: {y: -5, width: -75, height: -60}
    })

    // car_violet
    addObject({
        name: "car_violet",
        score: 50,
        place: [
            {x: 1500 + 200, y: 775},
            {x: 1500 + 200 + 400, y: 775},
            {x: 1500 + 200, y: 2330},
            {x: 1500 + 200 + 400, y: 2330},
            {x: 1500 + 200, y: 775 + 240},
            {x: 1500 + 200 + 400, y: 775 + 240},
            {x: 1500 + 200, y: 2330 + 240},
            {x: 1500 + 200 + 400, y: 2330 + 240}
        ],
        hitBox: {y: -5, width: -75, height: -60}
    })

    // stones
    addObject({
        name: "stones",
        score: 120,
        place: [
            {x: 2555, y: 2230},
            {x: 4040, y: 2240},
            {x: 3270, y: 530}
        ],
        hitBox: {x: - 40, y: 100, width: -100, height: -250}
    })

    // tube_flower
    addObject({
        name: "tube_flower",
        score: 80,
        place: [
            {x: 235, y: 2320}
        ],
        hitBox: {x: -10, y: 100, width: -30, height: -220}
    })

    // corail_blue
    addObject({
        name: "corail_blue",
        score: 30,
        place: [
            {x: 120, y: 2635},
            {x: 2410, y: 2915},
            {x: 3840, y: 2505}
        ],
        hitBox: {y: 30, width: -40, height: -60}
    })

    // corail_pink
    addObject({
        name: "corail_pink",
        score: 30,
        place: [
            {x: 200, y: 1665},
            {x: 1860, y: 1790}
        ],
        hitBox: {y: 30, width: -40, height: -60}
    })

    // grass_pink
    addObject({
        name: "grass_pink",
        hitBox: {x: -20, y: 85, width: -75, height: -240},
        score: 30,
        place: [
            {x: 1095, y: 2890},
            {x: 2395, y: 2170},
            {x: 2705, y: 2190},
            {x: 3880, y: 2240},
            {x: 4130, y: 1740}
        ]
    })

    // addObjectByRandom({
    //     name: "crystal",
    //     count: 100
    // });
    //
    // addObjectByRandom({
    //     name: "grass",
    //     hitBox: {custom: false, width: - 60, height: -160},
    //     count: 100
    // });

    // crystal
    addObject({
        name: "crystal",
        hitBox: {x: -5, y: 5, width: -20, height: -20},
        score: 10,
        place: [
            {x: 805, y: 1530},
            {x: 880, y: 1560},
            {x: 990, y: 1520},
            {x: 965, y: 1635},
            {x: 785, y: 1795},
            {x: 2565, y: 1835}
        ]
    })

    // grass
    addObject({
        name: "grass",
        hitBox: {y: 25, width: - 30, height: -160},
        score: 20,
        place: [
            {x: 110, y: 645},
            {x: 105, y: 790},
            {x: 100, y: 1255},
            {x: 250, y: 1190},
            {x: 400, y: 830},
            {x: 550, y: 825},
            {x: 605, y: 950},
            {x: 525, y: 670},
            {x: 720, y: 655},
            {x: 935, y: 665},
            {x: 920, y: 800},
            {x: 520, y: 1250, scale: 0.95},
            {x: 740, y: 1245, scale: 0.8},
            {x: 955, y: 1255, scale: 0.8},
            {x: 923, y: 1435, scale: 0.9},
            {x: 910, y: 1765, scale: 0.7},

            {x: 5, y: 2965},
            {x: 200, y: 2950},

            {x: 1500, y: 1270, scale: 0.8},
            {x: 1705, y: 1255, scale: 0.7},
            {x: 2005, y: 1270},
            {x: 2220, y: 1280},
            {x: 2975, y: 1800, scale: 0.7},

            {x: 2470, y: 2550},
            {x: 2655, y: 2545},
            {x: 2460, y: 2705},
            {x: 2070, y: 2960},
            {x: 2655, y: 2865},

            {x: 3560, y: 225},
            {x: 3765, y: 230},
            {x: 4000, y: 390},
            {x: 3570, y: 685},
            {x: 3780, y: 690},
            {x: 4185, y: 690},
            {x: 4360, y: 685, scale: 0.5},

            {x: 4340, y: 2250},
            {x: 4280, y: 2660},
            {x: 3240, y: 3405},
            {x: 3545, y: 3462},
            {x: 3275, y: 3260},
            {x: 3460, y: 3330},
            {x: 3465, y: 3190},
            {x: 3655, y: 3190},
            {x: 3720, y: 3025},
            {x: 3628, y: 2750},
            {x: 3630, y: 2880},
            {x: 3825, y: 2740},
            {x: 4040, y: 2745},
            {x: 4280, y: 2650},
        ]
    })

    // fence
    addFence({
        name: "fence_w",
        x: 1485,
        y: 520,
        hitBox: {y: 25, height: -50},
        length: 6
    })

    addFence({
        name: "fence_h",
        x: 2325,
        y: 750,
        hitBox: {height: -20},
        scale: 0.9,
        length: 3
    })

    addFence({
        name: "fence_w",
        x: 3535,
        y: 900,
        hitBox: {y: 25, height: -50},
        length: 5
    })

    addFence({
        name: "fence_h",
        x: 3400,
        y: 960,
        hitBox: {height: -20},
        scale: 0.9,
        length: 3
    })
}

// добавляет статичные спрайты
function addObject(config){

    config = Object.assign({
        place: "random",
        score: 1,
        hitBox: {custom: false},
        count: 1
    }, config);

    let count = config.count;

    if (config.place !== "random"){

        count = config.place.length;
    }

    for (let i = 0; i < count; i++){

        const sprite = getSpriteByConfig({
            name: config.name,
            parent: scene,
            group: cityGroup,
            score: config.score,
            hitBox: config.hitBox
        });

        if (config.place === "random"){

            sprite.x += Math.random() * (game.worldWidth - sprite.width) + sprite.width / 2;
            sprite.y += Math.random() * (game.worldHeight - sprite.height) + sprite.height / 2;
        }
        else{

            let tempScale;

            if (config.place[i].scale){

                sprite.scale.set(config.place[i].scale);
            }

            sprite.x += config.place[i].x;
            sprite.y += config.place[i].y;
        }
    }
}

// добавляет забор
function addFence(config){

    config = Object.assign({
        length: 1,
        y: 0,
        x: 0,
        scale: 1,
        hitBox: {}
    }, config);

    for (let i = 0; i < config.length; i++){

        let tile = getSpriteByConfig({
            name: config.name,
            score: 30,
            parent: scene,
            group: cityGroup,
            anchor: 0,
            scale: config.scale,
            hitBox: config.hitBox
        })

        tile.x += tile.hitBox.width / 2
        tile.y += tile.hitBox.height / 2
        tile.hitBox.scale.set(2 - config.scale)
        tile.hitBox.x += tile.width / 2 * (2 - config.scale)
        tile.hitBox.y += tile.height / 2 * (2 - config.scale)

        if (config.name === "fence_w"){

            // tile.hitBox.width = 150

            tile.mask = addRect({
                parent: tile,
                x: 0,
                y: 0,
                width: tile.width - 15,
                height: tile.height - 0
            });

            if (i === config.length - 1){

                tile.scale.x = config.scale * -1;
                tile.x += tile.width - 75
            }

            tile.x += (tile.width - 15) / 2 + config.x - tile.width * 2 + tile.width / 2;
            tile.x += (tile.width - 15) * i;

            tile.y += config.y - tile.height;
        }
        else{

            // tile.hitBox.height = 150

            tile.x += config.x - tile.width;

            tile.y += (tile.height - 45) / 2 + config.y - tile.height * 2 + tile.height / 2;
            tile.y += (tile.height - 45) * i;
        }
    }
}

// добавляет спрайт в случайном месте (генерация)
export function addObjectByRandom(config){

    config = Object.assign({
        score: 1,
        scale: 1,
        hitBox: {custom: false},
        count: 1,
        ignoreRoad: true,
        ignoreFood: true,
        speed: 1
    }, config);

    for (let n = 0; n < config.count; n++){

        let temp = false;
        let safe = 0;

        let point = {

            x: Math.random() * game.worldWidth,
            y: Math.random() * game.worldHeight
        }

        let offset = {
            x: (game.width - game.worldWidth) / 2,
            y: (game.height - game.worldHeight) / 2
        }

        let searchPoint = {
            x: point.x + offset.x,
            y: point.y + offset.y
        }

        if (config.ignoreRoad){

            for (let i = 0; i < road.children.length; i++){

                if (pointIntersect(searchPoint, road.children[i])){

                    temp = true;
                }
            }
        }

        if (config.ignoreFood){
            for (let i = 0; i < scene.children.length; i++) {

                if (scene.children[i].food) {

                    if (pointIntersect(searchPoint, scene.children[i])) {

                        temp = true;
                    }
                }
            }
        }

        if (!temp){

            let scale;

            if (config.scale === "random"){

                scale = getRandomArbitrary(0.5, 1)
            }
            else{

                scale = config.scale
            }

            let sprite = getSpriteByConfig({
                name: config.name,
                parent: scene,
                score: config.score,
                group: cityGroup,
                hitBox: config.hitBox,
                x: point.x,
                y: point.y,
                scale: scale,
                speed: config.speed
            })
        }
        else{

            if (safe < 10){

                config.count++
                safe++;
            }
        }
    }
}

function pointIntersect(point, rect){

    let box = rect.getBounds();

    return  point.x > box.x &&
        point.x < box.x + box.width &&
        point.y > box.y &&
        point.y < box.y + box.height;
}

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}