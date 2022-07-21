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

        this._growTimes = [];

        for (let i = 0; i < 10; i++){

            this._growTimes.push({end: false, timer: 0});
        }
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

    scaleAnim(size){

        const tween = PIXI.tweenManager.createTween(this);

        tween.to({
            width: this.width * size,
            height: this.height * size
        });
        tween.time = 1500;
        tween.easing = PIXI.tween.Easing.outElastic(0.4, 0.5);
        tween.start();
        tween.on("end", function (){
            tween.remove();
        });
    }

    grow(value){

        for (let i = 1; i <= this._growTimes.length; i++){

            let grow = this._growTimes[i - 1];

            if (value >= 10 * i){

                if (!grow.end){

                    this.scaleAnim(1.2);

                    grow.end = true;
                }

                if (grow.timer < 10){

                    viewport.zoom(10 + easeInOutQuint(1) * this.scale.x * 10, true);
                    grow.timer++;
                }
            }
        }
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

function easeInOutQuint(x){
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}