import {app} from "./app";
import {getSpriteByConfig, getSpriteByName} from "./resourses.js";

export class Layer {
    constructor(config){

        this.config = config;
    }

    draw(){
        getSpriteByConfig(this.config);
    }
}

const cat = new Layer({name: "cat"});

cat.draw();