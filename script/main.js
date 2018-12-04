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
