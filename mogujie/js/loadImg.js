/*判断是否加载图片*/
function loadImg() {
	var pics = document.querySelectorAll('#pics>li');
	for(var i = 0; i < pics.length; i++){
		var rect = pics[i].getBoundingClientRect();
		if(rect.top < window.innerHeight
		&& rect.bottom > 0
		&& !pics[i].dataset.isCreate){
			pics[i].dataset.isCreate = true; 
			createImage(pics[i]);			
		}

	}
}

/*生产图片*/
function createImage(li){
	var img = new Image();
	img.src = li.dataset.src;
	img.onload = function(){
		li.children[0].appendChild(img);
		// 没有在页面上渲染完成的元素，不支持transition
		setTimeout(function(){
			img.style.opacity = 1;
		},50);
	};
}