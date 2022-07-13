import {app, viewport} from "./app.js";
import {resizeGame} from "./resize.js";
import {getSpriteByConfig, getSpriteByName} from "./resourses.js";

//Declare variables for images
let cat;

//This function will run when the image has loaded
export function start(){

    cat = new Layer({name: "cat"})

    // cat.move();

    resizeGame();

    app.ticker.add(gameLoop);
}

export function gameLoop(delta){

    // resizeGame();
}

window.onresize = function(){

    resizeGame();
}

export class Layer {

    constructor(config){

        this.sprite = getSpriteByConfig(config);

        this.x = this.sprite.position.x;
    }

    move(){

        const sprite = this.sprite;

        const w = app.view.width;
        const h = app.view.height;

        // sprite.x = w / 2;
    }
}