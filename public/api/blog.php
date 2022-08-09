<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;
 
 if($_SERVER['REQUEST_METHOD'] === 'GET'){        
            $sql = "  
                    SELECT 
                    id,
                    image,
                    postedAt ,
                    author,
                    title,
                    body AS content,
                      ( 
                        SELECT COUNT( _ammi_comments.id ) FROM _ammi_comments
                        WHERE _ammi_blog_post.id = _ammi_comments.post_id
                      ) 
                     AS totalComments
                 FROM _ammi_blog_post                                 
              " ;
       
    //create a prepared statement from the database connection object
        $stmt = $conn -> prepare($sql) ;              
        $stmt -> execute() ;
        $result = $stmt -> get_result() ;
        $stmt -> store_result();              
        $blog_posts = []  ;
        foreach ($result -> fetch_all(MYSQLI_ASSOC) as $post) {
            #send 300 characters as the body of the post object
            $post['content']  =   substr($post['content'] , 0 , 300) . '...'  ;
            $blog_posts[] = $post ;
        }
        //returns a json response if there is one or more products
        if( count($blog_posts) > 0 ) {       
            echo json_encode($blog_posts) ;
         }        
        $stmt -> close() ;
        $conn -> close() ;
 }
 else echo http_response_code(404);

?>