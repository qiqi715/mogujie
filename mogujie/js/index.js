
loadMore();
loadImg();
toFixed();

(function() {
	/*滚动条*/
	var wrap = document.querySelector('.page');
	var con = document.querySelector('.con');
	var scrollWrap = document.querySelector('.scroll-wrap');
	console.log(111);
	mScroll({
		wrap: wrap,
		con: con,
		scrollWrap: scrollWrap,
		scrollIn: function(scroll) {
			var dis = con.offsetHeight - scroll;
			if(dis < window.innerHeight * 3){
				loadMore();
			}

			loadImg();

			toFixed();
		}
	});
})();

/* 导航的吸顶效果 */
function toFixed(){
	var headerFixed = document.querySelector('#header-fixed');
	var header = document.querySelector('#header');
	var headerBottom = header.getBoundingClientRect().bottom;
	if(headerBottom <= 0){
		headerFixed.style.top = 0;
	} else {
		headerFixed.style.top = "-50px";
	}
}