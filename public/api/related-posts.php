<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;
#select certain column with limit if the limit value is added in the url query parameter
 if( isset($_GET['postId']) ){        
            $sql = " 
               SELECT id,image,title,postedAt FROM _ammi_blog_post 
               WHERE id <> ? LIMIT 7
            " ;
       
    //create a prepared statement from the database connection object
        $stmt = $conn -> prepare($sql) ; 
        $stmt -> bind_param('i',$_GET['postId']) ;        
        $stmt -> execute() ;
        $result = $stmt -> get_result() ;
        $stmt -> store_result();              
        $related_posts = [];
        foreach( $result -> fetch_all(MYSQLI_ASSOC) as $row ) $related_posts[] = $row ;
        //returns a json response if there is one or more related_posts
        if( count($related_posts) > 0 ) echo json_encode($related_posts) ;     
        $stmt -> close() ;
        $conn -> close() ;
 }
 else echo http_response_code(404);

?>