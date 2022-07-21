import {app} from "./app.js";
import {getSpriteByConfig} from "./resourses.js";
import {playerGroup, uiGroup} from "./start.js";

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

        const   x = this.x + this._cat.x,
                y = this.y + this._cat.y + 10,
                delta = app.ticker.deltaTime,
                speed = 0.01 * food.catchTime,
                dist = getDistance(food, {x: x, y: y})

        food.x = linear(food.x, x, speed * delta);
        food.y = linear(food.y, y, speed * delta);

        let minDist = 100;

        if (dist < minDist){

            if (food.scale.x > 0.25){

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