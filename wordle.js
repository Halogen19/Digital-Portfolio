const keyCharacters = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','BACK']
const grid = document.querySelector("#wordleGrid")
const keyboard = document.querySelector("#keyboardBox")
var layer = 1;


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


            //stops enter and back keys appearing in boxes when they are clicked
            if (key.getAttribute('value') != "BACK" && key.getAttribute('value') != "ENTER"){
                //adds letters to box divs allowing the user to write words
                for (let j = 0; j <30;j++){
                    if (document.getElementById('square' +(j+1)).innerHTML === ""){
                        document.getElementById('square' +(j+1)).append(key.getAttribute('value'));
                        break;
                    }
                }
            }else if (key.getAttribute('value') == "BACK" && document.getElementById('square1').innerHTML != ""){
                for (j = 0;j<30;j++){
                    if(document.getElementById('square'+(j+1)).innerHTML === ""){
                        document.getElementById('square'+(j)).innerHTML = ""
                    }
                }
                if(document.getElementById('square30').innerHTML != ""){
                    document.getElementById('square30').innerHTML = ""
                }
            }
        });
    }
}
createGrid()
createKeyboard()