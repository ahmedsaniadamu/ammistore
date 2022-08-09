<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;
 require_once('./inc/replies.php');
 
 $replies = new Replies($conn);
 $request_body = json_decode( file_get_contents('php://input') , true ) ;
 //--------------------------------------------------------------------//
 // check which http request method was send from client.
 //--------------------------------------------------------------------//
  switch( $_SERVER['REQUEST_METHOD'] ){
        #----------------------------------------------------------------------#
           # select all replies if request method is = GET 
        #----------------------------------------------------------------------#
      case 'GET' :
           if( isset($_GET['commentId']) ) {
                $replies -> getReplies($_GET['commentId']) ;                      
           } 
           else echo http_response_code(404);
       break ;      
        #----------------------------------------------------------------------#
             //add reply if request method === POST 
        #----------------------------------------------------------------------#
       case 'POST' :                                      
          if( isset( $request_body['commentId'] ,$request_body['customerId'] , $request_body['reply'])){
               $replies -> addReply($request_body) ;
          }
         else echo http_response_code(404);
     break;     
      #----------------------------------------------------------------------#
          //  edit reply if request method == PATCH  
      #----------------------------------------------------------------------#
     case 'PATCH' :             
       if( isset($request_body['reply'],$request_body['replyId'],$request_body['commentId'])){
              $replies -> editReply($request_body) ;                                   
       }
       else echo http_response_code(404) ;
     break ;
      #----------------------------------------------------------------------#
       // delete reply if request method == DELETE
      #----------------------------------------------------------------------#
     case 'DELETE' :       
       if( isset($request_body['replyId'] ,$request_body['commentId']) ){
          $replies -> deleteReply($request_body) ;
       }
       else echo http_response_code(404) ;
  }
 
  $conn -> close() ;
?>