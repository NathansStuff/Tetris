const grid = document.querySelector('grid')
const squares = Array.from(document.querySelectorAll('.grid div'))
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

function getRandomTetromino() {
    randomTetromino = Math.floor(Math.random()*theTetrominoes.length)
    randomNumber = Math.floor(Math.random()*theTetrominoes[randomTetromino].length)
    currentTetromino = theTetrominoes[randomTetromino][randomNumber]
}

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
            currentPosition = startingPostion
        }
    } else {
        currentPosition += width
    }
}


getRandomTetromino()
let timerId = setInterval(gameLoop, 100) // in milliseconds
function gameLoop() {
    undraw()
    checksIfTaken()
    draw()
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