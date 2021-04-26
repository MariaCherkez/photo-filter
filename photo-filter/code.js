document.querySelector('.fullscreen').addEventListener ('click', event => {
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

const inputs = document.querySelectorAll('input[type=range]');

for (let input of inputs) {
	input.addEventListener ('input', event => {
	
	 event.target.parentElement.children[1].value = event.target.value;
});
	
}



 