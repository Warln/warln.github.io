function vcv(v, visW, visH){
	v.canvas.style.width = visW;
	v.canvas.style.height = visH;
	v.canvas.width = parseInt(v.canvas.style.width) * (window.devicePixelRatio || 1);
	v.canvas.height = parseInt(v.canvas.style.height) * (window.devicePixelRatio || 1);
	v.drawGrid = drawGrid;
	v.drawText = drawText;
	v.clear = clear;
	v.clearAll = clearAll;
	v.getBin = getBin;
	v.getBins = getBins;
	v.refresh = refresh;
	v.getDt = getDt;
	v.bhatch = bhatch;
	return v;
}


var msg = layer.msg;
window.onload = function(){
	layer.msg(vcv);
	//msg(vcv);
};


var refresh = function(char, rows, columns, angle, threshold){
	this.clearAll();
	this.drawGrid(rows, columns);
	if(arguments[3] % 90 === 0){
		this.drawText(char, arguments[3]);
		var bin = this.getBins(rows, columns);
	}
	else{
		this.drawText(char);
		var bin = this.getBins(rows, columns, arguments[3]);
	}
	var binLen = bin.length;
	var dt = [];
	for(var d = 0; d < binLen; d += columns){
		dt.push(bin.join('').substr(d, columns));
	}
	return dt;
};
var getDt = function(rows, columns, threshold){
	var bin = this.getBins(rows, columns, threshold);
	var binLen = bin.length;
	var dt = [];
	for(var d = 0; d < binLen; d += columns){
		dt.push(bin.join('').substr(d, columns));
	}
	return dt;
};
var clear = function(startX, startY, byX, byY){
	this.beginPath();
	this.clearRect(startX, startY, byX, byY);
	this.closePath();
};
var clearAll = function(){
	this.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
//功能: 在对应网格单元中填充数据
//参数:
//data - 数组类型,要填充进网格的数据
//返回: 无返回值
var bhatch = function(data){
	this.save();
	this.font = this.canvas.width/this.matrix.columns > this.canvas.height/this.matrix.rows
		? (this.canvas.height/this.matrix.rows)
		: (this.canvas.width/this.matrix.columns)
		+ 'px'
		+ ' '
		+ this.ft.family;
	//设置填充颜色样式
	this.fillStyle = 'rgba(0, 0, 0, .5)';
	//设置文字水平基线到中线
	this.textAlign = 'center';
	//设置文字竖直基线到中线
	this.textBaseline = 'middle';
	for(var x = 0; x < this.matrix.columns; x++){
		for(var y = 0; y < this.matrix.rows; y++){
			this.fillText(
				bin[x * this.matrix.columns + y],
				this.canvas.width/this.matrix.columns * y + this.canvas.width/this.matrix.columns/2,
				this.canvas.height/this.matrix.rows * x + this.canvas.height/this.matrix.rows/2
			);
		}
	}
	this.restore();
};

//功能: 根据有效像素的多少将网格单元二值化
//参数:
//ctx - Canvas上下文对象,
//startX - 网格单元起始横坐标,
//startY - 网格单元起始纵坐标,
//byX - 网格单元的宽度,
//byY - 网格单元的高度
//返回:
//1 - 有效像素数量超过阈值,
//0 - 有效像素数量低于阈值
var getBin = function(startX, startY, byX, byY, threshold){
	var pxs = this.getImageData(startX, startY, byX, byY).data;
	var pxsLen = pxs.length;
	var pxData = [];
	for(var i = 0; i < pxsLen; i += 4){
		var r = pxs[i],
			g = pxs[i + 1],
			b = pxs[i + 2],
			a = pxs[i + 3];
		var colorDepth = (r + g + b)/3;
		pxData.push(colorDepth);
	}
	var dataLen = pxData.length;
	var pxCount = 0;
	for(var d = 0; d < dataLen; d++){
		if(pxData[d] !== 0){
			pxCount++;
		}
	}
	return pxCount > (byX * byY * (threshold || .45)) ? 1 : 0;
};

//功能: 计算出网格单元对应的二值化值
//参数:
//rows - 网格划分单元的行数,
//columns - 网格划分单元的列数,
//threshold - 二值化依据的阈值
//返回:
//数组 - 网格单元二值化对应的数组
var getBins = function(rows, columns, threshold){
	var bins = [];
	for(var x = 0; x < columns; x++){
		for(var y = 0; y < rows; y++){
			bins.push(
				this.getBin(
					y * this.canvas.width/columns,
					x * this.canvas.height/rows,
					this.canvas.width/columns,
					this.canvas.height/rows,
					threshold
				)
			);
		}
	}
	return bins;
};

//功能: 在Canvas上绘制网格
//参数:
//rows - 网格的行数
//columns - 网格的行数
//返回: 无返回值
var drawGrid = function(rows, columns){
	//var th = this;
	this.save();
	this.beginPath();
	//绘制网格纵线
	for(
		var x = 0;
		x <= this.canvas.width;
		x += (this.canvas.width/columns)
	){
		this.moveTo(x, 0);
		this.lineTo(x, this.canvas.height);
	};
	//绘制网格横线
	for(
		var y = 0;
		y <= this.canvas.height;
		y += (this.canvas.height/rows)
	){
		this.moveTo(0, y);
		this.lineTo(this.canvas.width, y);
	};
	this.stroke();
	this.closePath();
	this.restore();
};

//功能: 在Canvas上绘制网格
//参数:
//ctx - Canvas上下文对象
//rows - 网格的行数
//columns - 网格的行数
//返回: 无返回值
/*
function drawGrid(ctx, rows, columns){
	ctx.save();
	ctx.beginPath();
	//绘制网格纵线
	for(
		var x = 0;
		x <= ctx.canvas.width;
		x += (ctx.canvas.width/columns)
	){
		ctx.moveTo(x, 0);
		ctx.lineTo(x, ctx.canvas.height);
	};
	//绘制网格横线
	for(
		var y = 0;
		y <= ctx.canvas.height;
		y += (ctx.canvas.height/rows)
	){
		ctx.moveTo(0, y);
		ctx.lineTo(ctx.canvas.width, y);
	};
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}
*/


//功能: 在Canvas上绘制文字
//参数:
//对象 - 成员:
//char - 要绘制的文字,
//color - 文字填充颜色,默认'rgbs(177, 177, 177, .5)',
//align - 文字水平基线,默认'center',
//baseline - 文字竖直基线,默认'middle',
//posX - 要绘制文字的水平坐标,默认在画布水平中线位置,
//posY - 要绘制文字的竖直坐标,默认在画布竖直中线位置，
//angle - 文字相对画布的旋转角度,0~360,
//style - 字体样式，默认'normal',
//variant - 字体异体，默认'normal',
//weight - 字体粗细，默认'normal',
//size - 字体大小,单位px无需填写，默认自动选取画布宽高的较小者,
//family - 字体系列,默认'arial'
var drawText = function(opts){
	var char, angle, size, posX, posY;
	if(opts && typeof opts == 'object'){
		char = opts.char;
		angle = opts.angle;
		size = opts.size;
		posX = opts.posX;
		posY = opts.posY;
	}
	else{
		char = arguments[0];
		angle = arguments[1];
		size = arguments[2];
		posX = arguments[3];
		posY = arguments[4];
	}
	
	if(posX || posX == 0){
		posX = posX;
	}
	else{
		posX = this.canvas.width/2;
	}

	//对一些字符的竖直位置进行修正
	var flag = 'acemnorsuvwxzgjy'.indexOf(char) !== -1 ? true : false;
	
	if(posY || posY == 0){
		posY = posY;
	}
	else{
		posY = flag ? 0 : this.canvas.height/2;
	}
	
	this.save();
	this.font = (opts.style || 'normal')
		+ ' '
		+ (opts.variant || 'normal')
		+ ' '
		+ (opts.weight || 'normal')
		+ ' '
		+ (size || (this.canvas.width > this.canvas.height
			? this.canvas.height : this.canvas.width))
		+ 'px'
		+ ' '
		+ (opts.family || 'arial');
	this.fillStyle = opts.color || 'rgba(177, 177, 177, .5)';
	this.textAlign = opts.align || 'center';
	this.textBaseline = opts.baseline || (flag ? 'hanging' : 'middle');
	this.translate(this.canvas.width/2, this.canvas.height/2);
	this.rotate(angle * Math.PI/180 || 0);
	this.translate(-this.canvas.width/2, -this.canvas.height/2);
  this.fillText(
		char,
		posX,
		posY
	);
	this.restore();
};

//功能: 获得Canvas上鼠标事件的坐标
//参数:
//cvs - Canvas对象,
//evt - 浏览器事件对象
//返回:
//坐标对象 - 成员:
//x - Canvas上鼠标事件的横坐标,
//y - Canvas上鼠标事件的纵坐标
function getMousePos(cvs, evt){
	var rect = cvs.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

//功能: 获取坐标点颜色值
//参数:
//ctx - Canvas上下文对象,
//x - 要获取颜色的横坐标,
//y - 要获取颜色的纵坐标
//返回:
//对象 - 成员:
//r - rgb红色值(0 ~ 255),
//g - rgb绿色值(0 ~ 255),
//b - rgb蓝色值(0 ~ 255),
//a - rgba不透明度(0 ~ 255),
//rgb - rgb颜色值rgb(r, g, b),
//rgba - rgba颜色值rgb(r, g, b, a)
function getPixel(ctx, x, y){
	var pixel = ctx.getImageData(x, y, 1, 1).data;
	var r = pixel[0],
		g = pixel[1],
		b = pixel[2],
		a = pixel[3];
	return {
		r: r,
		g: g,
		b: b,
		a: a,
		rgb: 'rgb(' + r + ',' + g + ',' + b + ')',
		rgba: 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
	};
}
