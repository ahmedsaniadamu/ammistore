<?php 
 //database connection script
 $conn = new mysqli('localhost','root','','ammi_store') ;
 if(!$conn) echo 'cannot connect to the database'. mysqli_connect_error() ;
?>