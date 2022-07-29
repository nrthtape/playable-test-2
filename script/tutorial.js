import {addRect, addTween, getSpriteByConfig} from "./resourses.js";
import {app, game} from "./app.js";
import {uiGroup} from "./display.js";

export class Tutorial extends PIXI.Container {
    constructor() {
        super();

        this.bg = addRect({
            parent: this,
            group: uiGroup,
            width: game.worldWidth,
            height: game.worldHeight,
            color: "black",
            alpha: 0.5
        })

        this._text = getSpriteByConfig({
            name: "tutorial_text",
            parent: this,
            group: uiGroup,
            x: game.width / 2,
            y: game.height / 2 + 250
        });

        this._infinity = getSpriteByConfig({
            name: "infinity",
            parent: this,
            group: uiGroup,
            x: game.width / 2,
            y: game.height / 2 - 50
        });

        this._hand = getSpriteByConfig({
            name: "hand",
            parent: this,
            group: uiGroup,
            x: game.width / 2 + 50,
            y: game.height / 2 + 25
        });

        this._tweens = addTween({
            sprite: this._hand,
            to: {x: this._hand.x + 80, y: this._hand.y - 50},
            time: 200,
            easing: PIXI.tween.Easing.linear(),
            start: false
        });
    }

    show(){

        let hand = this._hand;

        // пикси твин пас не работает с 5 и 6 версиями пикси
        // так что пришлось изобретать костыли

        let t1 = this._tweens;

        let t2 = addTween({
            sprite: hand,
            to: {x: hand.x + 150, y: hand.y},
            time: 200,
            easing: PIXI.tween.Easing.linear(),
            start: false
        })

        let t3 = addTween({
            sprite: hand,
            to: {x: hand.x + 80, y: hand.y + 60},
            time: 200,
            easing: PIXI.tween.Easing.linear(),
            start: false
        })

        let t4 = addTween({
            sprite: hand,
            to: {x: hand.x, y: hand.y},
            time: 200,
            easing: PIXI.tween.Easing.linear(),
            start: false
        })

        let t5 = addTween({
            sprite: hand,
            to: {x: hand.x - 80, y: hand.y - 50},
            time: 200,
            easing: PIXI.tween.Easing.linear(),
            start: false
        })

        let t6 = addTween({
            sprite: hand,
            to: {x: hand.x - 150, y: hand.y},
            time: 200,
            easing: PIXI.tween.Easing.linear(),
            start: false
        })

        let t7 = addTween({
            sprite: hand,
            to: {x: hand.x - 80, y: hand.y + 60},
            time: 200,
            easing: PIXI.tween.Easing.linear(),
            start: false
        })

        let t8 = addTween({
            sprite: hand,
            to: {x: hand.x, y: hand.y},
            time: 200,
            easing: PIXI.tween.Easing.linear(),
            start: false
        })

        this._tweens.start();

        this._tweens.on("end", function () {

            t2.reset();
            t2.start();

            t2.on("end", function () {

                t3.reset();
                t3.start();

                t3.on("end", function () {

                    t4.reset();
                    t4.start();

                    t4.on("end", function () {

                        t5.reset();
                        t5.start();

                        // t5.reset();
                        // t5.start();
                        //
                        t5.on("end", function () {

                            t6.reset();
                            t6.start();

                            t6.on("end", function () {

                                t7.reset();
                                t7.start();

                                t7.on("end", function () {

                                    t8.reset();
                                    t8.start();

                                    t8.on("end", function () {

                                        tutorial._tweens.reset();
                                        tutorial._tweens.start();
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    end(){

        if (tutorial.visible){

            tutorial.visible = false;
            this._tweens.clear();
            // this.children.removeAll();
        }
    }
}

export let tutorial

export function initTutor(){

    tutorial = new Tutorial();

    tutorial.show();

    app.stage.addChild(tutorial)
}