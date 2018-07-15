var canvas;
var context;

window.onload = function()
{
	canvas = document.getElementById("plotCanvas");
	context = canvas.getContext("2d");

}

function plot()
{
	var a = Number(document.getElementById("inputA").value);
	var b = Number(document.getElementById("inputB").value);
	var equation = document.getElementById("plotType").value;
	
	var funEquation = document.getElementById("funEquation");
	var grid = document.getElementById("grid");
	var maxValues = Number(document.getElementById("maxVal").value);
		
	context.clearRect(0,0, canvas.width, canvas.height);
	
	
	var x0 = 0.5 * canvas.width;
	var y0 = 0.5 * canvas.height;
	var scale = (canvas.width/2)/maxValues;
	var x;
	var y;
	var dx = 0.01;
	var xMax = Math.round((canvas.width-x0)/dx);
	var xMin = Math.round(-x0/dx);
	var axes={};
	axes.x0 = x0;
	axes.y0 = y0;
	axes.scale = scale;
	
	drawAxes(context,axes, scale);
	
	context.beginPath();
	context.strokeStyle = "blue";
	context.lineWidth = 2;
	context.setLineDash([]);
	
		
	for (var i=xMin; i<xMax; i++)
	{
		x=dx*i;
		switch(equation)
		{
			case "1": y=a*x+b; funEquation.innerHTML="y="+a+"x+"+b; break;
			case "2": y=a*Math.pow(x,2)+b; funEquation.innerHTML="y="+a+"x<sup>2</sup>+"+b; break;	
			case "3": y=a*Math.pow(x,3)+b; funEquation.innerHTML="y="+a+"x<sup>3</sup>+"+b; break;
			case "4": y=a*Math.sin(x)+b; funEquation.innerHTML="y="+a+"sin(x)+"+b; break;
			case "5": y=a*Math.cos(x)+b; funEquation.innerHTML="y="+a+"cos(x)+"+b; break;
			case "6": y=a*Math.tan(x)+b; funEquation.innerHTML="y="+a+"tan(x)+"+b; break;
			case "7": y=a*(1/Math.tan(x))+b; funEquation.innerHTML="y="+a+"ctg(x)+"+b; break;
			default: break;
		}
		x *=scale;
		y *=scale;		
		if(i==xMin) context.moveTo(x0+x,y0-y);
		else context.lineTo(x0+x,y0-y); 
		
	}

	context.stroke();
}

function drawAxes(context, axes, scale)
{
	var x0=axes.x0;
	var y0=axes.y0;
	var width=context.canvas.width;
	var height = context.canvas.height;
	var xmin = 0;
	var step = 50;
	var unitStep = Math.round(step/scale);
	context.beginPath();
	context.strokeStyle = "red";
	context.lineWidth = 5;
	context.font = "Italic 15px Verdana";
	//----Y axis----
	context.moveTo(xmin,y0);
	context.lineTo(width,y0);
	//----X axis-----
	context.moveTo(x0,0);
	context.lineTo(x0,height);
	
	//---X arrow---
	context.moveTo(width,height/2);
	context.lineTo(width-15,(height/2)+10);
	context.moveTo(width,height/2);
	context.lineTo(width-15,(height/2)-10);
	//---Y arrow---
	context.moveTo(width/2,0);
	context.lineTo((width/2)-10,15);
	context.moveTo(width/2,0);
	context.lineTo((width/2)+10,15);
	context.stroke();

	//X - signs
	for(var i=x0, j=0; i<width; i+=step, j+=unitStep)
	{
		context.beginPath();
		setLineParams(context);
		context.moveTo(i,(height/2)-7);
		context.lineTo(i,(height/2)+7);
		context.fillText(j,i-5,(height/2)+20);
		context.stroke();
		
		if (grid.checked)
		{
			context.beginPath();
			setGridParams(context);
			context.moveTo(i,0);
			context.lineTo(i,height);
			context.stroke();
		}
	}
	for(var i=x0, j=0; i>0; i-=step, j-=unitStep)
	{
		context.beginPath();
		setLineParams(context);
		context.moveTo(i,(height/2)-7);
		context.lineTo(i,(height/2)+7);
		context.fillText(j,i-5,(height/2)+20);
		context.stroke();
		if (grid.checked)
		{
			context.beginPath();
			setGridParams(context);
			context.moveTo(i,0);
			context.lineTo(i,height);
			context.stroke();
		}
	}
	
	//Y - signs
	for(var i=y0, j=0; i<height; i+=step, j-=unitStep)
	{
		context.beginPath();
		setLineParams(context);
		context.moveTo((width/2)-7,i);
		context.lineTo((width/2)+7,i);
		context.fillText(j,(width/2)+10,i+5);
		context.stroke();
		if (grid.checked)
		{
			context.beginPath();
			setGridParams(context);
			context.moveTo(0,i);
			context.lineTo(width,i);
			context.stroke();
		}
	}
	for(var i=y0, j=0; i>0; i-=step, j+=unitStep)
	{
		context.beginPath();
		setLineParams(context);
		context.moveTo((width/2)-7,i);
		context.lineTo((width/2)+7,i);
		context.fillText(j,(width/2)+10,i+5);
		context.stroke();
		if (grid.checked)
		{
			context.beginPath();
			setGridParams(context);
			context.moveTo(0,i);
			context.lineTo(width,i);
			context.stroke();
		}
	}
}

function setLineParams(context)
{
	context.strokeStyle = "red";
	context.setLineDash([]);
	context.lineWidth = 5;
}

function setGridParams(context)
{
	context.strokeStyle = "black";
	context.setLineDash([5,5]);
	context.lineWidth = 1;
}





