/* 判断当前生成的应该是哪些图 */
window.now = 0;
function loadMore() {
	var length = 40;
	var start = now * length;
	var end = (now + 1) * length;
	if(start >= data.length){
		var info = document.querySelector('.loadMore');
		info.style.display = 'none';
		return;
	}
	end = end>data.length? data.length: end;
	for(var i = start; i < end; i++){
		createLi(data[i],i)
	}
	now++;
}

/* 根据数据生成对应的li */
function createLi(data){
	var pics = document.querySelector('#pics');
	var li = document.createElement("li");
	li.dataset.src = data;
	li.innerHTML = '<a href="#" class="cloth-img"></a>' +
		'<div class="detail"> ' +
			'<a href="#" class="title"><p>柔软保暖套装</p></a>' +
			'<div class="user-wrap"> ' +
				'<div class="user-img"><img src="img/user1.jpg"></div>' +
				'<span class="user-name">蘑菇搭配购</span>' +
			'</div>'
		'</div>'
	pics.appendChild(li);
}