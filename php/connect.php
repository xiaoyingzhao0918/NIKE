<?php
//	<!--连接数据库-->
	 header("Content-Type:text/html;charset=utf-8");
	 $con=mysql_connect("localhost:3306","root","root");
	 if(!$con){
	 	die('{"state":"error","errorType":"数据库错误","errorCode":"3"}');  
	 }	
?>