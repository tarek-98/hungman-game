//letters
let letters = "abcdefghijklmnopqrstuvwxyz";
// array from letters
let lettersArray = Array.from(letters);
//select letters container
let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach(letter => {
    //craet span
    let spanL = document.createElement("span");
    //crate textnode
    let spanText = document.createTextNode(letter);
    spanL.appendChild(spanText);

    //add class to span
    spanL.className = "lettersbox"
    
    lettersContainer.appendChild(spanL)
})

//object of words - categories
let words = {
    Programming:["php","javascript","go","html","mysql","python"],
    Movies:["antman","coco","interstaller","captin america","The Last Kingdom","avatar"],
    People:["albert einstine","hitchock","alexander","cleopatra","ghandi"],
    Countries:["egypt","france","syria","palestine","qatar"]
}

// get random prop  
let allKeys = Object.keys(words);
let randomPropNum = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNum];
let randomPropValu = words[randomPropName];

let randumValuNumber = Math.floor(Math.random() * randomPropValu.length);
let randumValuName = randomPropValu[randumValuNumber]

//set categoryinfo
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//select letters guess
let letterGuessContainer = document.querySelector(".letters-guess");


//convert chosen word to array 
let lettersAndSpace = Array.from(randumValuName);
lettersAndSpace.forEach(letter => {
    //craet span
    let emptySpan = document.createElement("span");
    //if letters space
    if(letter === " "){
        emptySpan.className = "has-space"
    }
    letterGuessContainer.appendChild(emptySpan)
});

// guess select span
let guessSpans = document.querySelectorAll(".letters-guess span");
let doneguess = document.querySelectorAll(".letters-guess");


let wrongAttempts = 0;
let endCount = 0;

let theDraw = document.querySelector(".hangman-draw")
//handel clicking on letters
document.addEventListener("click", (e)=> {
    let theStatus = false;

    if (e.target.className === "lettersbox")
    {
        e.target.classList.add("clicked");

        // get clicked letter
        let clickedLetter = e.target.innerHTML.toLowerCase();

        //the chosen word
        let theChosenWord = Array.from(randumValuName.toLowerCase());

        theChosenWord.forEach((wordLetter, wordIndex)=> {

            //if clicked letter = one of chosen letter word
            if(clickedLetter == wordLetter){
                theStatus = true;
                endCount++;
                guessSpans.forEach((span, spanindex)=>{
                    if(wordIndex === spanindex)
                    {
                        span.innerHTML = clickedLetter;
                    }
                });
            };
        });
        //out side loop
        
        //if letter wrong
        if(theStatus !== true)
        {
            wrongAttempts++;
            //add class wrong to element
            theDraw.classList.add(`wrong-${wrongAttempts}`)

            document.getElementById("fail").play();

            if(wrongAttempts === 8 )
            {
                endGame();
                lettersContainer.classList.add("finished")
            }
        }else
        {
            document.getElementById("success").play();
            if(endCount === theChosenWord.length)
            {
                doneGame();
                lettersContainer.classList.add("finished")
            }
        }
    }
});
//end game fun
function endGame(){
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over, The Word is "${randumValuName.toUpperCase()}", Try Again`);
    div.appendChild(divText)
    div.className = "popup"
    document.body.appendChild(div)
}

function doneGame(){
    let div = document.createElement("div");
    let divText = document.createTextNode(`Congratulations. You fall in wrong ${wrongAttempts} times`);
    div.appendChild(divText)
    div.className = "popup"
    document.body.appendChild(div)
}
