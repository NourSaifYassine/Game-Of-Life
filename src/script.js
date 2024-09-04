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

init();
clearField();

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
            });
        }
    }
}

function toggleCellState(x, y) {
    cells[y][x] = cells[y][x] == ALIVE ? EMPTY : ALIVE;
    draw();
};

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

let restart = document.getElementById('restart');
restart.addEventListener('click', () => {
    location.reload();
});

function clearField() {
  for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
          cells[y][x] = EMPTY;
      }
  }
  draw();

  stopGame();
}
