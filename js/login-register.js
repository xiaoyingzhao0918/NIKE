$(".login").on("click",function(){
	$(".login-form").show().siblings().hide();
})
$(".register").on("click",function(){
	$(".register_form").show().siblings().hide();
})
$(".weixin").on("click",function(){
	alert()
})




//表单验证信息注入包
 $.extend($.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format("最多可以输入  {0} 个字符"),
        minlength: $.validator.format("最少要输入 {0}  个字符"),
        rangelength: $.validator.format("请输入长度在  {0} 到 {1} 之间的字符串"),
        range: $.validator.format("请输入范围在 {0} 到  {1} 之间的数值"),
        max: $.validator.format("请输入不大于 {0} 的数值"),
        min: $.validator.format("请输入不小于 {0} 的数值")
    });
//表单验证初始化
$(".login-form").validate();  
$(".register_form").validate();


//注册
//1.阻止默认事件(默认事件：刚开始点击submit按钮时会刷新，form表单会提交)
$(".register_form").on("submit",function(evt){
	var e=evt || window.event;
	e.preventDefault();
})
//2.点击submit按钮时使用ajax()方法发送数据(用户名和密码)；
$("#submit").on("click",register);
function register(){
	var usrValue=$("#r-username").value;
	var pwdValue=$("#r-password").value;
	var url="http://localhost/NIKE/php/register.php";  ////定义路径url为register.php的完整路径
	url+='?username=${usrValue}&password=${pwdValue}';
	//2.1使用ajax技术发送数据；GET||POST；=>用GET发送数据
	$.ajax(url).then(function(res){
		console.log(res);     //输出后端返回的res=>{"state":"X","errorType":"X","errorCode":"X"}
	})	
}

//登录
//1.阻止默认事件(默认事件：刚开始点击submit按钮时会刷新，form表单会提交)
$(".login-form").on("submit",function(evt){
	var e=evt || window.event;
	e.preventDefault();
})
//2.点击submit按钮时使用ajax()方法发送数据(用户名和密码)；
$("#submit").on("click",login);
function login(){
	var usrValue=$("#r-username").value;
	var pwdValue=$("#r-password").value;
	var url="http://localhost/NIKE/php/login.php";  ////定义路径url为register.php的完整路径	
	var date={             //date为路径？后面拼接的数据=>将其优化为对象模式，方便数据传递；
        username: usrValue,
        password: pwdValue
    }
    //将date对象进行二次处理，变成数据库可识别的字符串数据；
    var date_str="";
    for(var attr in date){
        if(date_str.length!==1){
            date_str+="&";
        }
    	date_str+= attr + "=" + date[attr];     //将对象date中的键=值进行拼接=>变成字符串           
    	//最终date_str='username:"usrValue"&password:"pwdValue"'
    }
	$.ajax(url,data_str).then(function(res){
		console.log(res);
	})
}




