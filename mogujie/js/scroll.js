function mScroll(init){
    var wrap = init.wrap;
    var con = init.con;
    var scrollWrap = init.scrollWrap;
    var upBtn = scrollWrap.querySelector('.up');
    var downBtn = scrollWrap.querySelector('.down');
    var track = scrollWrap.querySelector('.scroll-track');
    var bar = scrollWrap.querySelector(".scroll-bar");
    var scroll = 0;// 当前滚动条的位置
    var conHeight  =  con.offsetHeight;
    bar.timer = 0;
    setBarHeight();//注意如果后期修改了con中的内容，记得重新设置高度


    // 1.点击upBtn 控制滚动条连续向上滚动
    if (upBtn) {
        upBtn.addEventListener('mousedown', function(e) {
            loopUp();
            e.preventDefault();
        });
    }
    // 点击downBtn 控制滚动条连续向下滚动
    if (downBtn) {
        downBtn.addEventListener('mousedown', function(e) {
            loopDown();
            e.preventDefault();
        });
    }
    scrollWrap.addEventListener('mouseup', function(e) {
        clearInterval(bar.timer);
    });

    /* 2.拖拽操作元素位置 */
    var lastMouseY = 0;
    bar.addEventListener('mousedown', function(e) {
        lastMouseY = e.clientY;
        document.addEventListener('mousemove', move);//注意 document
        document.addEventListener('mouseup', up);
        e.stopPropagation();
        e.preventDefault();
    });
    function move(e){
        clearInterval(bar.timer);//注意
        var nowMouseY = e.clientY;
        var dis = nowMouseY - lastMouseY;
        scroll += dis;
        lastMouseY = nowMouseY;
        setScroll();
    }
    function up(e){
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
    }

    // 3. 在轨道摁下，快速移动滚动条至鼠标点击区域
    track.addEventListener('mousedown', function(e) {
        var rect = track.getBoundingClientRect();
        var target = e.clientY - rect.top - bar.offsetHeight/2;//鼠标相对于轨道的坐标
        clearInterval(bar.timer);//注意
        bar.timer = setInterval(function(){
            var dis = (target - scroll)/5;
            scroll = Math.round(scroll + dis);
            setScroll();
            // 当鼠标触碰 到 滚动条停止动画
            if(bar.offsetTop < scroll && bar.offsetTop + bar.offsetHeight > scroll){
                clearInterval(bar.timer);
            }
        },20);
    });

    /* 4. 拨动滚轮移动滚动条位置 */
    mouseScroll(wrap, toUp, toDown);


    // 滚动条向上滚动
    function toUp(){
        scroll -= 5;
        setScroll();
    }
    //滚动条向下滚动
    function toDown(){
        scroll += 5;
        setScroll();
    }
    //滚动条连续向上滚动
    function loopUp(){
        clearInterval(bar.timer);
        bar.timer = setInterval(toUp,30);
    }
    //滚动条连续向下滚动
    function loopDown(){
        clearInterval(bar.timer);
        bar.timer = setInterval(toDown,30);
    }
    // 根据scroll的数值 来同步滚动条位置
    function setScroll(){
        listenerChange();
        var maxScroll = track.clientHeight - bar.offsetHeight;
        if(scroll < 0){
            scroll = 0;
        } else if(scroll > maxScroll){
            scroll = maxScroll;
        }
        css(bar,"top",scroll);
        setConTop();
    }

    // 根据scroll的数值，同步con的top值
    function setConTop(){
        var maxBarMove = track.clientHeight - bar.offsetHeight;
        var barScale = scroll/maxBarMove;
        var maxConMove = conHeight - wrap.clientHeight;
        var t = -barScale * maxConMove;
        css(con,"marginTop",t);
        init.scrollIn && init.scrollIn(-t);
    }

    // 检测内容高度是否发生变化
    function listenerChange(){
        if(conHeight != con.offsetHeight){
            conHeight = con.offsetHeight;
            setBarHeight();
            resetScroll();
        }
    }

    // 根据比例计算bar的高度
    function setBarHeight(){
        var scale = wrap.clientHeight/con.offsetHeight;
        css(bar,"height",track.clientHeight * scale);
    }

    //根据比例重新计算bar的位置
    function resetScroll() {
        var maxConMove = conHeight - wrap.clientHeight;
        var conScale = -css(con,"marginTop")/maxConMove;
        var maxBarMove = track.clientHeight - bar.offsetHeight;
        scroll = conScale * maxBarMove;
    }
}

/*鼠标滚轮*/
function mouseScroll(el,up,down){
    el.addEventListener('DOMMouseScroll', function(e) {
        if(e.detail > 0){
            down&&down();
        } else {
            up&&up();
        }
        e.preventDefault();
    });
    el.addEventListener('mousewheel', function(e) {
        if(e.wheelDelta < 0){
            down&&down();
        } else {
            up&&up();
        }
        e.preventDefault();
    });
}