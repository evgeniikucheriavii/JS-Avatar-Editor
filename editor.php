<?php

$filename = "images/photo.jpg";

if(isset($_GET['width'])
&& isset($_GET['height'])
&& isset($_GET['left'])
&& isset($_GET['top'])
&& isset($_GET['cw'])
&& isset($_GET['ch']))
{
	$width = $_GET['width'];
	$height = $_GET['height'];
	$top = $_GET['top'];
	$left = $_GET['left'];
	$cw = $_GET['cw'];
	$ch = $_GET['ch'];

	//Получаем размеры старого изображения
	list($oldWidth, $oldHeight) = getimagesize($filename);

	//Вычисляем новые размеры и позицию фрагмента
	//Для этого нужно сначала разделить значение, например, ширину, на ширину холста - так мы получим новую ширину в процентах
	//Затем этот процент нужно умножить на ширину оригинальной фотографии - так мы получим новое значение
	$newWidth = ($width / $cw) * $oldWidth;
	$newHeight = ($height / $ch) * $oldHeight;
	$newLeft = ($left / $cw) * $oldWidth;
	$newTop = ($top / $ch) * $oldHeight;

	//Создаём изображение с новыми размерами
	$output = imagecreatetruecolor($newWidth, $newHeight); 
	$source = imagecreatefromjpeg($filename);

	imagecopyresized($output, $source, 0, 0, $newLeft, $newTop, $newWidth, $newHeight, $newWidth, $newHeight);

	//Сохранение нового изображения
	$result = imagejpeg($output, "images/newphoto.jpg");

	if($result)
	{
		echo "ok";
	}
	else
	{
		echo "string"; "fail";
	}
}
else
{
	echo "Error!";
}


?>