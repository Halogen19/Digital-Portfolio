const grid = document.querySelector("#wordleGrid")
const keyboard = document.querySelector("#keyboardBox")


function createGrid(){
    for (let i = 0;i<30;i++){
        const square = document.createElement('div')
        square.classList.add('square')
        grid.append(square)
    }
}
function createKeyboard(){
    for (let i = 0; i<28;i++){
        const key = document.createElement('div')
        key.classList.add('key')
        key.setAttribute('id','key' + (i+1))
        keyboard.append(key)
    }

}
createGrid()
createKeyboard()