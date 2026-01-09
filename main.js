/*******************
 * PIXEL PAINT APP *
 *******************/

const gridWidth = 10;
let isMouseDown = false;
let rainbowMode = false;

// Create the canvas grid FIRST
const canvas = document.querySelector('.canvas');
let count = 0;

while (count < gridWidth * gridWidth) {
    const square = document.createElement('div');
    square.classList.add('square', 'color-8');
    canvas.appendChild(square);
    count++;
}

/***********
 * QUERIES *
 ***********/
const paletteColors = document.querySelectorAll('.palette-color');
const currentBrush = document.querySelector('#current-brush');
const canvasSquares = document.querySelectorAll('.square');
const clearBtn = document.querySelector('#clear-canvas');
const rainbowBtn = document.querySelector('#rainbow-mode');

/****************************
 * EVENT LISTENER FUNCTIONS *
 ****************************/

function handlePaletteClick(event) {
    console.log('Palette clicked!', event.target);
    rainbowMode = false;
    rainbowBtn.textContent = '🌈 Rainbow Mode';
    const selectedColor = event.target.classList[1];
    const currentColor = currentBrush.classList[1];
    console.log('Changing brush from', currentColor, 'to', selectedColor);
    currentBrush.classList.replace(currentColor, selectedColor);
}

function handleSquareClick(event) {
    console.log('Square clicked!', event.target);
    const square = event.target;
    paintSquare(square);
}

function handleSquareMouseEnter(event) {
    if (isMouseDown) {
        console.log('Dragging over square');
        const square = event.target;
        paintSquare(square);
    }
}

function paintSquare(square) {
    console.log('Painting square...');
    const currentColor = square.classList[1];
    let newColor;
    
    if (rainbowMode) {
        const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } else {
        newColor = currentBrush.classList[1];
    }
    
    console.log('Current:', currentColor, 'New:', newColor);
    
    if (currentColor && newColor) {
        square.classList.replace(currentColor, newColor);
        console.log('Color replaced!');
    } else {
        console.log('ERROR: Missing color!', 'current:', currentColor, 'new:', newColor);
    }
    
    square.classList.add('sparkle');
    setTimeout(() => square.classList.remove('sparkle'), 600);
}

function handleMouseDown() {
    isMouseDown = true;
    console.log('Mouse down');
}

function handleMouseUp() {
    isMouseDown = false;
    console.log('Mouse up');
}

function clearCanvas() {
    console.log('Clearing canvas');
    canvasSquares.forEach(square => {
        const currentColor = square.classList[1];
        if (currentColor) {
            square.classList.replace(currentColor, 'color-8');
        }
    });
}

function toggleRainbowMode() {
    rainbowMode = !rainbowMode;
    if (rainbowMode) {
        rainbowBtn.textContent = '✨ Rainbow ON!';
    } else {
        rainbowBtn.textContent = '🌈 Rainbow Mode';
    }
    console.log('Rainbow mode:', rainbowMode);
}

/**************************
 * WIRING IT ALL TOGETHER *
 **************************/

paletteColors.forEach(paletteColor => {
    paletteColor.addEventListener('click', handlePaletteClick);
});

canvasSquares.forEach(square => {
    square.addEventListener('click', handleSquareClick);
    square.addEventListener('mouseenter', handleSquareMouseEnter);
});

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);

clearBtn.addEventListener('click', clearCanvas);
rainbowBtn.addEventListener('click', toggleRainbowMode);

console.log('🎨 Pixel Paint Studio loaded successfully!');
console.log('Canvas squares found:', canvasSquares.length);
console.log('Palette colors found:', paletteColors.length);
console.log('Current brush element:', currentBrush);
console.log('Current brush color:', currentBrush.classList[1]);
