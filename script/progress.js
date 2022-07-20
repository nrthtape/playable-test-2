import {app} from "./app.js";
import {getSpriteByConfig} from "./resourses.js";
import {uiGroup} from "./start.js";

export class Progress extends PIXI.Container{

    constructor(x, y){

        super();

        this.x = app.view.width / 2;
        this.y = app.view.height / 2;

    }


}