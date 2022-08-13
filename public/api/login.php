<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;

 if( isset( $_POST['email'] , $_POST['password']) ){
    // a function to filter and sanitize user input
      function filterInput( $value ){
        $input = htmlspecialchars($value) ;
        $input = stripslashes( $input ) ;
        $input = trim( $input ) ;
        return $input ;
      } ;
     
    //user input datas.    
    $email =  filterInput( $_POST['email'] ) ;
    $password = filterInput( $_POST['password'] );    
    //create a prepared statement from the database connection object
    $sql =  "SELECT id , name , email , password FROM `_ammi_customers` WHERE email = ? ";
    $stmt = $conn -> prepare($sql) ;
    $stmt -> bind_param('s',$email) ;         
    $stmt -> execute() ;      
    $result = $stmt -> get_result() ;
    $stmt -> store_result();  
    //returns a json object with user credentials if the user is registered sucessfully.
    $customer = $result -> fetch_all(MYSQLI_ASSOC) ;
    if( count( $customer ) > 0 ){
             $customer = $customer[0] ;
            //verify customer password
            $hashed_password = $customer['password'] ;
            if( password_verify( $password , $hashed_password )) {
                $customer['status'] = 1 ;
                unset( $customer['password'] ) ;
                echo json_encode( $customer ) ;
            }
            else echo json_encode([ 'status' => 0 , 'messege' => 'Error! incorrect password.']) ;                    
    }
    else echo json_encode([ 'status' => 0 , 'messege' => 'Error! customer does not exist.']) ;
    $stmt -> close() ;
    $conn -> close() ;
  }     
?>