<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;

 if( isset( $_POST['name'] , $_POST['email'] ,  $_POST['number'] , $_POST['password'] , $_POST['confirmPassword']) ){
    // a function to filter and sanitize user input
      function filterInput( $value ){
        $input = htmlspecialchars($value) ;
        $input = stripslashes( $input ) ;
        $input = trim( $input ) ;
        return $input ;
      } ;
     
    //user input datas.
    $name =  filterInput( $_POST['name'] ) ;
    $email =  filterInput( $_POST['email'] ) ;
    $password = password_hash( filterInput( $_POST['password'] ) , PASSWORD_DEFAULT ) ;
    $phone =  filterInput( $_POST['number'] ) ;
    //create a prepared statement from the database connection object
    $sql =  "INSERT INTO `_ammi_customers`
            (`id`, `name`, `email`, `dateRegistered`, `phone`, `password`) 
            VALUES (NULL,?,?,current_timestamp(),?,?)";
    $stmt = $conn -> prepare($sql) ;
    $stmt -> bind_param('ssss', $name , $email , $phone , $password) ;         
    $stmt -> execute() ;        
    //returns a json object with user credentials if the user is registered sucessfully.
    if( $conn -> affected_rows > 0 ) {
        echo json_encode([ 'name' => $name , 'email' => $email , 'status' => 1 ]) ;   
    }     
    else echo json_encode( [ 'status' => 0 ] ) ;
    $stmt -> close() ;
    $conn -> close() ;
}     

?>