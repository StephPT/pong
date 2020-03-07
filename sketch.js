var cnv;
var startPos = 250;
var ballStartY, ballStartX, speedSlider;
var ballMove, scoreOne, scoreTwo = 0;
const W_KEY = 87;
const S_KEY = 83;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y); 
}

function setup() {
    cnv = createCanvas(600, 600);
    centerCanvas();
    one = new Paddle(startPos, "left");
    two = new Paddle(startPos, "right");
    ball = new Ball(300, 300, 3);
    speedSlider = createSlider(0, 10, 4, 1);
    pauseGame();
}

function draw() {
    background(0);
    logToHTML();
    ball.play();
    ball.scoreSystem();
    one.display();
    two.display();
    movementOne();
    movementTwo();
    console.log(ball.angleMove);
}

function movementOne() {
    if(keyIsDown(S_KEY) && one.move <= 500) {
        one.down();
    }

    if(keyIsDown(W_KEY) && one.move >= 0) {
        one.up();
    }
}

function logToHTML() {
    document.getElementById("paddle").innerHTML = one.move;
    document.getElementById("x").innerHTML = ball.x;
    document.getElementById("y").innerHTML = ball.y;
}

function movementTwo() {
    if(keyIsDown(DOWN_ARROW) && two.move <= 500) {
        two.down();
    }

    if(keyIsDown(UP_ARROW) && two.move >= 0) {
        two.up();
    }
}

function score() {
    document.getElementById("one").innerHTML = scoreOne;
    document.getElementById("two").innerHTML = scoreTwo;
}

class Paddle {
    constructor(move, side) {
        this.side = side;
        this.move = move;
    }

    display() {
        if(this.side == "left"){
            rect(30, this.move, 25, 95);
        } else if(this.side == "right") {
            rect(540, this.move, 25, 95);
        }
    }

    down() {
        this.move += 10;
    }

    up() {
        this.move -= 10;
    }
}

function pauseGame() {
    noLoop();
}

function playGame() {
    loop();
}

class Ball {
    constructor(x, y, s){
        this.x = x;
        this.y = y;
        this.speed = s;
        this.lastHit = 0;
        this.angleMove;
        this.angle(-6, 6);
    }

    play() {
        this.direction();
        rect(this.x, this.y, 15, 15);
        this.hit();
        this.sideHit(); 
    }
    
    angle(min, max) {
        this.angleMove = random(min, max);
    }
    
    direction() {
        switch(this.lastHit){
            case 1:
                this.x += speedSlider.value();
                this.y += this.angleMove;
                break;
            case 0:
                this.x -= speedSlider.value();
                this.y -= this.angleMove;
                break;
        }
    }

    hit() {
        if(this.x <= 55 && this.x >= 45 && this.y >= one.move && this.y <= one.move + 95) {this.lastHit = 1; this.angle(-6, 6)}
        if(this.x <= 530 && this.x >= 520 &&this.y >= two.move && this.y <= two.move + 95) {this.lastHit = 0; this.angle(-6, 6)}
    }

    sideHit() {
        if(this.y <= 0 || this.y >= 600){
            if(this.anglMove <= 6 || this.angleMove >= -6) {this.angle(-6, 6); console.log("TIMES!");}
        } 
    }

    scoreSystem() {
        if(this.x <= 0) {
            this.restart("2");
        } else if(this.x >= 600) {
            this.restart("1");
        }
    }

    restart(player) {
        this.x = 300;
        this.y = 300;
        this.angle();
        if(player == "1") {
            scoreOne += 1;
            score();
        } 
        if(player == "2") {
            scoreTwo += 1;
            score();
        }
    }
}
