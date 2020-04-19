const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Input boxes
const widthBox = document.getElementById("widthBox");
const heightBox = document.getElementById("heightBox");
const topBox = document.getElementById("topBox");
const leftBox = document.getElementById("leftBox");

const image = document.getElementById("image");

image.addEventListener("load", function () { Init(); });

image.src = "images/photo.jpg";

var selection = 
{
	mDown: false,
	x: 0,
	y: 0,
	top: 50,
	left: 50,
	width: 100,
	height: 100
};

canvas.addEventListener("mousedown", function (e) { MouseDown(e); });
canvas.addEventListener("mousemove", function (e) { MouseMove(e); });
canvas.addEventListener("mouseup", function (e) { MouseUp(e); });


function Init()
{
	canvas.width = image.width;
	canvas.height = image.height;

	canvas.setAttribute("style", "top: " + (image.offsetTop + 5) + "px; left: " + (image.offsetLeft + 5) + "px;");

	leftBox.setAttribute("max", image.width - 100);
	topBox.setAttribute("max", image.height - 100);

	widthBox.setAttribute("max", image.width);
	heightBox.setAttribute("max", image.height);

	//DrawImage();
	DrawSelection();
}

function Update()
{
	UpdateBoxes();
	DrawSelection();
}

function DrawSelection()
{
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.clearRect(selection.left, selection.top, selection.width, selection.height);
}

function UpdateBoxes()
{
	widthBox.value = selection.width;
	widthBox.height = selection.height;
	widthBox.top = selection.top;
	widthBox.left = selection.left;
}

function MouseDown(e)
{
	selection.mDown = true;
}

function MouseMove(e)
{
	if(selection.mDown)
	{
		selection.x = e.clientX - canvas.offsetLeft;
		selection.y = e.clientY - canvas.offsetTop;

		Update();
	}
	
}

function MouseUp(e)
{
	selection.mDown = false;
}