// Definindo o canvas.
var canvas = document.querySelector("#canvas");
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var context = canvas.getContext("2d");
start();
setTimeout(loop, 60);