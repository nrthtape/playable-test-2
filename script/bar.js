import {app} from "./app.js";
import {getSpriteByConfig} from "./resourses.js";
import {uiGroup} from "./start.js";

export class Bar extends PIXI.Container{

    constructor(){

        super();

        this.x = 300;
        this.y = 180;

        this._panel = getSpriteByConfig({
            name: "bar_panel",
            parent: this,
            group: uiGroup
        });

        this._empty = getSpriteByConfig({
            name: "bar_empty",
            parent: this,
            group: uiGroup
        });

        this._empty.filters = [new PIXI.filters.OutlineFilter(
            1,
            0xb76624
        )];

        this._mask = getSpriteByConfig({
            name: "bar_empty",
            parent: this,
            group: uiGroup
        });

        this._fill = getSpriteByConfig({
            name: "bar_fill",
            parent: this,
            mask: this._mask,
            group: uiGroup
        });

        this._percents = new PIXI.Text("80%",
            new PIXI.TextStyle({
                fill: "white",
                fontFamily: "fishdom",
                fontSize: 70,
                stroke: "#0c3278",
                strokeThickness: 5
            })
        );
        this._percents.anchor.set(0.5);
        this._percents.parentGroup = uiGroup;
        this.addChild(this._percents);

        this._stars = new PIXI.Container();
        this._stars.y = -85;
        this._stars.showed = false;
        this.addChild(this._stars);

        for (let i = 0; i < 5; i++){

            getSpriteByConfig({
                name: "star_empty",
                parent: this._stars,
                group: uiGroup,
                x: -160 + 80 * i
            });
        }
    }

    get getStarsCount(){

        return this._stars.children.length;
    }

    get getValue(){

        return this._percents.text.split("%")[0];
    }

    fillStars(count){

        let texture;

        for (let i = 0; i < 5; i++){

            const atlas = PIXI.Loader.shared.resources["atlas"].textures;

            if (i < count){

                texture = atlas["star_glow.png"];
            }
            else{

                texture = atlas["star_empty.png"];
            }

            this._stars.children[i].texture = texture;
        }
    }

    blinkStar(n){

        const star = this._stars.children[n - 1];

        star.filters = [outlineFilter];

        const tween = PIXI.tweenManager.createTween(star);

        tween.from({width: star.width * 1.5, height: star.height * 1.5});
        tween.to({width: star.width, height: star.height});
        tween.time = 1500;
        tween.easing = PIXI.tween.Easing.outElastic(0.4, 0.5);
        tween.start();
        tween.on("end", function(){
            tween.stop().clear();
        })
    }

    progress(value){

        this._percents.text = " " + value + "%";
        this._fill.x = -this._fill.width + this._fill.width / 100 * value;

        for (let i = 1; i <= this._stars.children.length; i++){

            let star = this._stars.children[i - 1];

            if (value >= 20 * i){

                if (!star.catched){

                    this.fillStars(i);
                    this.blinkStar(i);
                    star.catched = true;
                }
            }
        }
    }
}

const outlineFilter = new PIXI.filters.OutlineFilter(2, 0xffffff);
