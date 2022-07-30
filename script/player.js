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
            parent: this._cat,
            group: uiGroup,
            y: -175
        });

        this._vacuum = getSpriteByConfig({
            name: "vacuum",
            parent: this._cat,
            group: playerGroup,
            y: -175,
            hitBox: {
                custom: true,
                width: 300,
                height: 200,
                show: false
            }
        })

        this._scoreAnim = new PIXI.Container();
        this.addChild(this._scoreAnim);

        this._grow = [];

        for (let i = 0; i < 20; i++){

            this._grow.push({end: false, time: 0});
        }
    }

    get vacuum(){

        return this._vacuum;
    }

    get cat(){

        return this._cat;
    }

    get scale(){

        return this._cat.scale;
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
                fontSize: 70 * this.scale.x,
                stroke: "#0c3278",
                strokeThickness: 5
            })
        );
        text.anchor.set(0.5);
        text.x = food.area.x;
        text.y = food.area.y;
        text.parentGroup = uiGroup;

        this.addChild(text);

        addTween({
            sprite: text,
            to: {
                y: text.y - 350 * this.scale.x,
                // width: text.width * 1.5,
                // height: text.height * 1.5,
                alpha: 0.5
            },
            time: 1000,
            easing: PIXI.tween.Easing.inSine()
        }).on("end", function (){

            player.removeChild(text);
        })
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
        // food.speed = 0;

        if (!food.sound1){

            PIXI.sound.play("swish", {volume: 0.2});
            food.sound1 = true;
        }

        if (dist < minDist){

            vacuumSpeed = 1;

            if (Math.abs(food.scale.x) > 0.25){

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

                if (!food.sound2){

                    PIXI.sound.play("tap", {volume: 0.2});
                    food.sound2 = true;
                }

                this._score += food.score;
                this.scoreAnim(food);
                food.parent.removeChild(food);
            }
        }
    }

    scaleAnim(size){

        return addTween({
            sprite: this._cat,
            to: {
                width: this._cat.width * size,
                height: this._cat.height * size
            },
            time: 2500,
            easing: PIXI.tween.Easing.outElastic(0.4, 0.5)
        })
    }

    scaleTextAnim(){

        let sizeUp = getSpriteByConfig({
            name: "size_up",
            parent: this,
            group: uiGroup,
            y: -175,
            scale: 0.75 * this.scale.x
        })

        return addTween({
            sprite: sizeUp,
            to: {
                y: sizeUp.y - 250 * this.scale.x,
                // width: sizeUp.width * 1.5,
                // height: sizeUp.height * 1.5,
                alpha: 0.5
            },
            time: 1000,
            easing: PIXI.tween.Easing.inSine()
        }).on("end", function (){

            sizeUp.alpha = 0;
        })
    }

    grow(value, max){

        for (let i = 1; i <= this._grow.length; i++){

            let temp = this._grow[i - 1];

            if (value >= 100 * i * 4 - 300){

                if (!temp.end){

                    if (!temp.sound){

                        PIXI.sound.play("size", {volume: 0.2});
                        PIXI.sound.play("plim", {volume: 0.5});
                        temp.sound = true;
                    }

                    this.scaleAnim(1.1);

                    this.scaleTextAnim();

                    temp.end = true;
                }

                let delta = app.ticker.deltaTime;

                if (temp.time < 30){

                    viewport.zoomPercent(-0.07 * easeInOutQuint(1) * delta / 30, true)
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