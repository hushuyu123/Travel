var box = document.getElementById('box');
var slider = document.getElementById('slider');
var travel = document.getElementById('travel')
var images = document.getElementsByClassName('images');
var left = document.getElementById('left');
var right = document.getElementById('right');
var nav = document.getElementById('nav').children;
var mange = document.getElementsByClassName('mange');
var gotop = document.getElementById('gotop');
var timer;
var isMoving = false;
var count = 1;
timer = setInterval(next,3000);


//侧面返回顶部
window.onscroll = function(){scr()};
function scr(){
	if(document.body.scrollTop>200||document.documentElement.scrollTop>200){
		document.getElementById('gotop').style.display="block";
	}else{
		document.getElementById('gotop').style.display="none";
	}
}

//返回顶部按钮
gotop.onclick= function(){
	document.body.scrollTop = 0;
	document.documentElement.scrollTop=0;
}

//轮播图适应屏幕分辨率
travel.style.width = document.body.clientWidth + "px";
slider.style.width = document.body.clientWidth*7 + "px";
slider.style.left = "-"+document.body.clientWidth + "px";
for(var i=0;i<images.length;i++){
	images[i].style.width = document.body.clientWidth + "px";
}

//鼠标划入图片扩大效果
for(var m=0;m<mange.length;m++){
	mange[m].idx = m;
	mange[m].onmouseover = function(){	
		big(this.idx);
	}
	mange[m].onmouseout = function(){
		small(this.idx);
	}
}

function big(i){
	mange[i].style.width = "240px";
	mange[i].style.height = "240px";
	mange[i].style.paddingLeft = "10px";
	mange[i].style.paddingRight = "5px";
	mange[i].style.paddingTop = "0px";
}

function small(i){
	mange[i].style.width = '220px';
	mange[i].style.height = '220px';
	mange[i].style.paddingLeft = '25px';
	mange[i].style.paddingRight = "15px";
	mange[i].style.paddingTop = "5px";
}

//鼠标划入
box.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
//鼠标划出
box.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer=setInterval(next,3000);
}

//左右键绑定
left.onclick = last;
right.onclick = next;

//轮播
//下一张
var z = parseInt("-"+document.body.clientWidth);
function next(){
	if(isMoving){
		return;
	}
	isMoving=true;
	count++;
	navchange();
	animate(slider,{left:z*count},function(){
		if(count===6){
			slider.style.left=z+"px";
			count=1;
		}
		isMoving=false;
	});
}
//上一张
function last(){
	if(isMoving){
		return;
	}
	isMoving=true;
	count--;
	navchange();
	animate(slider,{left:z*count},function(){
		if(count===0){
			slider.style.left=z*5+"px";
			count=5;
		}
		isMoving=false;
	});
}

//小按钮绑定
for(var i = 0;i<nav.length;i++){
	nav[i].idx=i;
	nav[i].onclick=function(){
		count = this.idx+1;
		navchange();
		animate(slider,{left:-1520*count})
	}
}
//小按钮背景色切换
function navchange(){
	for (var i = 0; i < nav.length; i++) {
		nav[i].className='';
	}
	if(count>5){
		nav[0].className = 'active';
	}else if(count<=0){
		nav[4].className='active';
	}else{
		nav[count-1].className='active';
	}
	
}

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}

function animate(obj,json,callback){
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;

			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
					
			if(json[attr] !== cur){
				isStop = false;
			}
		}

		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}

	}, 30)

}