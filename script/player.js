import {app, camera, viewport, scene} from "./app.js";
import {getSpriteByConfig} from "./resourses.js";
import {flyingGroup, player, playerGroup, uiGroup} from "./start.js";
import {config} from "./config.js";

export class Player extends PIXI.Container{

    constructor(){

        super();

        this.x = app.view.width / 2;
        this.y = app.view.height / 2;

        this._score = 0;

        this._cat = getSpriteByConfig({
            name: "cat",
            parent: this,
            group: playerGroup
        });

        this.nickname = getSpriteByConfig({
            name: "nickname",
            parent: this,
            group: uiGroup,
            y: -175
        });
    }

    get cat(){

        return this._cat;
    }

    get score(){

        return this._score;
    }

    eat(food){

        let     x = this.x + this._cat.x,
                y = this.y + this._cat.y + 10,
                delta = app.ticker.deltaTime,
                speed = 0.01 * food.catchTime * delta,
                dist = getDistance(food, {x: x, y: y})

        food.x = linear(food.x, x, speed);
        food.y = linear(food.y, y, speed);

        let minDist = 200;

        if (dist < minDist){

            speed = 1;

            // food.parentGroup = flyingGroup;

            if (food.scale.x > 0.1){

                food.scale.set(1 / minDist * dist);

                if (food.random > 0.5){

                    food.angle += 5 / minDist * (minDist - dist) * delta;
                }
                else{

                    food.angle -= 5 / minDist * (minDist - dist) * delta;
                }
            }
            else{

                food.parent.removeChild(food);
                this._score += food.score;
            }
        }
    }

    growth(obj){

        const tween = PIXI.tweenManager.createTween(this);

        tween.to({
            width: this.width * 1.2,
            height: this.height * 1.2
        });
        tween.time = 1000;
        tween.easing = PIXI.tween.Easing.outElastic(0.4, 0.5);
        tween.start();
        tween.on("end", function(){
            tween.remove();
        })

        const tween2 = PIXI.tweenManager.createTween(viewport);

        tween2.to({
            x: + this.width / 2 / 1.2,
            y: + this.height / 2 / 1.2,
            width: viewport.width / 1.2,
            height: viewport.height / 1.2
        });
        tween2.time = 1000;
        tween2.easing = PIXI.tween.Easing.outElastic(0.4, 0.5);
        tween2.start();
        tween2.on("end", function(){
            tween2.remove();
        })
    }
}

// Get distance between two points
function getDistance(p1, p2) {

    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

// Linear interpolation like Unity lerp()
function linear(a, b, n) {

    return (1 - n) * a + n * b;
}