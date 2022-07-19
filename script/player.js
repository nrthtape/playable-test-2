import {app} from "./app.js";
import {getSpriteByConfig} from "./resourses.js";
import {playerGroup, uiGroup} from "./start.js";

export class Player extends PIXI.Container{
    constructor(x, y)
    {
        super();

        this.x = app.view.width / 2;
        this.y = app.view.height / 2;

        this._count = 0;

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

    get count(){

        return this._count;
    }

    eat(food, speed){

        const   x = this.x + this._cat.x,
                y = this.y + this._cat.y + 10,
                delta = app.ticker.deltaTime,
                dist = getDistance(food, {x: x, y: y});

        food.x = lerp(food.x, x, speed * delta);
        food.y = lerp(food.y, y, speed * delta);

        let minDist = 200;

        if (dist < minDist){

            if (food.scale.x > 0.1){

                food.angle += 5 / minDist * (minDist - dist) * delta;
                food.scale.set(1 / minDist * dist);
            }
            else{

                food.parent.removeChild(food);
                food.catchTime = 0;
                this._count += food.score;
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

// Linear interpolation
function lerp(a, b, n) {
    return (1 - n) * a + n * b;
}