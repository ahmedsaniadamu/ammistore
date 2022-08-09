<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;
 require_once('./inc/comments.php');
 
 $comments = new Comments($conn);
 //--------------------------------------------------------------------//
 // check which http request method was send from client.
 //--------------------------------------------------------------------//
  switch( $_SERVER['REQUEST_METHOD'] ){
      #----- select all comments if request method is = GET ----#
      case 'GET' :
         if( isset( $_GET['postId'])){        
              $comments -> getComments($_GET['postId'] ) ;  
          }         
        else echo http_response_code(404);
       break ;
       //-------add new comment if request method === POST -----------
       case 'POST' :  
              if( isset($_POST['postId'],$_POST['email'],$_POST['customerName'],$_POST['comment']) ){
                   $comments -> addComment() ;                    
              }                                                                                                                    
              else echo http_response_code(404);
      break;
   }        
 $conn -> close() ;
?>