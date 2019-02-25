<?php
	header("Content-Type:text/html;charset=utf-8");
	
	//1、目标->获取前端用户输入的数据(用户名和密码); 
    $username=@$_GET["username"]; 
    $password=@$_GET["password"];
	
	//2.1、验证->用户输入的数据是否为空(用户名和密码是否为空值)
    if(!$username || !$password){   //如果数据为空->报错
         die('{"state":"error","errorType":"参数不能为空!","errorCode":"2"}'); //数据库返回值(报错)
    }
	
	//2.1、验证->用户输入数据(用户名和密码)是否存在，(存在就可以登陆，否则需要注册)
	require("connect.php");
	mysql_select_db("mylist",$con);
	$select_query="SELECT*FROM user_list"  //从表user_list中选取用户数据username和password
	$select_res=mysql_query($select_query);
	
    while($row=mysql_fetch_array($select_res)){
    	if($row["username"]===$username){
    		if($row["password"]===md5($password)){
    			mysql_close($con);
				die('{"state":"success","errorType":"null","errorCode":"1"}'); //成功
    		}   		
    	}
    }     	
		
?>