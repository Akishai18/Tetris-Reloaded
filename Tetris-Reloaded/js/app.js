document.addEventListener('DOMContentLoaded', () => {
  const Width = 10
  const Height = 25
  const Size = Width * Height

  const grid = createGrid();
  let squares = Array.from(grid.querySelectorAll('div'))
  const startBtn = document.querySelector('.button-64')
  const menu = document.querySelector('.menu')
  const scoreDisplay = document.querySelector('.score-display')
  const linesDisplay = document.querySelector('.lines-score')
  const powerDisplay = document.querySelector('.power-up-display')
  let currentIndex = 0
  let currentRotation = 0
  const width = 10
  var score = 0
  let lines = 0
  let timerId
  let nextRandom = 0
  const colors = [
    'url(images/blue_block.png)',
    'url(images/pink_block.png)',
    'url(images/purple_block.png)',
    'url(images/peach_block.png)',
    'url(images/yellow_block.png)'
  ]

  const powerUps = ['slow','double','bonus','clear','reverse']
  var powerUpActive = 'slow'
  function createGrid() {
    // the main grid
    let grid = document.querySelector(".grid")
    for (let i = 0; i < Size; i++) {
      let gridElement = document.createElement("div")
      grid.appendChild(gridElement)
    }

    // set base of grid
    for (let i = 0; i < Width; i++) {
      let gridElement = document.createElement("div")
      gridElement.setAttribute("class", "block3")
      grid.appendChild(gridElement)
    }

    let previousGrid = document.querySelector(".previous-grid")
    for (let i = 0; i < 16; i++) {
      let gridElement = document.createElement("div")
      previousGrid.appendChild(gridElement);
    }
    return grid;
  }


  function control(e) {
    if (e.keyCode === 39 || e.key === 'd') {
      moveright()
    } else if (e.keyCode === 38 || e.key === 'w') {
      rotate()
    } else if (e.keyCode === 37 || e.key === 'a') {
      moveleft()
    } else if (e.keyCode === 40 || e.key === 's') {
      moveDown()
    }
  }

  document.addEventListener('keydown', control)

  //The Shapees
  const lShape = [
    [1, Width + 1, Width * 2 + 1, 2],
    [Width, Width + 1, Width + 2, Width * 2 + 2],
    [1, Width + 1, Width * 2 + 1, Width * 2],
    [Width, Width * 2, Width * 2 + 1, Width * 2 + 2]
  ]

  const zShape = [
    [0, Width, Width + 1, Width * 2 + 1],
    [Width + 1, Width + 2, Width * 2, Width * 2 + 1],
    [0, Width, Width + 1, Width * 2 + 1],
    [Width + 1, Width + 2, Width * 2, Width * 2 + 1]
  ]

  const tShape = [
    [1, Width, Width + 1, Width + 2],
    [1, Width + 1, Width + 2, Width * 2 + 1],
    [Width, Width + 1, Width + 2, Width * 2 + 1],
    [1, Width, Width + 1, Width * 2 + 1]
  ]

  const oShape = [
    [0, 1, Width, Width + 1],
    [0, 1, Width, Width + 1],
    [0, 1, Width, Width + 1],
    [0, 1, Width, Width + 1]
  ]

  const iShape = [
    [1, Width + 1, Width * 2 + 1, Width * 3 + 1],
    [Width, Width + 1, Width + 2, Width + 3],
    [1, Width + 1, Width * 2 + 1, Width * 3 + 1],
    [Width, Width + 1, Width + 2, Width + 3]
  ]

  const theShapees = [lShape, zShape, tShape, oShape, iShape]

  //Randomly Select Shape
  let random = Math.floor(Math.random() * theShapees.length)
  let current = theShapees[random][currentRotation]


  //move the Shape moveDown
  let currentPosition = 4
  //draw the shape
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('block')
      squares[currentPosition + index].style.backgroundImage = colors[random]
    })
  }

  //undraw the shape
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('block')
      squares[currentPosition + index].style.backgroundImage = 'none'
    })
  }

  //move down on loop
  function moveDown() {
    undraw()
    currentPosition = currentPosition += width
    draw()
    freeze()
  }

  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * theShapees.length)
      displayShape()
    }
  })

  function moveright() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    if (!isAtRightEdge) currentPosition += 1
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      currentPosition -= 1
    }
    draw()
  }

  function moveleft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if (!isAtLeftEdge) currentPosition -= 1
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      currentPosition += 1
    }
    draw()
  }

  //freeze the shape
  function freeze() {
    // if block has settled
    if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') || squares[currentPosition + index + width].classList.contains('block2'))) {
      // make it block2
      current.forEach(index => squares[index + currentPosition].classList.add('block2'))
      // start a new Shape falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theShapees.length)
      current = theShapees[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }
  freeze()

  //Rotate the Shape
  function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theShapees[random][currentRotation]
    draw()
  }

  //Game Over
  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      scoreDisplay.innerHTML = 'end'
      clearInterval(timerId)
    }
  }

  //show previous Shape in scoreDisplay
  const displayWidth = 4
  const displaySquares = document.querySelectorAll('.previous-grid div')
  let displayIndex = 0

  const smallShapees = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lShape */
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zShape */
    [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tShape */
    [0, 1, displayWidth, displayWidth + 1], /* oShape */
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iShape */
  ]

  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('block')
      square.style.backgroundImage = 'none'
    })
    smallShapees[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('block')
      displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
    })
  }

  function addScore() {
    for (currentIndex = 0; currentIndex < Size; currentIndex += Width) {
      const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
      if (row.every(index => squares[index].classList.contains('block2'))) {
        if (powerUpActive == "double"){
          score += 20
        } else {
          score += 10
        }
        lines += 1
        scoreDisplay.innerHTML = score
        linesDisplay.innerHTML = lines
        row.forEach(index => {
          squares[index].style.backgroundImage = 'none'
          squares[index].classList.remove('block2') || squares[index].classList.remove('block')
        })
        const squaresRemoved = squares.splice(currentIndex, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
        // Activate power-up every 10 points
        if (score % 10 === 0 && score !== 0) {
          activatePowerUp()
        }
      }
    }
  }

  function activatePowerUp() {
    const randomIndex = Math.floor(Math.random() * powerUps.length);
    powerUpActive = powerUps[randomIndex];
    
    if (powerUpActive === 'slow') {
      timerId = setInterval(moveDown, 500);
      setTimeout(() => {
        clearInterval(timerId); // Clear the temporary interval
        timerId = setInterval(moveDown, originalInterval); // Set the original interval
      }, 60000); // 1 minute in milliseconds
      powerDisplay.innerHTML = '2x Speed'
    } else if (powerUpActive === 'bonus') {
      score += 100;
      scoreDisplay.innerHTML = score;
      powerDisplay.innerHTML = 'Bonus Points'
    } else if (powerUpActive === 'double') {
      // Double points power-up is active
      setTimeout(() => {
        powerUpActive = null; // Deactivate power-up after 1 minute
      }, 60000); // 1 minute in milliseconds
      powerDisplay.innerHTML = '2x Points'
    } else if (powerUpActive === 'clear'){
      for (currentIndex = 0; currentIndex < Size; currentIndex += Width) {
        const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
        row.forEach(index => {
          squares[index].style.backgroundImage = 'none'
          squares[index].classList.remove('block2') || squares[index].classList.remove('block')
        })
        const squaresRemoved = squares.splice(currentIndex, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
      powerDisplay.innerHTML = 'Clear Grid'
    } else if (powerUpActive === 'reverse') {
      document.removeEventListener('keydown', control);
      document.addEventListener('keydown', reverseControl);

      powerDisplay.innerHTML = 'Controls Reversed';

      setTimeout(() => {
          document.removeEventListener('keydown', reverseControl);
          document.addEventListener('keydown', control);
          powerDisplay.innerHTML = ''; 
      }, 60000); // 1 minute in milliseconds
  }
  
  }
  function reverseControl(e) {
    if (e.keyCode === 39 || e.key === 'd') {
        moveleft();
    } else if (e.keyCode === 38 || e.key === 'w') {
        moveDown(); 
    } else if (e.keyCode === 37 || e.key === 'a') {
        moveright(); 
    } else if (e.keyCode === 40 || e.key === 's') {
        rotate(); 
    }
}

})
