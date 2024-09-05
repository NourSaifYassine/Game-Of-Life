let size = 50;
let htmlElements;
let cells;
let EMPTY = 0;
let ALIVE = 1;
let isRunning = false;
let intervalId;
let startBtn = document.getElementById('start');
let field = document.getElementById('field');
let tr = document.createElement('tr');
let td = document.createElement('td');
let table = document.querySelector('table');
let letterPatterns = {}; 

init();
clearField();

letterPatterns['K'] = [
    [ALIVE, EMPTY, EMPTY, ALIVE],
    [ALIVE, EMPTY, ALIVE, EMPTY],
    [ALIVE, ALIVE, EMPTY, EMPTY],
    [ALIVE, EMPTY, ALIVE, EMPTY],
    [ALIVE, EMPTY, EMPTY, ALIVE]
];

function createField() {
    htmlElements = [];
    cells = [];
    for (let y = 0; y < size; y++) {
        let tr = document.createElement('tr');
        let tdElements = [];
        cells.push(new Array(size).fill(EMPTY));
        htmlElements.push(tdElements);
        field.appendChild(tr);
        for (let x = 0; x < size; x++) {
            let td = document.createElement('td');
            tdElements.push(td);
            tr.appendChild(td);
            td.addEventListener('click', function () {
                toggleCellState(x, y);
                td.setAttribute('id', `cell${x}`);
            });
        }
    }
}

function toggleCellState(x, y) {
    cells[y][x] = cells[y][x] == ALIVE ? EMPTY : ALIVE;
    draw();
}

function draw() {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            htmlElements[y][x].setAttribute('class', 'cell ' + (cells[y][x] == 1 ? 'filled' : 'empty'));
        }
    }
}

function countNeibhours(x, y) {
    let count = 0;
    for (dy = -1; dy <= 1; dy++) {
        for (dx = -1; dx <= 1; dx++) {
            let nx = (x + dx + size) % size, ny = (y + dy + size) % size;
            count = count + cells[ny][nx];
        }
    }
    return count - cells[y][x];
}

function newGeneration() {
    let newCells = [];
    for (let i = 0; i < size; i++) {
        newCells.push(new Array(size).fill(EMPTY));
    }
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let neibhours = countNeibhours(x, y);
            if (cells[y][x] == EMPTY && neibhours == 3) {
                newCells[y][x] = ALIVE;
            }
            if (cells[y][x] == ALIVE && (neibhours == 2 || neibhours == 3)) {
                newCells[y][x] = ALIVE;
            }
        }
    }
    cells = newCells;
    draw();
}

function init() {
    createField();
    draw();
}

function myFunction() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(newGeneration, 100);
    }
}

function stopGame() {
    isRunning = false;
    clearInterval(intervalId);
}

function clearField() {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            cells[y][x] = EMPTY;
        }
    }
    draw();
    stopGame();
}

function randomize() {
    for (let i = 0; i < Math.floor(size * size * 0.3); i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * size), y = Math.floor(Math.random() * size);
            if (cells[y][x] == EMPTY) {
                cells[y][x] = ALIVE;
                break;
            }
        } while (isRunning);
    }
    draw();
    stopGame();
}

function countAliveAndDeadCells() {
    let aliveCount = 0;
    let deadCount = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (cells[y][x] == ALIVE) {
                aliveCount++;
            } else {
                deadCount++;
            }
        }
    }
    console.log(`Alive: ${aliveCount}, Dead: ${deadCount}`);
    return { aliveCount, deadCount };
}

function insertPattern(pattern, startX, startY) {
    for (let y = 0; y < pattern.length; y++) {
        for (let x = 0; x < pattern[y].length; x++) {
            if (startY + y < size && startX + x < size) {
                cells[startY + y][startX + x] = pattern[y][x];
            }
        }
    }
    draw();
}

// document.addEventListener('keydown', function (event) {
//     if (event.key.toUpperCase() === 'K') {
//         insertPattern(letterPatterns['K'], 10, 10);
//     }
// });

// document.addEventListener('keydown', function (event) {
//   for (let i = 2; i < x;)
//   if (event.key.toUpperCase() === 'K') {
//       insertPattern(letterPatterns['K'], 10, 10);
//   }
// });

document.addEventListener('keydown', function (event) {
  if (event.key.toUpperCase() === 'K') {
      const cellX = Number(pageX.innerText); 
      const cellY = Number(pageY.innerText); 

      insertPattern(letterPatterns['K'], cellX, cellY);
  }
});

const cellField = document.querySelector(".cell-field");
const pageX = document.getElementById("x");
const pageY = document.getElementById("y");

cellField.addEventListener("mousemove", function (event) {
  const rect = cellField.getBoundingClientRect();
  const mouseX = event.clientX - rect.left; 
  const mouseY = event.clientY - rect.top; 

  const cellX = Math.floor((mouseX / rect.width) * size); 
  const cellY = Math.floor((mouseY / rect.height) * size);

  pageX.innerText = cellX; 
  pageY.innerText = cellY;
}, false);




