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
 * HELPER FUNCTION *
 ****************************/

// Get the color class from an element (color-1, color-2, etc.)
function getColorClass(element) {
    return Array.from(element.classList).find(cls => cls.startsWith('color-'));
}

/****************************
 * EVENT LISTENER FUNCTIONS *
 ****************************/

function handlePaletteClick(event) {
    rainbowMode = false;
    rainbowBtn.textContent = '🌈 Rainbow Mode';
    const selectedColor = getColorClass(event.target);
    const currentColor = getColorClass(currentBrush);
    console.log('Changing brush from', currentColor, 'to', selectedColor);
    currentBrush.classList.remove(currentColor);
    currentBrush.classList.add(selectedColor);
}

function handleSquareClick(event) {
    console.log('Square clicked!', event.target);
    const square = event.target;
    paintSquare(square);
}

function handleSquareMouseEnter(event) {
    if (isMouseDown) {
        const square = event.target;
        paintSquare(square);
    }
}

function paintSquare(square) {
    const currentColor = getColorClass(square);
    let newColor;
    
    if (rainbowMode) {
        const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } else {
        newColor = getColorClass(currentBrush);
    }
    
    console.log('Current:', currentColor, 'New:', newColor);
    
    if (currentColor && newColor) {
        square.classList.remove(currentColor);
        square.classList.add(newColor);
        console.log('Color changed!');
    }
    
    square.classList.add('sparkle');
    setTimeout(() => square.classList.remove('sparkle'), 600);
}

function handleMouseDown() {
    isMouseDown = true;
}

function handleMouseUp() {
    isMouseDown = false;
}

function clearCanvas() {
    canvasSquares.forEach(square => {
        const currentColor = getColorClass(square);
        if (currentColor) {
            square.classList.remove(currentColor);
            square.classList.add('color-8');
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
console.log('Current brush color:', getColorClass(currentBrush));
