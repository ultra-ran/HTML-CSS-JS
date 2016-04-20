window.onload = function() {
    // 模拟placehold效果
    my.app.textChang();
    // 鼠标移入移除按钮隐藏，显示
    my.app.nextPrevShow();
    // 焦点图轮播
    my.app.bannerTab();
    my.app.show();
    my.app.toRun();
}


//********创建my命名空间*********************************************************************************
var my = {};
// 创建工具类函数空间
my.tool = {};
//________创建获取对象属性值函数_________________________________________
my.tool.getStyle = function(obj, attr) {
    // console.log(obj)
    return this.currentStyle ? this.currentStyle[attr] : parseFloat(window.getComputedStyle(obj, null )[attr]) * (attr == 'opacity' ? 100 : 1);
}



//********创建my.ui函数空间************************************************************************
my.ui = {};
//________模拟placehold效果函数__________________________________________________
//  obj：所设置的对象
//  str：obj.value默认值
my.ui.textChang = function(obj, str) {
    obj.onblur = function() {
        if (obj.value == '')
            obj.value = str;
    }
    obj.onfocus = function() {
        if (obj.value == str)
            obj.value = '';
    }
}
//_________按钮显示、隐藏特效__________________________________________________________
my.ui.mouseshow = function(obj1, obj2) {
    obj1.onmouseover = function(ev) {
        obj2.style.display = 'inline-block';
    }
    obj1.onmouseout = function(ev) {
        obj2.style.display = 'none';
    }
}
//_________淡入淡出动画______________________________________________________________________
// obj淡入，淡出函数动画，可以用于对象的位置属性，几何属性，透明度等
// obj：动画对象
// attr：对象动画属性
// dir：对象动画属性变化步长，方向
// target：对象动画属性设定的目标值
my.ui.fade = function(obj, attr, dir, target) {
    // 获取对象动画属性的原始值
    var old = my.tool.getStyle(obj, attr);
    var speed = old;
    // 判断动画属性的方向
    dir = speed > target ? -dir : dir;
    // 测试用：
    // console.log('\n'+'old='+old)
    // console.log('target='+target)
    // console.log('dir='+dir)
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        speed += dir;
        //判断speed==target，停止动画
        if (speed >= target && dir > 0 || speed <= target && dir < 0) 
        {
            speed = target;
            clearInterval(obj.timer);
        }
        // console.log(speed)
        obj.style.opacity = speed / 100;
        obj.style.filter = 'alpha(opacity=' + speed + ')' + 'px';
    }, 50)
}
//_____元素显示隐藏_________________________
my.ui.elementShow = function(obj) {
    var obj = obj || this;
    if (obj.style.display == 'none') 
    {
        obj.style.cssText = "display:inline-block";
    } 
    else 
    {
        obj.style.cssText = "display:none"
    }
}
//_____图片滑动_________________________
my.ui.doMove = function(obj, attr, speed, target) {
    clearInterval(obj.timer);
    var now = 0;
    var old = my.tool.getStyle(obj, attr)
    obj.timer = setInterval(function() {
        var iSpeed = (target - old) / speed;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (target == old) 
        {
            clearInterval(obj.timer);
        } 
        else 
        {
            old += iSpeed;
            obj.style[attr] = old + 'px';
        }
    }, 30)
}

//*******创建应用函数空间************************************************************************
my.app = {}
//__________模拟placehold，函数调用_____________________________________________________________
my.app.textChang = function() {
    var oText1 = document.getElementById('text1');
    var oText2 = document.getElementById('text2');
    my.ui.textChang(oText1, 'search website');
    my.ui.textChang(oText2, 'search website');
}
//__________按钮显示隐藏，函数应用_____________________________________________________________
my.app.nextPrevShow = function() {
    var nextPic = document.getElementById('nextPic');
    var prevPic = document.getElementById('prevPic');
    var nextPicA = nextPic.getElementsByTagName('a')[0];
    var prevPicA = prevPic.getElementsByTagName('a')[0];
    my.ui.mouseshow(nextPic, nextPicA);
    my.ui.mouseshow(prevPic, prevPicA);
}
//___________焦点图轮播，函数应用____________________________________________________________
my.app.bannerTab = function() {
    var bannerTab = document.getElementsByClassName('bannerTab')[0];
    var aLi = bannerTab.getElementsByTagName('li');
    var oSale = document.querySelector('#main div.sale');
    var nextPicA = document.querySelector('#nextPic a');
    var prevPicA = document.querySelector('#prevPic a');
    var now = 0;
    var timer = null ;
    var aliLen = aLi.length - 1;
    
    timer = setInterval(function() {
        auto(1)
    }, 1500);
    
    oSale.addEventListener('mouseover', stop, false);
    oSale.addEventListener('mouseout', start, false);
    nextPicA.addEventListener('click', function() {
        auto(1)
    }, false);
    prevPicA.addEventListener('click', function() {
        auto(-1)
    }, false);
    //_____停止播放函数______________________________________________________
    function stop(ev) {
        var ev = ev || window.event;
        var target = ev.target;
        // console.log(target)
        if (target.tagName == 'SPAN' || target.tagName == 'A') 
        {
            clearInterval(timer);
        }
    }
    //_____开始播放函数______________________________________________________
    function start(ev) {
        var ev = ev || window.event;
        var target = ev.target;
        if (target.tagName == 'SPAN' || target.tagName == 'A') 
        {
            clearInterval(timer);
            // auto();
            timer = setInterval(function() {
                auto(1)
            }, 2000);
        }
    }
    //______自动播放函数，dir设置播放方向，1或-1________________________________ 
    function auto(dir) {
        //console.log('0now:' + now)
        // console.log(aLi[now])
        my.ui.fade(aLi[now], 'opacity', 5, 0);
        if (now == aliLen && dir > 0) 
        {
            now = 0;
            //console.log('1now:' + now + '\n');
        } 
        else if (now == 0 && dir < 0) 
        {
            now = aliLen;
            // console.log('2now:' + now + '\n');
        } 
        else {
            now = now + dir;
            //console.log('3now:' + now + '\n');
        }
        my.ui.fade(aLi[now], 'opacity', 5, 100);
    }
}
 //______模拟下拉选择器效果函数____________________________ 
my.app.show = function() {
    var list = document.querySelectorAll('.sortcom>dd');
    var sortDt = document.querySelectorAll('.sortcom dt');
    var sort = document.querySelector('#boxR>.sort');
    var aUl = document.querySelectorAll('#boxR .sort ul');
    
    for (var i = 0; i < aUl.length; i++) {
        aUl[i]
    }
    // console.log(list[1])
    sort.addEventListener('click', show, false);
    document.addEventListener('click', function() {
        hiddenlsit(list)
    }, false)
    function show(ev) {
        ev = ev || window.event;
        var target = ev.target;
        //console.log(target)
        
        //console.log(target.tagName)
        for (var i = 0; i < sortDt.length; i++) {
            // console.log(target)
            if (target == sortDt[i] || target == sortDt[i].firstElementChild) 
            {
                for (var j = 0; j < list.length; j++) {
                    if (i != j)
                        list[j].style.display = "none";
                }
                
                my.ui.elementShow(list[i]);
            }
        
        }
        if (target.parentNode.tagName == "LI") 
        {
            hiddenlsit(list);
            //console.log(target.innerHTML);
            target.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstChild.nodeValue = target.textContent
        }
        ev.stopPropagation();
    }
    function hiddenlsit(list) {
        for (var j = 0; j < list.length; j++)
            list[j].style.display = "none";
    }
}
 //______下部图片滑动效果函数________________________________ 
my.app.toRun = function() {
    var oUl = document.querySelector('.featuredPr ul');
    var oPrev = document.querySelector('.featuredPr .prev');
    var oNext = document.querySelector('.featuredPr .next');
    var iNow = 0;
    var oldLeft = my.tool.getStyle(oUl, 'left');
    oUl.innerHTML += oUl.innerHTML;
    var aLi = document.querySelectorAll('.featuredPr li');
    var width = aLi[0].offsetWidth;
    oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
    oNext.onclick = function() {
        {
            if (iNow == 3) 
            {
                oUl.style.left = oldLeft + 'px';
                iNow = 0;
            }
            my.ui.doMove(oUl, 'left', 10, -(width * (iNow + 1)) + oldLeft);
            iNow++;
        }
    }
    oPrev.onclick = function() {
        {
            var width = aLi[0].offsetWidth;
            if (iNow == 0) 
            {
                iNow = aLi.length / 2;
                oUl.style.left = -oUl.offsetWidth / 2 + 'px';
            }
            my.ui.doMove(oUl, 'left', 10, -(width * (iNow - 1)) + oldLeft);
            iNow--;
        }
    }

}
