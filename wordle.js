const keyCharacters = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','BACK']
const grid = document.querySelector("#wordleGrid")
const keyboard = document.querySelector("#keyboardBox")
var layer = 1;
var currentSquare = 0;
var currentGuessedWord = "";
var wordInList = false;
var gameEnded = false;
var wordToGuess = wordList[Math.floor(Math.random()*2309)]
//var wordToGuess = "hello"
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
function createKeyboard(){
    for (let i = 0; i<28;i++){
        const key = document.createElement('div')
        key.classList.add('key')
        key.setAttribute('id','key' + (i+1))
        key.setAttribute('value', keyCharacters[i])
        key.append(keyCharacters[i])
        keyboard.append(key)
        key.addEventListener('click', function(){
            //function occurs when any key on created keyboard is pressed
            //debugging line
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

                if((key.getAttribute('value') == "ENTER") && (layer/currentSquare)==0.2){
                    //determine most recent guessed word
                    for (i = (5*layer); i>((5*layer)-5);i--){
                        currentGuessedWord = document.getElementById('square' + i).innerHTML + currentGuessedWord 
                    }
                    console.log('Word guessed on layer '+ layer + ' is '+ currentGuessedWord.toLowerCase())
                    for (j=0;j<wordList.length;j++){
                        if (currentGuessedWord.toLowerCase() === wordList[j]){
                            for(i=0;i<5;i++){
                                if (currentGuessedWord.toLowerCase()[i] === wordToGuess[i]){
                                    document.getElementById('square'+(i+1+(layer-1)*5)).style.backgroundColor= 'green'
                                    //console.log('Corresponding letter of key turning green is ' + wordToGuess[i].toUpperCase())
                                    //console.log('Number of key to turn green ' + (keyCharacters.indexOf(wordToGuess[i].toUpperCase())+1))
                                    document.getElementById('key'+(keyCharacters.indexOf(wordToGuess[i].toUpperCase())+1)).style.backgroundColor='green'

                                }
                            }
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
                            //looping through guessed word
                            for (i=0;i<5;i++){
                                //looping through generatedWord
                                for (j=0;j<5;j++){
                                    if (currentGuessedWord.toLowerCase()[i] === wordToGuess[j]){
                                        letterInWord = true;
                                    }
                                }
                                if(!letterInWord){
                                    document.getElementById('square'+(i+1+(layer-1)*5)).style.backgroundColor= 'black'
                                    document.getElementById('square'+(i+1+(layer-1)*5)).style.color= 'white'
                                    document.getElementById('key'+(keyCharacters.indexOf(currentGuessedWord[i].toUpperCase())+1)).style.backgroundColor='black'
                                    document.getElementById('key'+(keyCharacters.indexOf(currentGuessedWord[i].toUpperCase())+1)).style.color='white'
                                }
                                letterInWord = false;
                            }
                            if(wordToGuess === currentGuessedWord.toLowerCase()){
                                document.getElementById('notInList').innerHTML = "You Win"
                                document.getElementById('notInList').style.display='flex'
                                gameEnded = true;
                            }
                            layer++;
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
        });
    }
}
createGrid()
createKeyboard()