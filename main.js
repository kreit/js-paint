/*******************
 * OUR HELPER CODE *
*******************/

const gridWidth = 10;
let count = 0;
while (count <= gridWidth * gridWidth) {
const canvas = document.querySelector('.canvas');
let isMouseDown = false;
const square = document.createElement('div');
square.classList.add('square');
canvas.appendChild(square);
count++;
}

// You probably should NOT do these in the order below.
// That is, you probably should NOT do all the queries,
// THEN all the functions,
// THEN all the wiring.

// Instead, it'll be easier if you go one action at a time!
// So, add a query for the palette colors.
// THEN add an event listener function for what happens when one is clicked.
// THEN wire those two together, so that when the palette elements are clicked,
// the function runs.
//
// And proceed from there to getting the squares working.
//

const squares = document.querySelectorAll('.square');
const paletteColors = document.querySelectorAll('.palette-color');
const brush = document.querySelector('#current-brush');

/****************************
 * EVENT LISTENER FUNCTIONS *
****************************/

function handleSquareClick(event) {
  const currentColor = brush.classList[1];
  event.target.classList.replace(event.target.classList[1], currentColor);
}

function handlePaletteClick(event) {
  const newColor = event.target.classList[1];
  brush.classList.replace(brush.classList[1], newColor);
}

function handleMouseEnter(event) {
  if (isMouseDown) {
    const currentColor = brush.classList[1];
    event.target.classList.replace(event.target.classList[1], currentColor);
  }
}

function handleMouseDown() {
  isMouseDown = true;
}

function handleMouseUp() {
  isMouseDown = false;
}

/**************************
 * WIRING IT ALL TOGETHER *
**************************/


squares.forEach(square => {
  square.addEventListener('click', handleSquareClick);
  square.addEventListener('mouseenter', handleMouseEnter);
});

paletteColors.forEach(color => {
  color.addEventListener('click', handlePaletteClick);
});

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);