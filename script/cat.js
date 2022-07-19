import {app} from "./app.js";
import {getSpriteByConfig} from "./resourses.js";
import {catGroup, uiGroup} from "./start.js";

export class Cat extends PIXI.Container{
    constructor(x, y)
    {
        super();

        this.x = app.view.width / 2;
        this.y = app.view.height / 2;

        this.count = 0;

        this.cat = getSpriteByConfig({
            name: "cat",
            parent: this,
            group: catGroup
        });

        this.nickname = getSpriteByConfig({
            name: "nickname",
            parent: this,
            group: uiGroup,
            y: -175
        });
    }

    get bound(){

        return this.cat;
    }

    eat(food, speed){

        const delta = app.ticker.deltaTime;

        let dist = getDistance(food, {
            x: this.x,
            y: this.y + 0
        });

        food.x = lerp(food.x, this.x, speed * delta);
        food.y = lerp(food.y, this.y + 0, speed * delta);

        let minDist = 200;

        if (dist < minDist){

            if (food.scale.x > 0.1){

                food.angle += 5 / minDist * (minDist - dist) * delta;
                food.scale.set(1 / minDist * dist);
            }
            else{

                food.parent.removeChild(food);
                food.catchTime = 0;
                this.count++;
            }
        }
    }

    get getCount(){

        return this.count;
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