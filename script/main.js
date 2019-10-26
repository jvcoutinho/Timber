// Definindo o canvas.
var canvas = document.querySelector("#canvas");
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var context = canvas.getContext("2d");
console.log("Na main antes do start");
start();
console.log("Na main apos o start\n");
console.log("Na main antes o chamar updateBranches");
console.log("Imprimindo o vetor de galhos antes de atualizar os galhos");
console.log(branchPositions);
updateBranches();
console.log("Imprimindo o vetor de galhos após de atualizar os galhos");
console.log(branchPositions);
console.log("Na main apos o chamar updateBranches");
setTimeout(loop, 60);

function resize() {
	// Our canvas must cover full height of screen
	// regardless of the resolution
	var height = window.innerHeight;
	
	// So we need to calculate the proper scaled width
	// that should work well with every resolution
	var ratio = canvas.width/canvas.height;
	var width = height * ratio;
	
	canvas.style.width = width+'px';
	canvas.style.height = height+'px';
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);
var scoreDIV = document.querySelector("#score");

start();
loadMusic('6U7VUPf8d3K1dY0UNMdDXS');
setTimeout(loop, 60);
