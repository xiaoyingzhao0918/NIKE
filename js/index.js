
$(".search").on("focus",scale);  //当.search获取焦点的时候宽变长
function scale(){
	$(".Search").stop()
	.animate({
		width:"240",
	},100)
	.css("border-color","#000");
	$(this).css("border-color","#fff");
}
$(".search").focusout(function(){//当.search失去焦点的时候宽变为原来的宽度
	$(".Search").stop()
	.animate({
		width:"200",
	},100)
	.css("border-color","#ddd");
});

//导航的二级菜单（当鼠标划过一级菜单时，二级菜单出现，离开时二级菜单隐藏）
$(".list").children("li").children(".list2-wrap").hide().end()
.on("mouseenter",function(){
	$(this).siblings().children(".list2-wrap").hide(); 
	$(this).children(".list2-wrap").toggle();
})
$(".list").children("li").on("mouseleave",function(){
	$(this).children(".list2-wrap").hide();
})


//启动swiper插件
	new Swiper(".swiper-container",{
         pagination:{
              el: '.swiper-pagination',
         },
         navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
         },
         loop:true,
         autoplay:true
    })


//排序方式二级菜单设置
$(".sort").children("ul").hide().end()
.on("click",function(){
	$(this).children("ul").toggle(100);
})


//瀑布流；  加载数据，渲染页面
$.get("./json/index.json",function(res){
	//console.log(res);
	var list=res.result.index.list;
	//console.log(list);
	var html=template("goods",{list:list});
	$(".content").html(html);
})
