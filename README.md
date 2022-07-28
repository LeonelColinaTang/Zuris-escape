# Zuris-escape

## Background
Zuri's escape is an interactive typing game in which the user will help Zuri escape from Fiend. The user will be able to aid Zuri by typing the words showed on the screen within the allotted time. If the user fails to correctly type the word 10 times, Zuri will be caught thus ending the game.
<p align="center">
<a href="/gif/zuris-escape-eGIJ7E" title="Zuri's escape"><img src="https://i.makeagif.com/media/7-28-2022/eGIJ7E.gif" alt="Zuri's escape"></a>
<a href="https://leonel040792.github.io/Zuris-escape/" target="_blank">**Zuri's Escape**</a>
</p>

The intent of the game is not to compete but to improve the user's typing ability in an entertaining and visually pleasing manner.

## Functionality and MVPs

In Zuri's escape, users will be able to:

  - Start and restart the game.
  - Control the background music.
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


  - Type the words shown on screen.
  
  

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
