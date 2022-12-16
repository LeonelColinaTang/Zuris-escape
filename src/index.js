const randomWords = require('random-words'); ///require the API that will let me generate words

const canvas = document.getElementById('canvas1');
const playButton = document.getElementById('play-button');
const replayButton = document.getElementById('replay-button');
const retryButton = document.getElementById('retry-button');
//This selects to icon to then switch it. It won't take margins
const soundIcon = document.getElementById('sound-icon');
//This selects the anchor which will take margins to position
const musicIcon = document.getElementById('music-icon'); 

const music = document.getElementById('game-suspense-music');
const wordContainer = document.getElementById('word-container');
let wordCount = 0;


//This function generates a word
function generateWord() {

    let word = randomWords({ exactly: 1, maxLength: 4 })[0];

    word.split("").forEach(letter => {
        let square = document.createElement("div");
        square.innerHTML = letter;
        square.classList.add('letter');
        wordContainer.appendChild(square);
    });
}
let controller = false;

// const prom = new Promise((resolve) =>{
//     for(let m=0; m < 200; m++){
//         setTimeout(()=>monsterMove += 0.5, m*2);
//     }
// })

function moveMonster(){
    let promises = [];

    for (let m = 0; m < 200; m++) {
        promises.push(new Promise((resolve) => {
            setTimeout(() => {
                // monsterMove += 0.5; both ways work
                resolve(monsterMove += 0.5);
            }, m * 2);
        }))
    }
    return Promise.all(promises);
}

function startGame(){
    setTimeout(generateWord, Math.floor(Math.random() * 3) * 1000);
    let i = 0;
    controller = true;
    
    window.addEventListener('keypress', async (event)=>{
        if (controller) {

            let letters = Array.from(document.getElementsByClassName('letter'));
            if (event.key === letters[i].innerHTML) {
                document.querySelector(`#word-container :nth-child(${i + 1})`).classList.add('great');
                i++;
            } else {
                // for(let m=0; m < 200; m++){
                //     setTimeout(()=>monsterMove += 0.5, m*2);
                // }
                await moveMonster();
            }
    
            if (letters.length === i) { //If word completed, I remove it with the event listener until next word
                i = 0;
                wordCount += 1;
                letters.forEach(e => e.remove())
    
                if (wordCount === 5) {
                    letters.forEach(e => e.remove())
                    document.getElementById('win').style.display = 'block';
                    canvas.style.display = 'none';
                    music.pause();
                    controller = false;
                    return
                } else {
                    setTimeout(generateWord, Math.floor(Math.random() * 3) * 1000);
                }
            }
    
    
            if (monsterMove >= 550) { //If there are 5 mistakes, the game is lost. This needs fixing.
                music.pause();
                letters.forEach(e => e.remove())
                staggerFrames = 0;
                gameSpeed = 0;
                wordCount = 0;
                i = 0;
                controller = false
                canvas.style.display = 'none';
                document.getElementById('lose').style.display = 'block';
                return
            }
        }

    }); 



}

playButton.onclick = function () {
    document.getElementById('welcome').style.display = 'none';
    canvas.style.display = 'inline-block';
    startGame();
    music.volume = 0.1;
    music.play();
    animate();
};

replayButton.onclick = function () {
    buttonAction('win');
    controller = true;
}

retryButton.onclick = function () {
    buttonAction('lose');
    controller = true;
}

soundIcon.onclick = function () {
    soundIcon.classList.toggle('fa-volume-up');
    soundIcon.classList.toggle('fa-volume-mute');
    if (soundIcon.classList.value === 'fas fa-volume-mute') {
        music.pause();
    } else {
        music.play();
    }
}



function buttonAction(popupDiv) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    monsterX = 0;
    monsterMove = 50;
    gameSpeed = 5;
    staggerFrames = 2;
    gameFrame = 0;
    wordCount = 0;
    document.getElementById(`${popupDiv}`).style.display = 'none';
    canvas.style.display = 'inline-block';
    music.play();
    setTimeout(generateWord, Math.floor(Math.random() * 3) * 1000);

}



////////////////////////////////////////////////////////////////
//Here we create the canvas witht the width and height
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
