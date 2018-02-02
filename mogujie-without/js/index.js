/* 根据滚动条位置 生成list中的内容 */
loadMore();
window.addEventListener('scroll',function(){
	var dis = document.body.scrollHeight - window.scrollY;
	if(dis < window.innerHeight * 3){
		loadMore();
	}
});

/* 把当前在可视区中图片 显示出来 */
loadImg();
window.addEventListener('scroll', function(e) {
	loadImg();
});

/* 导航的吸顶效果 */
(function(){
	var headerFixed = document.querySelector('#header-fixed');
	var header = document.querySelector('#header');
	toFixed();
	function toFixed(){
		var headerBottom = header.getBoundingClientRect().bottom;
		if(headerBottom <= 0){
			headerFixed.style.top = 0;
		} else {
			headerFixed.style.top = "-50px";
		}
	} 
	window.addEventListener('scroll', function(e) {
		toFixed()
	});
})();