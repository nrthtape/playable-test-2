import {getSpriteByConfig} from "./resourses.js";
import {game} from "./app.js";
import {cityGroup} from "./display.js";
import {scene} from "./camera.js";

let pump;

export function initCity(){

    pump = getSpriteByConfig({
        name: "pump",
        parent: scene,
        group: cityGroup,
        x: 1157,
        y: 2447,
        hitBox: {custom: true, x: 25, y: 130, width: 250, height: 200}
    });

    for (let i = 0; i < 500; i++){


        const sprite = getSpriteByConfig({
            name: "fish_cookie",
            parent: scene,
            group: cityGroup,
            score: 1
        });

        sprite.x += Math.random() * (game.worldWidth + sprite.width / 2);
        sprite.y += Math.random() * (game.worldHeight + sprite.height / 2);
    }

}