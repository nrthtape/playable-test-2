import {addObjectByRandom} from "./city.js";
import {game} from "./app.js";
import {scene} from "./map.js";
import {addTween} from "./resourses.js";

export function initChars(){

    let temp = {
        x: (game.width - game.worldWidth) / 2,
        y: (game.height - game.worldHeight) / 2
    }

    //fish_cookie

    addObjectByRandom({
        name: "fish_cookie",
        score: 10,
        scale: 1,
        ignoreRoad: false,
        ignoreFood: false,
        count: 100
    });

    for (let i = 0; i < scene.children.length; i++){

        let char = scene.children[i];

        if (char.name === "fish_cookie"){

            console.log(temp.x - char.x);

            if (i % 2 === 0){

                char.flipW = true;
            }
        }
    }

    // for (let i = 0; i < scene.children.length; i++){
    //
    //     let char = scene.children[i];
    //
    //     if (char.name === "fish_cookie"){
    //
    //         addTween({
    //             sprite: char,
    //             to: {y: char.y - 50},
    //             time: (1000 * char.random) + 500,
    //             loop: true,
    //             cycle: true
    //         })
    //     }
    // }
}

export function moveChars(delta){

    let temp = {
        x: (game.width - game.worldWidth) / 2,
        y: (game.height - game.worldHeight) / 2
    }

    let counter = 0;

    for (let i = 0; i < scene.children.length; i++){

        let char = scene.children[i];

        if (char.name === "fish_cookie"){

            if (!char.flipW){

                if (char.x > temp.x){

                    char.x -= 3 * char.speed * delta;
                }
                else{
                    char.x = game.worldWidth + temp.x;
                }
            }
            else{

                // char.scale.x = -1;
                char.angle = 180;

                if (char.x < - temp.x + game.width){

                    char.x += 3 * char.speed * delta;
                }
                else{
                    char.x = temp.x;
                }
            }
        }
    }
}
