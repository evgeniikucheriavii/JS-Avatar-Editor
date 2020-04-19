const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();

image.addEventListener("load", function () { Init(); });

image.src = "images/photo.jpg";

function Init()
{
	canvas.width = image.width;
	canvas.height = image.height;
	Draw();
}

function Draw()
{
	ctx.drawImage(image, 0, 0);
}