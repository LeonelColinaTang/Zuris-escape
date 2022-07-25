// import Example from './scripts/example';


// document.addEventListener("DOMContentLoaded",() =>{
//     const main = document.getElementById('main');
//     // new Example(main);
// })

const randomWords = require('random-words');

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

setInterval((generateWord),5000);

function compareWord(word) {
    let i = 0;
    let count = 0;
    window.addEventListener('keypress', comparing);
    function comparing(event) {
        if (event.key === word[i]) {
            let square = document.querySelector(`#word-container :nth-child(${i + 1})`);
            square.classList.add('great');
            i++;
        } else {
            count++;
        }

        if (word.length === i) {
            let letters = document.getElementsByClassName('letter');
            Array.from(letters).forEach(ele => ele.remove());
            i = 0;

            window.removeEventListener('keypress', comparing);
        }
        if (count===5) {
            alert('you have lost!');
            count=0;
        }
    }
}

////////////////////////////////////////////////////////////////



const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 715;
let gameSpeed = 5;

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


class Background{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if ( this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}



const background1 = new Background(backgroundLayer1, 0.2);
const background2 = new Background(backgroundLayer2, 0.4);
const background3 = new Background(backgroundLayer3, 0.6);
const background4 = new Background(backgroundLayer4, 0.8);
const background5 = new Background(backgroundLayer5, 1);
const gameBackgrounds = [background1, background2, background3, background4, background5];

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameBackgrounds.forEach(function(ele){
        ele.update();
        ele.draw();
    })


    requestAnimationFrame(animate);
};

animate();