    window.onload = function () {
    	my.app.textChang();
    	my.app.nextPrevShow();
    	my.app.bannerTab();
    }
    var my = {};
    my.tool = {};
    my.tool.getStyle = function (obj, attr) {
    	return this.currentStyle ? this.currentStyle[attr] : window.getComputedStyle(obj, null)[attr]*100;
    }
    my.ui = {};
    my.ui.textChang = function (obj, str) {
    	obj.onblur = function () {
    		if (obj.value == '')
    			obj.value = str;
    	}
    	obj.onfocus = function () {
    		if (obj.value == str)
    			obj.value = '';
    	}
    }
    my.ui.mouseshow = function (obj1, obj2) {
    	obj1.onmouseover = function (ev) {
    		obj2.style.display = 'inline-block';
    		// ev=ev||window.event;
    		// ev.cancelable=true;
    		
    	}
    	obj1.onmouseout = function (ev) {
    		obj2.style.display = 'none';
    		// ev=ev||window.event;
    		// ev.cancelable=true;
    	}

    }
    my.ui.fade=function(obj,attr,dir,target){
    	var old=my.tool.getStyle(obj,attr);
    	var speed=old;
    	dir= old>target ? -dir : dir;
    	// console.log('\n'+'old='+old)
    	// console.log('target='+target)
    	// console.log('dir='+dir)
    	clearInterval(obj.timer);
    	obj.timer=setInterval(function(){
    		speed+=dir;
    		if(speed>=target&&dir>0||speed<=target&&dir<0)
    		{
    			speed=target;
    			clearInterval(obj.timer);
    		}
    			 // console.log(speed)
    			 obj.style.opacity=speed/100;
    			 obj.style.filter='alpha(opacity='+speed+')';
    			},50)
    }
    my.app = {}
    my.app.textChang = function () {
    	var oText1 = document.getElementById('text1');
    	var oText2 = document.getElementById('text2');
    	my.ui.textChang(oText1, 'search website');
    	my.ui.textChang(oText2, 'search website');
    }
    my.app.nextPrevShow = function () {
    	var nextPic = document.getElementById('nextPic');
    	var prevPic = document.getElementById('prevPic');
    	var nextPicA = nextPic.getElementsByTagName('a')[0];
    	var prevPicA = prevPic.getElementsByTagName('a')[0];
    	
    	my.ui.mouseshow(nextPic, nextPicA);
    	my.ui.mouseshow(prevPic, prevPicA);
    }
    my.app.bannerTab = function () {
    	var bannerTab = document.getElementsByClassName('bannerTab')[0];
    	var aLi = bannerTab.getElementsByTagName('li');
    	var oSale=document.querySelector('#main div.sale')
    	var now = 0;
    	var timer=null;
    	var dir=1;
    	timer=setInterval(auto, 2000);
    	function auto() {
	        // console.log(' now:'+now)
	        my.ui.fade(aLi[now],'opacity',5,0);
	        if(now==aLi.length-1&&dir>0)
	        	now=0;
	        else if(now==0&&dir<0)
	        	now=aLi.length-1;
	        else now=now+dir;
	        // console.log('next:'+now+'\n');
	        my.ui.fade(aLi[now],'opacity',5,100);
	    }
	    oSale.addEventListener('mouseover',stop,false);
	    function stop(ev){
	    	var ev=ev||window.event;
	    	var target=ev.target;
	    	console.log(target.tagName)
	    	if(target.tagName=='LI')
	    	{
	    		// console.log('ul')
	    		clearInterval(timer);
	    	}
	    }
	    
	    oSale.addEventListener('mouseout',start,false);
	    function start(ev){
	    	var ev=ev||window.event;
	    	var target=ev.target;
	    	if(target.tagName=='UL')
	    	{
	    		clearInterval(timer);
	    		auto();
	    		timer=setInterval(auto, 2000);
	    	}
	    }

	}



