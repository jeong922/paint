// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const textInput = document.querySelector('#text');
const fileInput = document.querySelector('#file');
const modeBtn = document.querySelector('#mode-btn');
const clearBtn = document.querySelector('#clear-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const colorOptions = document.querySelectorAll('.color-option');
const lineWidth = document.querySelector('#line-width');
const fontSize = document.querySelector('#font-size');
const fontFamily = document.querySelector('#font-family');
const textStyle = document.querySelector('#text-style');
const color = document.querySelector('#color');
const saveBtn = document.querySelector('#save');
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
    modeBtn.innerHTML = `
      <i class="fas fa-fill-drip"></i>
      <span>fill</span>
    `;
  } else {
    isFilling = true;
    modeBtn.innerHTML = `
      <i class="fas fa-paint-brush"></i>
      <span>drow</span>
    `;
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
  }
}

function clearCanvas() {
  // ctx.fillStyle = 'white';
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
}

function onEraserClick() {
  ctx.strokeStyle = 'White';
  isFilling = false;
  modeBtn.innerHTML = `
    <i class="fas fa-fill-drip"></i>
    <span>fill</span>
  `;
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  const x = event.offsetX;
  const y = event.offsetY;
  if (text !== '') {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${fontSize.value}px ${onfontFamilyChange()}`;
    onfontStyleChange(text, x, y);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myImage🎨.png';
  a.click();
}

// 폰트 크기 변경, 폰트 변경,
// 폰트 fill or stroke 선택

function onfontStyleChange(text, x, y) {
  if (textStyle.options[textStyle.selectedIndex].value == 'stroke') {
    ctx.strokeText(text, x, y);
  } else if (textStyle.options[textStyle.selectedIndex].value == 'fill') {
    ctx.fillText(text, x, y);
  }
}

function onfontFamilyChange() {
  if (fontFamily.options[fontFamily.selectedIndex].value == 'serif') {
    return 'serif';
  } else if (
    fontFamily.options[fontFamily.selectedIndex].value == 'sans-serif'
  ) {
    return 'sans-serif';
  }
}

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);
textStyle.addEventListener('change', onfontStyleChange);
fontFamily.addEventListener('change', onfontFamilyChange);

colorOptions.forEach((color) => color.addEventListener('click', onColorClick));

modeBtn.addEventListener('click', onModeColor);
clearBtn.addEventListener('click', clearCanvas);
eraserBtn.addEventListener('click', onEraserClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
