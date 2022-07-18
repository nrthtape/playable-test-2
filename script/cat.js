import {app, Sprite, resources, Container, scene} from "./app.js";
import {getSpriteByConfig} from "./resourses.js";

export class Cat extends PIXI.Sprite{
    constructor(texture)
    {
        super(texture);

        this.nickname = getSpriteByConfig({
            name: "nickname",
            parent: this,
            y: -150
        });
    }

        // this.atlas = resources["images/atlas.json"].textures;
        // this.sprite =
        // super(texture, x, y, scale, anchor, width, height);

        // this.nickname = getSpriteByConfig({name: "nickname"});
        // this.addChild(this.nickname);
    // }


}