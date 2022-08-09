<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;
 $postId = $_GET['postId'] ;
 if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($postId)){        
            $sql = "  
                    SELECT * FROM _ammi_blog_post WHERE id = ?                                
               " ;
       
    //create a prepared statement from the database connection object
        $stmt = $conn -> prepare($sql) ; 
        $stmt -> bind_param('i',$postId)  ;           
        $stmt -> execute() ;
        $result = $stmt -> get_result() ;
        $stmt -> store_result();              
        $blog_post = $result -> fetch_all(MYSQLI_ASSOC)[0] ;       
        //returns a json response if there is one or more products
        if( count($blog_post) > 0 ) {                  
            echo json_encode($blog_post) ;
         }        
        $stmt -> close() ;
        $conn -> close() ;
 }
 else echo http_response_code(404);

?>