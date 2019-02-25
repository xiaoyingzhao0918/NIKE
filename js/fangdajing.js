
//放大镜
//1.计算比例
var prop=parseInt($(".wrap-big").css("width"))/parseInt($(".focus").css("width")); //prop=500/300
var big_w=prop*$(".wrap-small").width();    //big_w=500/300*600=1000
var big_h=prop*$(".wrap-small").width();   //big_w=500/300*600=1000
$(".wrap-big").children("img").width(big_w);  //设置大图片的宽高
$(".wrap-big").children("img").height(big_h);

//2.鼠标移入wrap_small,focus和wrap_big显示；鼠标移出wrap_small，focus和wrap_big显示隐藏
$(".wrap-small").on("mouseenter",function(){
	$(".focus").toggle();
	$(".wrap-big").toggle();
})
$(".wrap-small").on("mouseleave",function(){
	$(".focus").hide();
	$(".wrap-big").hide();
})

//3.当鼠标在wrap_small中移动的时候
//1)focus跟着鼠标移动(参考为元素);2)wrap_big中的大图big_pic按比例也跟着移动,但与focus的移动恰好相反
$(".wrap-small").on("mousemove",function(evt){
	var e=evt || window.event;
	var _left=e.offsetX-$(".focus").width()/2;
	var _top=e.offsetY-$(".focus").height()/2;
	console.log(_left,_top);
	
	 //------边界检测=>设置focus的移动范围(即left\top范围)---------
     //1) left、top最小值(0)边界判断；
     _left=_left<=0? 0:_left;
     _top=_top<=0? 0:_top;
     //2) left、top最大值(maxleft\maxtop)边界判断
     var maxleft=$(".wrap-small").width()-$(".focus").width();
     var maxtop=$(".wrap-small").height()-$(".focus").height();
     _left=_left>=maxleft? maxleft:_left;
     _top=_top>=maxtop? maxtop:_top;
    //----------边界检测end-------------------------

	$(".focus").css({   //focus的移动定位
		left:_left,
		top:_top
	});
	$(".wrap-big").children("img").css({ //wrap_big中的大图big_pic的移动定位
		left:(-_left)*prop,
		top:(-_top)*prop
	})	
})

//4.鼠标移入wrap-choose中不同 i 标签时，实现小图和大图中的图片切换
$(".wrap-choose").children().on("mouseenter",function(){
	//1)获取(图片的链接)数据，在item(i标签)的属性date-big\date-small中存储着
	var smallPicSrc=$(this).attr("date-small");
	var bigPicSrc=$(this).attr("date-big");
	$(".wrap-small img").attr("src",smallPicSrc);
	$(".wrap-big img").attr("src",bigPicSrc);

})


//产品推荐区数据加载；页面渲染
$.get("./json/fangdajing.json",function(res){
	//console.log(res);
	var list=res.result.index.list;
	//console.log(list);
	var html=template("goods",{list:list});
	$(".like-content").html(html);
})



//
new Swiper(".swiper-container",{       
         navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
         },
         loop:true,        
})
$(".swiper-button-next").on("click",function(){
	$(".like-content").animate({
		left:-1040
	})
})
$(".swiper-button-prev").on("click",function(){
	$(".like-content").animate({
		left:6
	})
})