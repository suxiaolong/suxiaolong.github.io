window.onload = window.onresize = function(){
/*全屏翻页*/
	var pages=document.getElementById('pages').getElementsByTagName('section'),
		navs=document.getElementById('navs'),
		lis=navs.getElementsByTagName('li'),
		index=0,
		timer=null,
		timer2=null,
		cH=document.documentElement.clientHeight||document.body.clientHeight,
		weixin=document.getElementById('weixin'),
		skills=document.getElementById('skills').getElementsByTagName('li'),
		qq=document.getElementById('qq');
	document.addEventListener('touchstart',touchStart,false);
	document.addEventListener('touchmove',touchMove,false);
	document.addEventListener('touchend',touchEnd,false);
	/*初始化页面*/
	for(var i=0;i<lis.length;i++){
		pages[i].style.top=i*cH+'px';
		pages[i].index=i;
		lis[i].index=i;
	}
	/*初始化导航*/
	lis[0].className="active";
	for(var k=1;k<lis.length;k++){
		lis[k].className="";
	}
	/*点击切换*/
	navs.onclick=function(e){
		e=e||window.event;
		if(e.target.index===undefined||e.target.index==index){
			return false;
		}
		lis[index].className="";
		index=e.target.index;
		lis[index].className="active";
		changePages();
	};
	/*翻页*/
	function changePages(){
		clearInterval(timer2);
		var startpos= parseFloat(pages[0].style.top),
			targetpos=(pages[0].index -index)*cH,
			speed=10,
			times=50,
			flag=0,
			intervalflag=true,
			step = (targetpos-startpos)/times;
		timer2=setInterval(function(){
			if(flag==times-1){intervalflag=false;clearInterval(timer2);}
			for(var i=0;i<pages.length;i++){
				pages[i].style.top = parseFloat(pages[i].style.top) + step + 'px';
			}
			flag++;
		},speed);
		if(index==1){
				Animate();
			}
		if(intervalflag===false){fix();}
		/*校正小数造成的误差*/
		function fix(){
			for(var m=0;m<pages.length;m++){
				pages[m].style.top = (pages[m].index - index)*cH + 'px';
			}	
		};
	}
	/*监听鼠标滚动和键盘*/
	document.onkeydown=function(e){
		e=e||window.event;
		if(e.keyCode==33||e.keyCode==38){
			scrollUp();
		}
		if(e.keyCode==34||e.keyCode==40){
			scrollDown();
		}
	};
	document.onmousewheel=function(e){
		e=e||window.event;
		if(e.wheelDelta>0){
			scrollUp();
		}
		if(e.wheelDelta<0){
			scrollDown();
		}
	};
	if(navigator.userAgent.indexOf("Firefox") > -1){
		document.body.addEventListener("DOMMouseScroll", function(e) {
	    if(e.detail<0){
				scrollUp();
			}
			if(e.detail>0){
				scrollDown();
			}
		});
	}
	/*上下翻页*/
	function scrollDown(){
		if(index==5){
			return false;
		}
		lis[index].className="";
		index++;
		lis[index].className="active";
		changePages();
	}
	function scrollUp(){
		if(index===0){
			return false;
		}
		lis[index].className="";
		index--;
		lis[index].className="active";
		changePages();
	}
/*其他*/
	/*page1，微信二维码*/
	weixin.addEventListener('click',function(e){
		e=e||window.event;
		e.preventDefault();
		weixin.getElementsByTagName('span')[0].style.display="block";
		e.stopPropagation();
	},false);
	pages[0].onclick=function(){
		weixin.getElementsByTagName('span')[0].style.display="none";
	};
	/*page2,动画效果*/
	function Animate(){
		clearInterval(timer);
		var count=0;
		for(var i=0;i<skills.length;i++){
			skills[i].style.width='0%';
		}
		timer=setInterval(function(){
			for(var i=0;i<skills.length;i++){
				if(count==skills.length){
					clearInterval(timer);
				}
				if(+(skills[i].style.width.replace("%",""))==skills[i].value-1){
					count++;
				}
				if(+(skills[i].style.width.replace("%",""))==skills[i].value){
					continue;
				}
				if(+(skills[i].style.width.replace("%",""))>=30){
					skills[i].style.backgroundColor='#607E5B';
				}
				if(+(skills[i].style.width.replace("%",""))>=50){
					skills[i].style.backgroundColor='#46AF46';
				}
				if(+(skills[i].style.width.replace("%",""))>=80){
					skills[i].style.backgroundColor='#27F605';
				}
				skills[i].style.width= +(skills[i].style.width.replace("%",""))+1+"%";
			}
		},20);
	}
	/*qq跳转前询问*/
	qq.onclick=function(e){
		var ask=confirm("打开QQ通话？");
		if(!ask){
			e.preventDefault();
		}
	};
	/*触屏事件监听*/
	
	var startX,startY,endX,endY;
	function touchStart(e){
		var touch=e.touches[0];
		startX=touch.pageX;
		startY=touch.pageY;
	}
	function touchMove(e){
		e.preventDefault();
	}
	function touchEnd(e){
		endX=e.changedTouches[0].pageX;
		endY=e.changedTouches[0].pageY;
		if(endY-startY>60){
			scrollUp();
		}else if(endY-startY<-60){
			scrollDown();
		}
	}
};