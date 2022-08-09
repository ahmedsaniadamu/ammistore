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
    $user = $result -> fetch_all(MYSQLI_ASSOC)[0]  ;
    if( count( $user ) > 0 ){
            //verify user password
            $hashed_password = $user['password'] ;
            if( password_verify( $password , $hashed_password )) {
                $user['status'] = 1 ;
                unset( $user['password'] ) ;
                echo json_encode( $user ) ;
            }
            else echo json_encode([ 'status' => 0 , 'messege' => 'Error! incorrect password.']) ;                    
    }
    else echo json_encode([ 'status' => 0 , 'messege' => 'Error! user does not exist.']) ;
    $stmt -> close() ;
    $conn -> close() ;
}     

?>