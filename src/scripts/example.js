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

function something(){
    // let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/give';
    let word = randomWords({ exactly: 1, maxLength: 4 }); //this generates random words of length up to 4
    let container= document.getElementById('word-container');
    console.log(container);
    word[0].split("").forEach(letter => {
        let square = document.createElement("div");
        square.innerText = letter;
        square.classList.add('letter');
        container.appendChild(square);
    });
}

something();
