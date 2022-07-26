import {app, game} from "./app.js";
import {addTween, getSpriteByConfig} from "./resourses.js";
import {viewport, playerGroup, uiGroup} from "./display.js";
import {scene} from "./map.js";

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
            hitBox: {
                custom: true,
                y: -15,
                width: 200,
                height: 120,
                show: false
            }
        });

        this._nickname = getSpriteByConfig({
            name: "nickname",
            parent: this,
            group: uiGroup,
            y: -175
        });

        this._vacuum = getSpriteByConfig({
            name: "vacuum",
            parent: this,
            group: playerGroup,
            y: -175,
            hitBox: {
                custom: true,
                width: 300,
                height: 200,
                show: false
            }
        })

        this._grow = [];

        for (let i = 0; i < 10; i++){

            this._grow.push({end: false, time: 0});
        }
    }

    get vacuum(){

        return this._vacuum;
    }

    get cat(){

        return this._cat;
    }

    get score(){

        return this._score;
    }

    set score(value){

        this._score = value;
    }

    scoreAnim(food){

        let text = new PIXI.Text("+" + food.score,
            new PIXI.TextStyle({
                fill: "white",
                fontFamily: "fishdom",
                fontSize: 70,
                stroke: "#0c3278",
                strokeThickness: 5
            })
        );
        text.anchor.set(0.5);
        text.x = food.area.x;
        text.y = food.area.y;
        text.parentGroup = uiGroup;

        this.addChild(text);

        const tween = PIXI.tweenManager.createTween(text);

        tween.to({
            y: text.y - 250,
            width: text.width * 1.5,
            height: text.height * 1.5,
            alpha: 0
        });
        tween.time = 1000;
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

        if (!food.tween){

            addTween({
                sprite: food,
                to: {
                    width: food.width * 2,
                    height: food.height * 2
                }
            })

            addTween({
                sprite: food,
                to: {
                    width: food.width,
                    height: food.height
                },
                delay: 100
            })

            food.tween = true;
        }

        food.x = linear(food.x, x, vacuumSpeed);
        food.y = linear(food.y, y, vacuumSpeed);

        if (dist < minDist){

            vacuumSpeed = 1;

            if (food.scale.x > 0.25){

                food.width -= food.texture.width / minDist * delta * scaleSpeed;
                food.height -= food.texture.height / minDist * delta * scaleSpeed;

                if (food.random > 0.5 * this.scale.x){

                    food.angle += angleSpeed;
                }
                else{

                    food.angle -= angleSpeed;
                }
            }
            else{

                this._score += food.score;
                this.scoreAnim(food);
                food.parent.removeChild(food);
            }
        }
    }

    scaleAnim(size){

        addTween({
            sprite: this,
            to: {
                width: this.width * size,
                height: this.height * size
            },
            time: 1500,
            easing: PIXI.tween.Easing.outElastic(0.4, 0.5)
        })
    }

    grow(value){

        for (let i = 1; i <= this._grow.length; i++){

            let temp = this._grow[i - 1];

            if (value >= 10 * i){

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