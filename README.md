# Zuris-escape

## Background
Zuri's escape is an interactive typing game in which the user will help Zuri escape from Fiend. The user will be able to aid Zuri by typing the words showed on the screen correctly. If the user fails to correctly type the word 5 times, Zuri will be caught thus ending the game.
<p align="center">
<a href="/gif/zuris-escape-eGIJ7E" title="Zuri's escape"><img src="https://i.makeagif.com/media/7-28-2022/eGIJ7E.gif" alt="Zuri's escape"></a><br>
<a href="https://leonelcolinatang.github.io/Zuris-escape/" target="_blank">**Zuri's Escape**</a>
</p>

The intent of the game is not to compete but to improve the user's typing ability in an entertaining and visually pleasing manner.

## Functionality and MVPs

In Zuri's escape, users will be able to:

  - Start and restart the game. The game starts with a screen showing the story of the game and the instructions to play. By clicking the button, the game automatically starts. If the player loses, the option to retry will be given.
  <p align="center">
  <a href="/gif/zuri-retry-5WT-v6" title="Zuri retry"><img src="https://i.makeagif.com/media/7-28-2022/5WT-v6.gif" alt="Zuri retry"></a>
  </p>
  
```.js
const retryButton = document.getElementById('retry-button');
retryButton.onclick = function () {
    document.getElementById('lose').style.display = 'none';
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    monsterX = 0;
    monsterMove = 50;
    gameSpeed = 5;
    staggerFrames = 2;
    gameFrame = 0;
    control = false;
    document.getElementById('game-suspense-music').play();
    setTimeout(generateWord, 3000);
    document.getElementById('canvas1').style.display = 'inline-block';

}
```



  - Control the background music. By clicking on the sound icon, the user will be able to mute and unmute the game's sound. This was accomplished through toggling the classes for the icons and pausing the audio.
```.js

let icon = document.getElementById('sound-icon');
icon.onclick = function(){
    icon.classList.toggle('fa-volume-up');
    icon.classList.toggle('fa-volume-mute');
    if (icon.classList.value === 'fas fa-volume-mute') {
        document.getElementById('game-suspense-music').pause();
    } else {
        document.getElementById('game-suspense-music').play();
    }
}
```
  - Type the words shown on screen. This is accomplished through the EventListener which will register every key pressed. It will be comparing its value to the ones shown on the screen, and will show a little animation and change of color per every correct letter. This function also keeps track of the misses and of the div being shown to make sure no other words are generated until the user has successfully typed the word or lost the game.
  ```.js
  function compareWord(word) {
    control = true;
    let i = 0;
    let letters = document.getElementsByClassName('letter');
    window.addEventListener('keypress', comparing); 

    function comparing(event) {
        if (event.key === letters[i].innerText) { 
            let square = document.querySelector(`#word-container :nth-child(${i + 1})`);
            square.classList.add('great');
            i++;
        } else {
            monsterMove += 100;
        }

        if (word.length === i) { 
            i = 0;
            Array.from(letters).forEach(ele => ele.remove());
            window.removeEventListener('keypress', comparing);
            control = false;
            wordCount +=1;
            if (wordCount === 5) {
                Array.from(letters).forEach(ele => ele.remove());
                document.getElementById('win').style.display = 'block';
                document.getElementById('canvas1').style.display = 'none';
                document.getElementById('game-suspense-music').pause();
            }else{
                setTimeout(generateWord, Math.floor(Math.random()*3)*1000);
            }
        }
        if (monsterMove >= 550) { //If there are 5 mistakes, the game is lost.
            document.getElementById('game-suspense-music').pause();
            Array.from(letters).forEach(ele => ele.remove());
            staggerFrames = 0;
            gameSpeed = 0;
            wordCount = 0;
            document.getElementById('canvas1').style.display = 'none';

            document.getElementById('lose').style.display = 'block';
        }
    }
}
```
  
  

## Wireframes

![https://ibb.co/DfRZwT6](https://i.ibb.co/nMLFQtV/Screen-Shot-2022-07-21-at-11-30-29-PM.png)

  - On the right side, there will be two buttons: one to mute/unmute the sound, the other to change difficulty.
  - The mistakes will track how many invalid letters the user has typed.

## Technologies, libraries, APIs

This project will be implemented with the following technologies:
  - ```JavaScript``` for DOM manipulation.
  - ```Canvas API``` to render the game visuals.
  - ```Webpack``` and ```Bable``` to bundle and transpile the source JavaScript code.
  - ```npm``` to manage project dependencies.
  

## Implementation timeline

  - Friday & weekend: Set up project. Start webpack and choose background and style for canvas. Get or create the sprites.
  - Monday: Import dictionary with short words. Create basic logic. Make sure all keystrokes are being registered and compared with the words in the dictionary.
  - Tuesday: Focus on the animation running and start making connections with the logic.
  - Wednesday: Finish implementing user controls and the duration of the game.
  -Thursday: Deploy project, refacter and rewrite README.
  
## Bonus Features
  - Add difficulty levels.
