const grid = document.querySelector('grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
const width = 10
//The Tetrominoes
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]
const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
let randomTetromino
let randomNumber
const startingPostion = 4
let currentPosition = startingPostion
let currentTetromino

function draw() {
    currentTetromino.forEach(index => {
        squares[currentPosition + index].classList.add('active')
    })
}


function undraw() {
    currentTetromino.forEach(index => {
        squares[currentPosition + index].classList.remove('active')
    })
}

function checksIfTaken() {
    // checks square one spot down
    if(currentTetromino.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        currentTetromino.forEach(index => squares[currentPosition + index].classList.add('taken'))

        // start a new tetromino
        getRandomTetromino()
        undrawNextTotromino()
        determineNextTetromino()
        drawNextTetromino()
        // Checks game over
        // Has to check squares[0..9]
        if (squares[5].classList.contains('taken')) { 
            console.log('Game Over')
            clearInterval(timerId) // Stop the gameLoop timer
        } else {
            checksIfRowComplete()
            currentPosition = startingPostion
        }
    } else {
        currentPosition += width
    }
}



// Display squares to show next tetromino
const displaySquares = Array.from(document.querySelectorAll('.minigrid div'))
const displayWidth = 4
const displayIndex = 1
const displayTetrominos = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0,displayWidth,displayWidth+1,displayWidth*2+1],
    [1,displayWidth,displayWidth+1,displayWidth+2],
    [0,1,displayWidth,displayWidth+1],
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1],
]

let nextTetromino = displayTetrominos[0]
function determineNextTetromino() {
    nextTetromino = displayTetrominos[Math.floor(Math.random() * displayTetrominos.length)]
    console.log(nextTetromino)
}

function drawNextTetromino() {
    // console.log(nextTetromino[0])
    nextTetromino.forEach(index => {
        displaySquares[index + displayIndex].classList.add('active')
    })
    // displaySquares[0].classList.add('active')
}

function undrawNextTotromino() {
    nextTetromino.forEach(index => {
        displaySquares[index + displayIndex].classList.remove('active')
    })
}


function getRandomTetromino() {
    
    if(nextTetromino==displayTetrominos[0]) {
        randomTetromino = 0
    } else if(nextTetromino==displayTetrominos[1]) {
        randomTetromino = 1
    } else if(nextTetromino==displayTetrominos[2]){
        randomTetromino = 2
    } else if(nextTetromino==displayTetrominos[3]) {
        randomTetromino = 3
    } else {
        nextTetromino = displayTetrominos[4]
    }
    randomNumber = Math.floor(Math.random()*theTetrominoes[randomTetromino].length)
    currentTetromino = theTetrominoes[randomTetromino][randomNumber]
}



getRandomTetromino()
drawNextTetromino()
let timerId = setInterval(gameLoop, 500) // in milliseconds
draw()
function gameLoop() {
    undraw()
    checksIfTaken()
    // checksIfRowComplete()
    draw()
}

function userInput(event) {
    if(event.keyCode === 37) {
      moveLeft()
    } else if (event.keyCode === 38) {
      rotate()
    } else if (event.keyCode === 39) {
      moveRight()
    } else if (event.keyCode === 40) {
      moveDown()
    }
  }

document.addEventListener('keyup', userInput)

function moveLeft() {
    undraw()
    const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1
    }
    draw()
  }

  function moveRight() {
    undraw()
    const isAtRightEdge = currentTetromino.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
}

function moveDown() {
    undraw()
    currentPosition +=10
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=10
    }
    draw()
}

function rotate() {
    undraw()
    console.log(currentTetromino)
    // currentTetromino = transpose(currentTetromino)
    // console.log(currentTetromino)
    // draw()
    randomNumber+=1
    if (randomNumber > (theTetrominoes[randomTetromino].length -1)) {
        randomNumber = 0
    }
    currentTetromino = theTetrominoes[randomTetromino][randomNumber]
    // undraw()
    draw()
}

function checksIfRowComplete() {
    for (let i = 0; i < 199; i+=width) { //sho20,etculd start loops at 0,10,
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9] //should check 0-9,10-19,etc
        // console.log(`${row}**************`)
        if (row.every(index => squares[index].classList.contains('taken'))) {
            row.forEach(index => squares[index].classList.remove('taken'))
            
            // deleteStuff()
            squares.splice(row[0],width)
            squares.unshift('div')
            console.log(squaresRemoved)

            // saved = squares.splice(row[0],10)
            // squares.prepend(saved)
            
            // squares = squares.splice(row[0],10)

            // var newdiv = document.createElement('div')
            // newdiv.style.background = 'red'
            // newdiv.innerHTML = 'MMEEE';
            // document.grid.insertBefore(newdiv,grid)

        }
    }
}

function deleteStuff() {
    grid.remove(190,10)
}



// //   New tet is never a long line!!!
// // Rotation at the edge of the map