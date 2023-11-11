const keyCharacters = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','BACK']
const grid = document.querySelector("#wordleGrid")
const keyboard = document.querySelector("#keyboardBox")
var layer = 1;
var currentSquare = 0;
var currentGuessedWord = "";
var wordInList = false;
var wordToGuess = wordList[Math.floor(Math.random()*2309)]

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
            if (layer<7){
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