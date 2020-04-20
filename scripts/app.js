const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Input boxes
const widthBox = document.getElementById("widthBox");
const heightBox = document.getElementById("heightBox");
const topBox = document.getElementById("topBox");
const leftBox = document.getElementById("leftBox");
const saveBtn = document.getElementById("saveBtn");

const newImg = document.getElementById("newImg");


widthBox.addEventListener("change", function () { ChangeBoxes(); });
heightBox.addEventListener("change", function () { ChangeBoxes(); });
topBox.addEventListener("change", function () { ChangeBoxes(); });
leftBox.addEventListener("change", function () { ChangeBoxes(); });

saveBtn.addEventListener("click", function () { Save(); });

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
document.addEventListener("mouseup", function (e) { MouseUp(e); });


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

		selection.left = selection.x - selection.width / 2;
		selection.top = selection.y - selection.height / 2;

		CheckSelection();

		Update();
	}
}

function MouseUp(e)
{
	selection.mDown = false;
}


function Update()
{
	UpdateBoxes();
	DrawSelection();
}

function DrawSelection()
{
	ctx.fillStyle = "rgba(0, 0, 0, 0.7)";

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.clearRect(selection.left, selection.top, selection.width, selection.height);

	ctx.strokeStyle = "#fff";

	ctx.beginPath();

	ctx.moveTo(selection.left, 0);
	ctx.lineTo(selection.left, canvas.height);

	ctx.moveTo(selection.left + selection.width, 0);
	ctx.lineTo(selection.left + selection.width, canvas.height);

	ctx.moveTo(0, selection.top);
	ctx.lineTo(canvas.width, selection.top);

	ctx.moveTo(0, selection.top + selection.height);
	ctx.lineTo(canvas.width, selection.top + selection.height);

	ctx.stroke();
}

function ChangeBoxes()
{
	selection.width = widthBox.value;
	selection.height = heightBox.value;
	selection.top = topBox.value;
	selection.left = leftBox.value;

	CheckSelection();
	Update();
}

function CheckSelection()
{
	if(selection.width < 100)
	{
		selection.width = 100;
	}

	if(selection.height < 100)
	{
		selection.height = 100;
	}

	if(selection.width > canvas.width)
	{
		selection.width = canvas.width;
	}

	if(selection.height > canvas.height)
	{
		selection.height = canvas.height;
	}

	if(selection.left < 0)
	{
		selection.left = 0;
	}

	if(selection.top < 0)
	{
		selection.top = 0;
	}

	if(selection.left > canvas.width - selection.width)
	{
		selection.left = canvas.width - selection.width;
	}

	if(selection.top > canvas.height - selection.height)
	{
		selection.top = canvas.height - selection.height;
	}
}

function UpdateBoxes()
{
	widthBox.value = selection.width;
	heightBox.value = selection.height;
	topBox.value = selection.top;
	leftBox.value = selection.left;
}

function Save()
{
	var xhr = new XMLHttpRequest();

	var params = "width=" + widthBox.value + "&height=" + heightBox.value + "&top=" + topBox.value + "&left=" + leftBox.value + "&cw=" + canvas.width + "&ch=" + canvas.height;

	xhr.open("GET", "editor.php?" + params, true);

	xhr.onload = function () 
	{
		if (xhr.status != 200) 
		{
			console.log(xhr.status + ": " + xhr.statusText);
		} 
		else 
		{
			console.log(xhr.responseText);

			if (xhr.responseText == "ok")
			{
				newImg.className = "a";
			}
			else
			{
				alert("Ошибка!");
			}
		}
	};

	xhr.send();
}
	
