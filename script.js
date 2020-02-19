// Make the grid
const numberOfSquareInGrid = 700;
let gridRows = [];
const grid = document.getElementsByClassName("grid")[0];
// const startButton = document.getElementsById("start");
// const stopButton = document.getElementsById("stop");

// console.log(grid);

// make the rows
for (let row = 0; row < numberOfSquareInGrid / 10; row++) {
    gridRows[row] = [];

    // make squares in row
    for (let square = 0; square < numberOfSquareInGrid / 10; square++) {
        gridRows[row][square] = false;
    }
}

// console.log(gridRows)

// on click of square
// make its data-alive attribute the opposite
function toggleAlive(rowIndex, squareIndex) {
    const square = document.getElementById(`grid-item-${rowIndex}-${squareIndex}`);
    const isAlive = square.dataset.alive;

    if (isAlive === "false") { 
        square.setAttribute("data-alive", true);
        gridRows[rowIndex][squareIndex] = true;
    }　else {
        square.setAttribute("data-alive", false); 
        gridRows[rowIndex][squareIndex] = false;
    }
}


function renderGrid(incomingGrid) {
    gridRows = [];
    // render (make) the grid
    let gridHTML = ""

    incomingGrid.forEach((row, rowIndex) => {
        gridHTML += `<div id="grid-${rowIndex}" class="grid-row">${
            row.map((square, squareIndex) => 
                `<div 
                    onClick="toggleAlive(${rowIndex}, ${squareIndex})"
                    id="grid-item-${rowIndex}-${squareIndex}" 
                    class="grid-item" 
                    data-alive="${square}"
                ></div>`)
                    .join("")
        }</div>`
    })
    grid.innerHTML = gridHTML;
    return gridRows = [ ...incomingGrid];
}

function isEachSquareDeadOrAlive() {
    let newGrid = [...gridRows];

    gridRows.forEach((row,rowIndex) => {
        row.forEach((square, squareIndex) => {
            let neighbour1 = null; 
            let neighbour2 = null;
            let neighbour3 = null;
            let neighbour4 = null;
            let neighbour5 = null;
            let neighbour6 = null;
            let neighbour7 = null;
            let neighbour8 = null;

            if (gridRows[rowIndex - 1] !== undefined) {
                if (gridRows[rowIndex - 1][squareIndex - 1] !== undefined) neighbour1 = gridRows[rowIndex - 1][squareIndex - 1];
                
                neighbour2 = gridRows[rowIndex - 1][squareIndex];

                if (gridRows[rowIndex - 1][squareIndex + 1] !== undefined) neighbour3 = gridRows[rowIndex - 1][squareIndex + 1];
            } 

            if (gridRows[rowIndex][squareIndex - 1] !== undefined) neighbour4 = gridRows[rowIndex][squareIndex - 1];
            if (gridRows[rowIndex][squareIndex + 1] !== undefined) neighbour5 = gridRows[rowIndex][squareIndex + 1];

            if (gridRows[rowIndex + 1] !== undefined) {
                if (gridRows[rowIndex + 1][squareIndex - 1] !== undefined) neighbour6 = gridRows[rowIndex + 1][squareIndex - 1];
                neighbour7 = gridRows[rowIndex + 1][squareIndex];
                if (gridRows[rowIndex + 1][squareIndex + 1] !== undefined) neighbour8 = gridRows[rowIndex + 1][squareIndex + 1];
            }

            const neighbours = [neighbour1,neighbour2,neighbour3,neighbour4,neighbour5,neighbour6,neighbour7,neighbour8];


            let sumOfAliveNeighbours = 0;

            for(let i =0; i < neighbours.length ; i++) {
                const neighbour = neighbours[i];
                if (neighbour === true) sumOfAliveNeighbours += 1
            }

            if (square === true) {
                if (sumOfAliveNeighbours <= 1) newGrid[rowIndex][squareIndex] = false;
                if (sumOfAliveNeighbours > 1 && sumOfAliveNeighbours < 4) newGrid[rowIndex][squareIndex] = true;
                if (sumOfAliveNeighbours >= 4) newGrid[rowIndex][squareIndex] = false;
            } else {
                if (sumOfAliveNeighbours === 3) newGrid[rowIndex][squareIndex] = true;
                else newGrid[rowIndex][squareIndex] = false;
            }
        });
    });

    renderGrid(newGrid);
}


// Add event listeners on each grid item
// on click, populate
isEachSquareDeadOrAlive()

let timer = setInterval(() => isEachSquareDeadOrAlive(),2000);

function startTimer() {
    timer = setInterval(() => isEachSquareDeadOrAlive(),2000);
}

function stopTimer() {
    clearInterval(timer);
}


// make timer
// after timer, run function to check neighbours

// [
//     [true,false,false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false,false,false],
//     [false,false,false,f a l s e,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false,false,false],
// ]




