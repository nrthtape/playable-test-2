import {app, game} from "./app.js";
import {getSpriteByConfig} from "./resourses.js";
import {viewport, playerGroup, uiGroup} from "./display.js";
import {camera, scene} from "./camera.js";

export class Player extends PIXI.Container{

    constructor(){

        super();

        this.x = app.view.width / 2;
        this.y = app.view.height / 2;

        this._score = 0;

        this._cat = getSpriteByConfig({
            name: "cat",
            parent: this,
            group: playerGroup,
            hitBox: {custom: true, y: -15, width: 200, height: 120}
        });

        this._nickname = getSpriteByConfig({
            name: "nickname",
            parent: this,
            group: uiGroup,
            y: -175
        });

        this._grow = [];

        for (let i = 0; i < 20; i++){

            this._grow.push({end: false, time: 0});
        }
    }

    get cat(){

        return this._cat;
    }

    get score(){

        return this._score;
    }

    scoreAnim(value){

        let text = new PIXI.Text("+" + value,
            new PIXI.TextStyle({
                fill: "white",
                fontFamily: "fishdom",
                fontSize: 70,
                stroke: "#0c3278",
                strokeThickness: 5
            })
        );
        text.anchor.set(0.5);
        text.y = -250;
        text.parentGroup = uiGroup;

        this.addChild(text);

        const tween = PIXI.tweenManager.createTween(text);

        tween.to({
            y: text.y - 250,
            alpha: 0
        });
        tween.time = 500;
        tween.easing = PIXI.tween.Easing.inSine();
        tween.start();
        tween.on("end", function (){
            tween.remove();
        });
    }

    eat(food){

        let     x = this.x + food.area.x * this.scale.x,
                y = this.y + food.area.y * this.scale.x,
                dist = getDistance(food, {x: x, y: y}),
                minDist = 300,
                delta = app.ticker.deltaTime,
                vacuumSpeed = 0.005 * food.time * delta,
                scaleRadius = 0,
                scaleSpeed = 3 * this.scale.x,
                angleSpeed = 1 / minDist * (minDist - dist) * delta * 2

        food.x = linear(food.x, x, vacuumSpeed);
        food.y = linear(food.y, y, vacuumSpeed);

        if (dist < minDist){

            vacuumSpeed = 1;

            // food.parentGroup = flyingGroup;

            if (food.scale.x > 0.25){

                // food.scale.set(1 - (1 / minDist));

                food.width -= food.texture.width / minDist * delta * scaleSpeed;
                food.height -= food.texture.height / minDist * delta * scaleSpeed;

                // if (food.random > 0.5 * this.scale.x){
                //
                //     food.angle += angleSpeed;
                // }
                // else{
                //
                //     food.angle -= angleSpeed;
                // }
            }
            else{

                food.parent.removeChild(food);
                this._score += food.score;
                this.scoreAnim(food.score);
                PIXI.sound.play("tap", {volume: 2});
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

        for (let i = 1; i <= this._grow.length; i++){

            let temp = this._grow[i - 1];

            if (value >= 5 * i){

                if (!temp.end){

                    this.scaleAnim(1.1);

                    temp.end = true;
                }

                let delta = app.ticker.deltaTime;

                if (temp.time < 15){

                    viewport.zoomPercent(-0.08 * easeInOutQuint(1) * delta / 15, true)
                    temp.time = temp.time + 1 * delta;
                }
            }
        }
    }
}

export let player;

export function initPlayer(config){

    config = Object.assign({
        x: 0,
        y: 0
    }, config);

    player = new Player();

    scene.addChild(player);

    scene.x += game.worldWidth / 2 - player.cat.width / 2 - config.x;
    player.x -= game.worldWidth / 2 - player.cat.width / 2 - config.x;
    scene.y += game.worldHeight / 2 - player.cat.height / 2 - config.y;
    player.y -= game.worldHeight / 2 - player.cat.height / 2 - config.y;
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