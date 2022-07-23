const randomWords = require('random-words');
// class Example {
//     constructor(ele){
//         this.ele = ele;
//         this.ele.innerHTML = "<h1> It's ALIVE</h1>";
//         this.handleClick = this.handleClick.bind(this);
//         this.ele.addEventListener('click', this.handleClick);
//     }

//     handleClick(){
//         this.ele.children[0].innerText = "Ouch";
//     }
// }

// export default Example;




//This function 
function generateWord(){
    let word = randomWords({ exactly: 1, maxLength: 4 })[0]; //this generates a random word of .length===4
    let container= document.getElementById('word-container');

    word.split("").forEach(letter => {
        let square = document.createElement("div");
        square.innerText = letter;
        square.classList.add('letter');
        container.appendChild(square);
    });

    compareWord(word[0]);
}

generateWord();


function compareWord(word){
    
    let i=0;
    window.addEventListener('keydown', (event)=>{
        if(event.key === word[i]){
            alert(`Nice, "${event.key}" is the right letter`);
            i++;
        }else {
            alert(`"${event.key}" is not the correct letter :( `);
        }
        if (word.length === i) {
            //put some animation here maybe a promise
            let letters = document.getElementsByClassName('letter');
            Array.from(letters).forEach(ele=> ele.remove());
            alert("word completed");
        }
    });



}


