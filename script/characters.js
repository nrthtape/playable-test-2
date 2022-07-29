import {addObjectByRandom, getRandomArbitrary} from "./city.js";
import {app, game} from "./app.js";
import {scene} from "./map.js";
import {addTween, getSpriteByConfig} from "./resourses.js";
import {cityGroup, uiGroup} from "./display.js";

export function initChars(){

    //fish_cookie

    addCharacter({
        name: "fish_cookie",
        score: 10,
        speed: getRandomArbitrary(3, 4),
        count: 100,
        flipW: true
    })

    //fish_yellow

    addCharacter({
        name: "fish_yellow",
        hitBox: {x: -30, width: -100, height: -80},
        score: 100,
        speed: getRandomArbitrary(1, 2),
        count: 5,
        flipW: true
    })

    //crab

    addCharacter({
        name: "crab",
        hitBox: {width: -100, height: -20},
        score: 25,
        flipW: true,
        speed: getRandomArbitrary(2,3),
        count: 20
    })

    //crabs

    addCharacter({
        name: "crab_evil",
        hitBox: {width: -100, height: -20},
        score: 30,
        flipW: true,
        speed: getRandomArbitrary(3,4),
        count: 10
    })

    //fish_orange

    addCharacter({
        name: "fish_orange",
        hitBox: {y: 30, width: -30, height: -60},
        score: 30,
        flipW: true,
        speed: getRandomArbitrary(3,4),
        count: 10
    })

    //diver

    addCharacter({
        name: "diver",
        hitBox: {y: 35, width: -100, height: -65},
        score: 100,
        flipW: true,
        speed: getRandomArbitrary(3,4),
        count: 2
    })

    for (let i = 0; i < scene.children.length; i++) {

        let char = scene.children[i];

        if (
            char.name === "crab" ||
            char.name === "crab_evil"
        ){
            char.tween = addTween({
                sprite: char,
                from: {angle: -2},
                to: {angle: 2},
                delay: i * char.speed,
                loop: true,
                cycle: true
            })
        }
    }
}

export function moveChars(delta){

    moveSprite({
        name: "fish_cookie",
        speed: {x: 2, y: 0}
    });

    moveSprite({
        name: "fish_yellow",
        speed: {x: 2, y: 0}
    });

    moveSprite({
        name: "crab",
        speed: {x: 1, y: 0}
    });

    moveSprite({
        name: "crab_evil",
        speed: {x: 1, y: 0}
    });

    moveSprite({
        name: "fish_orange",
        speed: {x: 0, y: 1}
    });

    moveSprite({
        name: "diver",
        speed: {x: 1, y: 0.2}
    });
}

function addCharacter(config){

    config = Object.assign({
        speed: 1,
        score: 1,
        count: 1,
        hitBox: {}
    }, config);

    addObjectByRandom({
        name: config.name,
        score: config.score,
        speed: config.speed,
        hitBox: config.hitBox,
        ignoreRoad: false,
        ignoreFood: false,
        count: config.count
    });

    if (config.flipW || config.flipH){

        for (let i = 0; i < scene.children.length; i++) {

            let char = scene.children[i];

            if (char.name === config.name) {

                char.counter = getRandomArbitrary(0, 10);

                if (config.tween){

                    config.tween.sprite = char;
                    char.tween = addTween(config.tween);
                }

                if (i % 2 === 0) {

                    if (config.flipW) {

                        char.flipW = true;
                    }
                    else if (config.flipH) {

                        char.flipH = true;
                    }
                }
            }
        }
    }
}

function moveSprite(config){

    config = Object.assign({
        speed: {x: 0, y: 0}
    }, config);


    let world = {
        x: (game.width - game.worldWidth) / 2,
        y: (game.height - game.worldHeight) / 2
    }

    let delta = app.ticker.deltaTime;

    for (let i = 0; i < scene.children.length; i++){

        let char = scene.children[i];

        if (char.name === config.name){

            if (!char.catched){

                if (!char.flipH){

                    if (config.speed > 0){

                        if (char.y > world.y){

                            char.y -= config.speed.y * char.speed * delta;
                        }
                        else{
                            char.y = game.worldHeight + world.y;
                        }
                    }
                    else{

                        if (char.y < - world.y + game.height){

                            char.y += config.speed.y * char.speed * delta;
                        }
                        else{
                            char.y = world.y;
                        }
                    }
                }
                else{

                    char.scale.y = -1;

                    if (config.speed > 0){

                        if (char.y < - world.y + game.height){

                            char.y += config.speed.y * char.speed * delta;
                        }
                        else{
                            char.y = world.y;
                        }
                    }
                    else{

                        if (char.y > world.y){

                            char.y -= config.speed.y * char.speed * delta;
                        }
                        else{
                            char.y = game.worldHeight + world.y;
                        }
                    }
                }

                if (!char.flipW){

                    if (char.x > world.x){

                        char.x -= config.speed.x * char.speed * delta;
                    }
                    else{
                        char.x = game.worldWidth + world.x;
                    }
                }
                else{

                    char.scale.x = -1;

                    if (char.x < - world.x + game.width){

                        char.x += config.speed.x * char.speed * delta;
                    }
                    else{
                        char.x = world.x;
                    }
                }
            }
            else{

                if (char.tween){

                    char.tween.stop();
                }
            }
        }
    }
}