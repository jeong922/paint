// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const modeBtn = document.querySelector('#mode-btn');
const clearBtn = document.querySelector('#clear-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const colorOptions = document.querySelectorAll('.color-option');
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGTH = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGTH;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';

let isPainting = false;

let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }

  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  const colorValue = event.target.value;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeColor() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = 'fill';
  } else {
    isFilling = true;
    modeBtn.innerText = 'drow';
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
  }
}

function clearCanvas() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
}

function onEraserClick() {
  ctx.strokeStyle = 'White';
  isFilling = false;
  modeBtn.innerText = 'fill';
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

colorOptions.forEach((color) => color.addEventListener('click', onColorClick));

modeBtn.addEventListener('click', onModeColor);
clearBtn.addEventListener('click', clearCanvas);
eraserBtn.addEventListener('click', onEraserClick);
