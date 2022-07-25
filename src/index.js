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

// setInterval((generateWord),5000);

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
let x = 0;
let x2 = 2400;

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


function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);


    ctx.drawImage(backgroundLayer4, x, 0);
    ctx.drawImage(backgroundLayer4, x2, 0);


    if(x < -2400) x = 2400 + x2 - gameSpeed;
    else x -=gameSpeed;

    if (x2 < -2400) x2 = 2400 + x - gameSpeed;
    else x2 -= gameSpeed;



    requestAnimationFrame(animate);
};

animate();