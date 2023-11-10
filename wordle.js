const grid = document.querySelector("#wordleGrid")


function createGrid(){
    for (let i = 0;i<30;i++){
        const square = document.createElement('div')
        square.classList.add('square')
        grid.append(square)
    }
}
createGrid()