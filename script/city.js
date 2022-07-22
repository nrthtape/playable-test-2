import {getSpriteByConfig} from "./resourses.js";
import {scene} from "./app.js";
import {cityGroup} from "./start.js";

let pump;

export function initCity(){

    pump = getSpriteByConfig({name: "pump", parent: scene, group: cityGroup, x: 1157, y: 2447});

}