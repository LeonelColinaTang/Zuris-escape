// import Example from './scripts/example';

const randomWords = require('random-words'); ///require the API that will let me generate words

//This function generates a word
function generateWord() {
    let word = randomWords({ exactly: 1, maxLength: 4 })[0];
    let container = document.getElementById('word-container');

    word.split("").forEach(letter => {
        let square = document.createElement("div");
        square.innerText = letter;
        square.classList.add('letter');
        container.appendChild(square);
    });
    compareWord(word);
}

//callling the function for testing purposes
setInterval((generateWord),5000); 

function compareWord(word) {
    let i = 0;
    let count = 0;

    window.addEventListener('keypress', comparing); //I start listening for the input
    function comparing(event) {
        if (event.key === word[i]) { //If they are the same, I swap styles
            let square = document.querySelector(`#word-container :nth-child(${i + 1})`);
            square.classList.add('great');
            i++;
        } else {
            count++; //This keeps counts of the mistakes
        }

        if (word.length === i) { //If word completed, I remove it with the event listener until next word
            let letters = document.getElementsByClassName('letter');
            Array.from(letters).forEach(ele => ele.remove());
            i = 0;
            window.removeEventListener('keypress', comparing);
        }

        if (count===5) { //If there are 5 mistakes, the game is lost. This needs fixing.
            alert('you have lost!');
            //you can move all this function down and then set gameSpeed to 0 when someone loses
            count=0;
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
backgroundLayer1.src = 'src/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'src/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'src/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'src/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'src/layer-5.png';



//Here I create the temmplate of the values that every background wil have
class Background{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 600;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) this.x = 0;
        // We could get rid of the if tatement by creating a variablle outside called gameFrame.
        // this.x -= this.speed;
        //this.x = gameFrame * this.speed % this.width;
        this.x -= this.speed;
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}


// Create the background objects and the array with all of them
const background1 = new Background(backgroundLayer1, 0.2);
const background2 = new Background(backgroundLayer2, 0.4);
const background3 = new Background(backgroundLayer3, 0.6);
const background4 = new Background(backgroundLayer4, 0.8);
const background5 = new Background(backgroundLayer5, 1);
const gameBackgrounds = [background1, background2, background3, background4, background5];







const boy = new Image();
boy.src = 'src/images/boy.png';
let moveX = 0;
let moveY = 0;

//I'll create two variables to control the speed of the boy
let gameFrame = 0;
const staggerFrames  = 5;

// I'm animating the backgrounds here
function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameBackgrounds.forEach(function(ele){
        ele.update();
        ele.draw();
    })

    ctx.drawImage(boy, moveX*100, moveY*137 , 100 , 137 , CANVAS_WIDTH-150 , CANVAS_HEIGHT-185 , 100 , 100);

     if (gameFrame % staggerFrames === 0){
         if (moveX < 7){
             moveX++;
         }else{
             moveX = 0;
         }
     }
     gameFrame++;
    requestAnimationFrame(animate);
};
animate();






