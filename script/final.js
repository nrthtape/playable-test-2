import {addRect, addTween, getSpriteByConfig} from "./resourses.js";
import {uiGroup} from "./display.js";
import {app, game} from "./app.js";

export class Final extends PIXI.Container{
    constructor() {
        super();

        this.x = game.width / 2;
        this.y = 200;

        this._logo = getSpriteByConfig({
            name: "logo",
            parent: this,
            group: uiGroup,
            alpha: 0
        });

        this._logoText = getSpriteByConfig({
            name: "logo_text",
            parent: this,
            group: uiGroup,
            y: 175,
            alpha: 0
        });

        this._button = getSpriteByConfig({
            name: "button",
            parent: this,
            group: uiGroup,
            y: game.height - 500,
            alpha: 0
        });

        this._buttonMask = new PIXI.Graphics()
        this._buttonMask.beginFill(0xff0000, 1);
        this._buttonMask.drawRoundedRect(-260, -80, 520, 150, 200);
        this._buttonMask.endFill();
        this._button.addChild(this._buttonMask)

        this._buttonShine = getSpriteByConfig({
            name: "button_shine",
            parent: this._button,
            group: uiGroup,
            mask: this._buttonMask
        });

        addTween({
            sprite: this._buttonShine,
            from: {x: -750},
            to: {x: 750},
            time: 4000,
            loop: true
        })
    }

    show(){

        PIXI.sound.play("ok", {volume: 0.5});

        addTween({
            sprite: this._logo,
            from: {alpha: 1, width: this._logo.width / 0.75, height: this._logo.height / 0.75},
            to: {alpha: 1, width: this._logo.width, height: this._logo.height},
            easing: PIXI.tween.Easing.outElastic(0.5, 0.5),
            time: 1000
        })

        addTween({
            sprite: this._logoText,
            from: {alpha: 1, width: this._logoText.width / 0.75, height: this._logoText.height / 0.75},
            to: {alpha: 1, width: this._logoText.width, height: this._logoText.height},
            easing: PIXI.tween.Easing.outElastic(0.5, 0.5),
            time: 1000,
            delay: 250
        })

        addTween({
            sprite: this._button,
            from: {alpha: 1, width: this._button.width * 0.75, height: this._button.height * 0.75},
            to: {alpha: 1, width: this._button.width, height: this._button.height},
            easing: PIXI.tween.Easing.outElastic(0.5, 0.5),
            time: 1000,
            delay: 500
        })

        addTween({
            sprite: this._button,
            to: {width: this._button.width * 1.1, height: this._button.height * 1.1},
            time: 2000,
            delay: 1500,
            loop: true,
            cycle: true
        })
    };
}

export let final;

export function initFinal(){

    final = new Final();

    app.stage.addChild(final);
}
