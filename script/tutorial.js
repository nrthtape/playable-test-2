import {addRect} from "./resourses.js";
import {app, game} from "./app.js";
import {uiGroup} from "./display.js";

let tutorBg

export function initTutor(){

    tutorBg = addRect({
        parent: app.stage,
        group: uiGroup,
        width: game.worldWidth,
        height: game.worldHeight,
        color: "black",
        alpha: 0.5
    })
}