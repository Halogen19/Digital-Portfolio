const keyCharacters = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','BACK']
const grid = document.querySelector("#wordleGrid")
const keyboard = document.querySelector("#keyboardBox")
var layer = 1;
var currentSquare = 0;
var currentGuessedWord = "";
var currentGuessedWordMemory = ""
var wordInList = false;
var gameEnded = false;
//var wordToGuess = wordList[Math.floor(Math.random()*2309)]
var wordToGuess = "linen"
var letterInWord = false;

function disappearPopUp(){
    document.getElementById('notInList').style.display='none'
}

function createGrid(){
    for (let i = 0;i<30;i++){
        const square = document.createElement('div')
        square.classList.add('square')
        square.setAttribute('id', 'square'+(i+1))
        grid.append(square)
    }
}
function deleteLetter(){
    //remove most recently clicked letter from box

}
function displayLetter(){
    //display clicked letter in next available box
}
function replaceCharAtIndexWithStop(word, index){
    newWord = ""
    for (let i = 0; i<word.length;i++){
        if (i != index){
            newWord = newWord + word[i]
        }else{
            newWord = newWord + "."
        } 
    }
    return newWord
}
function keyClicked(e,i){
    //function occurs when any key on created keyboard is pressed
    //debugging line
    var key = e.target;
    console.log('Key ' + (i+1) + ' was clicked!');
    if (layer<7 &&!gameEnded){
        if (layer/currentSquare>0.2||currentSquare ==0){
            //stops enter and back keys appearing in boxes when they are clicked
            if (key.getAttribute('value') != "BACK" && key.getAttribute('value') != "ENTER"){
                //adds letters to box divs allowing the user to write words
                for (let j = 0; j <30;j++){
                    if (document.getElementById('square' +(j+1)).innerHTML === ""){
                        document.getElementById('square' +(j+1)).append(key.getAttribute('value'));
                        currentSquare++;
                        console.log("The current square is " + currentSquare)
                        break;
                    }
                }
            }
        }
        //makes the back key delete the most recently selected letter
        if (key.getAttribute('value') == "BACK" && document.getElementById('square'+(((layer-1)*5)+1) ).innerHTML != ""){
            for (j = 0;j<30;j++){
                if(document.getElementById('square'+(j+1)).innerHTML === ""){
                    document.getElementById('square'+(j)).innerHTML = ""
                    currentSquare--;
                    console.log("The current square is " + currentSquare)
                    break;
                }
            }
            if(document.getElementById('square30').innerHTML != ""){
                document.getElementById('square30').innerHTML = ""
                currentSquare--;
                console.log("The current square is " + currentSquare)
            }
        }
        //if enter is pressed and current guess line is complete
        if((key.getAttribute('value') == "ENTER") && (layer/currentSquare)==0.2){
            //determine most recent guessed word
            for (i = (5*layer); i>((5*layer)-5);i--){
                currentGuessedWord = document.getElementById('square' + i).innerHTML + currentGuessedWord 
            }
            console.log('Word guessed on layer '+ layer + ' is '+ currentGuessedWord.toLowerCase())
            //loop through valid word list
            for (j=0;j<wordList.length;j++){
                //check if word guessed is valid word
                wordToGuessMemory = wordToGuess
                if (currentGuessedWord.toLowerCase() === wordList[j]){
                    for(i=0;i<5;i++){
                        if (currentGuessedWord.toLowerCase()[i] === wordToGuess[i]){
                            //turn background colour of grid green
                            document.getElementById('square'+(i+1+(layer-1)*5)).style.backgroundColor= 'green'

                            //turn background colour of keyboard key green
                            document.getElementById('key'+(keyCharacters.indexOf(wordToGuess[i].toUpperCase())+1)).style.backgroundColor='green'
                            //change green letters in currentGuessedWord to "."
                            wordToGuess = replaceCharAtIndexWithStop(wordToGuess, i)

                        }
                    }
                    console.log("The word after taking out greens is " + wordToGuess)
                    //looping through guessedWord
                    for (i=0;i<5;i++){
                        //looping through generatedWord
                        for (j=0;j<5;j++){
                            if (i!= j && document.getElementById('square'+(i+1+(layer-1)*5)).style.backgroundColor!= 'green'){
                                if (currentGuessedWord.toLowerCase()[i] === wordToGuess[j]){
                                    document.getElementById('square'+(i+1+(layer-1)*5)).style.backgroundColor= 'orange'
                                    if (document.getElementById('key'+(keyCharacters.indexOf(wordToGuess[j].toUpperCase())+1)).style.backgroundColor!='green'){
                                        document.getElementById('key'+(keyCharacters.indexOf(wordToGuess[j].toUpperCase())+1)).style.backgroundColor='orange'
                                    }
                                }
                            }
                        }
                    }
                    //wordToGuess = wordToGuessMemory
                    //looping through guessed word
                    for (i=0;i<5;i++){
                        //looping through generatedWord
                        for (j=0;j<5;j++){
                            if (currentGuessedWord.toLowerCase()[i] === wordToGuess[j]){
                                letterInWord = true;
                            }
                        }
                        if(!letterInWord){
                            if (document.getElementById('square'+(i+1+(layer-1)*5)).style.backgroundColor != 'green' && document.getElementById('square'+(i+1+(layer-1)*5)).style.backgroundColor != 'orange'){
                                document.getElementById('square'+(i+1+(layer-1)*5)).style.backgroundColor= 'black'
                                document.getElementById('square'+(i+1+(layer-1)*5)).style.color= 'white'
                                if(document.getElementById('key'+(keyCharacters.indexOf(currentGuessedWord[i].toUpperCase())+1)).style.backgroundColor!='green'&& document.getElementById('key'+(keyCharacters.indexOf(currentGuessedWord[i].toUpperCase())+1)).style.backgroundColor !='orange'){
                                document.getElementById('key'+(keyCharacters.indexOf(currentGuessedWord[i].toUpperCase())+1)).style.backgroundColor='black'
                                document.getElementById('key'+(keyCharacters.indexOf(currentGuessedWord[i].toUpperCase())+1)).style.color='white'
                                }
                            }
                        }
                        letterInWord = false;
                    }
                    wordToGuess = wordToGuessMemory
                    layer++;
                    if(wordToGuess === currentGuessedWord.toLowerCase()){
                        document.getElementById('notInList').innerHTML = "You Win"
                        document.getElementById('notInList').style.display='flex'
                        gameEnded = true;
                    }
                    if (layer == 7){
                        document.getElementById('notInList').innerHTML = "You Lose"
                        document.getElementById('notInList').style.display='flex'
                        document.getElementById('word').innerHTML = wordToGuess.toUpperCase()
                        document.getElementById('word').style.display = 'flex'
                        gameEnded = true
                    }
                    wordInList = true;
                    currentGuessedWord = ""
                    break;
                }
            }
            if (!wordInList){
                document.getElementById('notInList').style.display='flex'
                currentGuessedWord="";
                setTimeout(disappearPopUp,2000);
            }
            wordInList = false;
        }
    }
}

//Creates  the keyboard divs, and adds the event listeners to the individual keys
function createKeyboard(){
    for (let i = 0; i<28;i++){
        const key = document.createElement('div')
        key.classList.add('key')
        key.setAttribute('id','key' + (i+1))
        key.setAttribute('number',(i+1) )
        key.setAttribute('value', keyCharacters[i])
        key.append(keyCharacters[i])
        keyboard.append(key)
        key.addEventListener('click', function(e){
            keyClicked(e,i);
        });
    }
}
createGrid()
createKeyboard()