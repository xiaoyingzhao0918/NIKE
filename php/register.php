<?php
	header("Content-Type:text/html;charset=utf-8");
	
	//1、目标->获取前端用户输入的数据(用户名和密码); 其中"username"和"password"是从该页面地址栏中的路径中获取的，（？后面的数据）
    $username=@$_GET["username"]; 
    $password=@$_GET["password"];
	
	//2.1、验证->用户输入的数据是否为空(用户名和密码是否为空值)
    if(!$username || !$password){   //如果数据为空->报错
         die('{"state":"error","errorType":"参数不能为空!","errorCode":"2"}'); //数据库返回值(报错)
    }
	
	//2.2、验证->用户输入的用户名是否重复(用户名是否重名=>用户输入的用户名与数据库保存的用户名是否有相同的)
     // 1）首先查询数据库(表)中已存的数据(用户名)
	require("connect.php");
	mysql_select_db("mylist",$con);
	$select_query="SELECT username FROM user_list"  //从表user_list中选取用户名数据username
	$select_res=mysql_query($select_query);
	
	 //2）将数据库(表)中已存数据的每一行($row)中用户名($row["username"])与用户输入的用户名($username)进行对比；
         //如果相同，则返回值(报错)=>die
    while($row=mysql_fetch_array($select_res)){
    	if($row["username"]===$username){
    		mysql_close($con);
			die('{"state":"error","errorType":"用户名重复","errorCode":"4"}');  //报错
    	}
    }     
	
	//3.插入数据(将注册的用户名(存在且不重复)和密码添加到数据库中)
	$password=md5($password);
	$insert_query="INSERT INTO user_list(username,password)
					VALUES('$username','$password')";
	$res=mysql_query($insert_query);
	if($res){
		die('{"state":"success","errorType":"null","errorCode":"1"}');  //数据库返回值(报成功)		
	}else{
		die('{"state":"error","errorType":"数据库写入失败","errorCode":"5"}'); //报错
	}
	mysql_close($con);
	
		
?>