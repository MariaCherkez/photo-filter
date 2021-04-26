const link = 'https://raw.githubusercontent.com/mariacherkez/photo-filter/gh-pages/photo-filter/assets/img/';
const img = document.getElementsByClassName('img')[0];
const canvas = document.querySelector('canvas');
const fullScreenButton = document.querySelector('.fullscreen');
const inputFile = document.getElementsByClassName('btn-load')[0];
const filtersContainer = document.getElementsByClassName('filters')[0];
const buttonNext = document.getElementsByClassName('btn-next')[0];
const buttonSave = document.getElementsByClassName('btn-save')[0];
const buttonReset = document.getElementsByClassName('btn-reset')[0];
let count = 1;
let linkImg;
const imgCanvas = new Image();

document.addEventListener('DOMContentLoaded', loadImg);

fullScreenButton.addEventListener ('click', event => {
  if (!document.fullscreenElement) {		
    document.documentElement.requestFullscreen();
    event.target.classList.remove('openfullscreen');
    event.target.classList.add('exitfullscreen'); 
  } else {
    document.exitFullscreen();
    event.target.classList.remove('exitfullscreen');
    event.target.classList.add('openfullscreen');		
  }
});

buttonNext.addEventListener('click', loadImg);
buttonSave.addEventListener('click', function(e) {
  let linkImg = document.createElement('a');
  linkImg.download = 'download.png';
  linkImg.href = canvas.toDataURL();
  linkImg.click();
  linkImg.delete; 
});

buttonReset.addEventListener('click', function(e) {
  img.style.setProperty('--blur', '0px');   
  img.style.setProperty('--invert', '0%');	 
  img.style.setProperty('--sepia', '0%');	 
  img.style.setProperty('--saturate', '100%');	 
  img.style.setProperty('--hue', '0deg');
  
  for (let element of  filtersContainer.children) {
    if (element.children[0].name == 'saturate') {
      element.children[0].value = 100;
      element.children[1].value = 100;
    } else {
      element.children[0].value = 0;
      element.children[1].value = 0;
    }	  
  }
   canvas.getContext("2d").filter = 'none';
   canvas.getContext("2d").drawImage(imgCanvas, 0, 0);
});

inputFile.addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => { 
    img.src = reader.result;
    imgCanvas.src = reader.result; 
    canvas.getContext("2d").drawImage(imgCanvas, 0, 0); 
  }
  reader.readAsDataURL(file);
});

function loadImg() {
  if (count < 20)
    count++;
  else
    count = 1;

const date = new Date();
let hours = date.getHours();
let time = '';

if (hours >= 6 && hours <= 11 ) {
  time = 'morning';	
}
else if (hours >= 12 && hours <= 17 ) {
  time = 'day';
}
else if (hours >= 18 && hours <= 23 ) {
  time = 'evening';
}
else {	
  time = 'night';
}
let number = `${count}`;
if (count < 10)
  number = `0${count}`;
 	
img.src = `${link}${time}/${number}.jpg`;
drawImage();
}

function drawImage() { 
    imgCanvas.setAttribute('crossOrigin', 'anonymous'); 
    imgCanvas.src = img.src;
    imgCanvas.onload = function() {
      canvas.width = imgCanvas.width;
      canvas.height = imgCanvas.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imgCanvas, 0, 0); 
    };  
}

filtersContainer.addEventListener ('input', function(e) {
  switch (e.target.name) {
    case 'blur':
    img.style.setProperty('--blur', `${e.target.value}px`);
    canvas.getContext("2d").filter = `blur(${e.target.value}px)`;     
    break;
    case 'invert':
    img.style.setProperty('--invert', `${e.target.value}%`);
    canvas.getContext("2d").filter = `invert(${e.target.value}%)`;
    break;
    case 'sepia':
    img.style.setProperty('--sepia', `${e.target.value}%`);
    canvas.getContext("2d").filter = `sepia(${e.target.value}%)`;
    break;
    case 'saturate':
    img.style.setProperty('--saturate', `${e.target.value}%`);
    canvas.getContext("2d").filter = `saturate(${e.target.value}%)`;
    break;
    case 'hue':
    img.style.setProperty('--hue', `${e.target.value}deg`);
    canvas.getContext("2d").filter = `hue-rotate(${e.target.value}deg)`;
    break;		
  } 
  e.target.parentElement.children[1].value = e.target.value;
  
  
  let filterCanvas = `blur(${document.getElementsByName('blur')[0].value}px)  
  invert(${document.getElementsByName('invert')[0].value}%) 
  sepia(${document.getElementsByName('sepia')[0].value}%)
  saturate(${document.getElementsByName('saturate')[0].value}%) 
  hue-rotate(${document.getElementsByName('hue')[0].value}deg)`;
 
  canvas.getContext("2d").filter = filterCanvas;
  canvas.getContext("2d").drawImage(imgCanvas, 0, 0);
  
});
