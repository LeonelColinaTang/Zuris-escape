// import Example from './scripts/example';

const randomWords = require('random-words'); ///require the API that will let me generate words
let control = false;
//This function generates a word
function generateWord() {
    let word = randomWords({ exactly: 1, maxLength: 4 })[0];
    let container = document.getElementById('word-container');



    if (!control){


        word.split("").forEach(letter => {
            let square = document.createElement("div");
            square.innerText = letter;
            square.classList.add('letter');
            container.appendChild(square);
        });
    }




    compareWord(word);
}

function compareWord(word) {
    control = true;
    let i = 0;
    let count = 0; //I might not need this. Check with Kyle before deletion.

    window.addEventListener('keypress', comparing); //I start listening for the input

    function comparing(event) {
        if (event.key === word[i]) { //If they are the same, I swap styles
            let square = document.querySelector(`#word-container :nth-child(${i + 1})`);
            square.classList.add('great');
            i++;
        } else {
            monsterMove += 100;
            count++; //This keeps counts of the mistakes
        }

        if (word.length === i) { //If word completed, I remove it with the event listener until next word
            let letters = document.getElementsByClassName('letter');
            i = 0;
            Array.from(letters).forEach(ele => ele.remove());
            window.removeEventListener('keypress', comparing);
            control = false;
        }

        if (count===5 || monsterMove >= 550) { //If there are 5 mistakes, the game is lost. This needs fixing.
            document.getElementById('game-suspense-music').pause();
            staggerFrames = 0;
            gameSpeed = 0;
            //you can move all this function down and then set gameSpeed to 0 when someone loses
            count=0;
            alert('you have lost!');
        }
    }
}

////////////////////////////////////////////////////////////////
const canvas = document.getElementById('canvas1'); //Here we create the canvas witht the width and height
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;
let gameSpeed = 5; //This is the variabe that will define every moving object's speed


//Here i'm getting the background pictures
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'src/images/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'src/images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'src/images/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'src/images/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'src/images/layer-5.png';


//Here I create the temmplate of the values that every background wil have
class Background {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 600;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) this.x = 0;
        // We could get rid of the if tatement by creating a variablle outside called gameFrame.
        // this.x -= this.speed;
        //this.x = gameFrame * this.speed % this.width;
        this.x -= this.speed;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
    }
}


// Create the background objects and the array with all of them
const background1 = new Background(backgroundLayer1, 0.2);
const background2 = new Background(backgroundLayer2, 0.4);
const background3 = new Background(backgroundLayer3, 0.6);
const background4 = new Background(backgroundLayer4, 0.8);
const background5 = new Background(backgroundLayer5, 1);
const gameBackgrounds = [background1, background2, background3, background4, background5];



//Creating boy and monster
const boy = new Image();
boy.src = 'src/images/boy.png';
const boyWidth = 2289/21;
const boyHeight = 172;


const monster = new Image();
monster.src = 'src/images/shadow_dog.png';
const monsterWidth = 6876 / 12;
const monsterHeight = 5230 / 10;

//I'll create one variables to control the speed of the boy
let boyX = 5;

//I'll create two variables to control the speed of the monster
let monsterX = 0;
let monsterY = 3;
let monsterMove = 50;
//two variables to control the
let gameFrame = 0;
let staggerFrames = 2;

// I'm animating the backgrounds here
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameBackgrounds.forEach(function (ele) {
        ele.update();
        ele.draw();
    })

    // ctx.drawImage (image, cutX, cutY, cutWidth, cutHEight, startPosX, startPosY, width, height )
    ctx.drawImage(monster, monsterWidth * monsterX, monsterY * monsterHeight, monsterWidth, monsterHeight, monsterMove, 310, 200, 200); //50,310,200,200
    //boy gets caught at 550 so each mistake can add 100
    ctx.drawImage(boy, boyWidth * boyX, 0, boyWidth, boyHeight, 650, 420, 100, 100);

    if (gameFrame % staggerFrames === 0) {
        if (monsterX < 6) {
            monsterX++;
        } else {
            monsterX = 0;
        }
        if (boyX < 20) {
            boyX++;
        } else {
            boyX = 0;
        }
    }

    gameFrame++;
    requestAnimationFrame(animate);
};





//////////////
const musicButton = document.getElementById('music-button');

musicButton.onclick = function(){
    if( musicButton.innerHTML === 'Mute'){
        document.getElementById('game-suspense-music').pause();
        musicButton.innerHTML = 'Resume';
    }else {
        document.getElementById('game-suspense-music').play();
        musicButton.innerHTML = 'Mute';
    }
};

const startButton = document.getElementById('start-button');
startButton.onclick = function(){
    setInterval((generateWord),5000); 

    document.getElementById('game-suspense-music').play();
    animate()
};


// Instead of setInterval, call the function once and the next calls make them once the word has been completed
// I could use a setTimeout with a random number between 1-5 seconds.
// Why does it give me an error if I wait?
//How do I stablish that a game was won (maybe create a variable counting X amount of words)
//How to reset the game?
//For the game over, I could create a div with display: none; and then whe the game is lost, change it's property?
///How should I divide the game?
//Should I go into promises rather than setting the chain through functions?

