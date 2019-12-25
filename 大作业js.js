		var box = document.getElementById('box');
		var slider = document.getElementById('slider');
		var nav = document.getElementById('nav').children;
		var left = document.getElementById('left');
		var right = document.getElementById('right');
		var word = document.getElementById('word');
		var smallMid = document.getElementsByClassName('smallMid');
		var main = document.getElementsByClassName('main');
		var backTop = document.getElementById('backTop');

		var index = 1;
		var isMoving = false;


		backTop.onclick = function(){
			document.documentElement.scrollTop=0;
		}
		
		 //下一张图片
		function next(){
			if(!isMoving){
				isMoving = true;
				index++;
				 navChange();
				animate(slider,{left:-1200*index},function(){
					if(index===6){
						slider.style.left = "-1200px";
						index=1;
						}
					isMoving = false;
				});
			}
		}
		//上一张图片
		function prev(){
			if(!isMoving){
				isMoving = true
				index--;
				navChange();
				animate(slider,{left:-1200*index},function(){
					if(index===0){
						slider.style.left = "-6000px";
						index=5;
						}
						isMoving = false;
				});
			}
		}
		var timer = setInterval(next,3000);
		//鼠标移入暂停
		box.onmouseover = function(){
			clearInterval(timer);
			animate(left,{opacity:80});
			animate(right,{opacity:80});
		}
		//鼠标移出继续
		box.onmouseout = function(){
			animate(left,{opacity:0});
			animate(right,{opacity:0});
			timer = setInterval(next,3000);
		}
	
		//箭头切换图片
		right.onclick = next;
		left.onclick = prev;
		//小按钮点击事件
		for(var i=0;i<nav.length;i++){
			nav[i].idx = i;
			nav[i].onclick = function(){
				index = ++this.idx;	
				navChange()
				animate(slider,{left:-1200*index})
			}
		}
		//按钮背景色改变
		function navChange(){
				for(var i=0;i<nav.length;i++){
					nav[i].className = '';
				}
				if(index === 6){
					nav[0].className = 'active';
				}
				else if(index ===0){
					nav[4].className = 'active'
				}
				else{
					nav[index-1].className ='active';
				}
		}
		var m=0;
		//mid
		function midNext(){
				m++;
				animate(mid,{left:-380*m},function(){
					if(m==5){
						mid.style.left = "0px";
						m=0;
					}
					
				});
			}
		

		var midTimer = setInterval(midNext,3000);
		//mid图片放大
		
		//star
		  var stars=document.querySelectorAll('.stars span');
    var info=document.querySelector('.info');
    var grades = ["很不满意","不满意","一般","满意","非常满意"];
    var active=-1;   //记录当前点击的是哪颗星星
  
    for(var i=0;i<stars.length;i++){
      stars[i].index=i;
      stars[i].onmouseover=function(){setStar(this.index);};
      stars[i].onmouseout=function(){setStar(active);};
      stars[i].onclick=setClick;
    }
  
    function setStar(nub){
      var name='';
      name= nub<2?'show':'show2';
      for(var i=0;i<stars.length;i++){
        stars[i].className= i<=nub?name:'';
      }
      info.style.display= nub<0? 'none':'block';
      info.innerHTML=grades[nub];
    }
  
    function setClick(){
      active=this.index;
    }


    //提交
    var tijiao = document.getElementsByClassName("tijiao")[0];
    tijiao.onclick = function(){
    	alert('感谢您的评价！');
    }

		 function getStyle(obj,style) {  
			if(obj.currentStyle) {  
				return obj.currentStyle[style];  
			} 
		    else {  
				return getComputedStyle(obj)[style];    //只读
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

//
 	   var c5 = document.getElementById('c5');
       c5.onmouseover = function(){animate(c5,{opacity:75});}
       c5.onmouseout = function(){animate(c5,{opacity:100});}

       var c7 = document.getElementById('c7');
       c7.onmouseover = function(){animate(c7,{opacity:75});}
       c7.onmouseout = function(){animate(c7,{opacity:100});}

       var c8 = document.getElementById('c8');
       c8.onmouseover = function(){animate(c8,{opacity:75});}
       c8.onmouseout = function(){animate(c8,{opacity:100});}

	 
 
