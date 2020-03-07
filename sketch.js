var cnv;
var startPos = 25;
var ballStartX;
var ballStartY;
var ballMove = 0;
var scoreOne = 0;
var scoreTwo = 0;
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
    ball = new Ball(250, 250, 0.05);
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
}


function movementOne() {
    if(keyIsDown(DOWN_ARROW) && one.move <= 500) {
        one.down();
    }

    if(keyIsDown(UP_ARROW) && one.move >= 0) {
        one.up();
    }
}

function logToHTML() {
    document.getElementById("paddle").innerHTML = one.move;
    document.getElementById("x").innerHTML = ball.x;
    document.getElementById("y").innerHTML = ball.y;
}

function movementTwo() {
    if(keyIsDown(S_KEY) && two.move <= 500) {
        two.down();
    }

    if(keyIsDown(W_KEY) && two.move >= 0) {
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

    angleMove() {

    }

    down() {
        this.move += 10;
    }

    up() {
        this.move -= 10;
    }
}

class Ball {
    constructor(x, y, s){
        this.x = x;
        this.y = y;
        this.speed = s;
        this.lastHit = 0;
    }

    play() {
        this.direction();
        rect(this.x, this.y, 15, 15);
        this.hit();
    }
    
    direction() {
        switch(this.lastHit){
            case 1:
                this.x++;
                break;
            case 0:
                this.x--;
                break;
        }
    }

    hit() {
        if(this.x == 55 && this.y >= one.move && this.y <= one.move + 95) this.lastHit = 1;
        if(this.x == 530 && this.y >= two.move && this.y <= two.move + 95) this.lastHit = 0;
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
