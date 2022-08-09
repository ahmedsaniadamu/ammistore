<?php
  require_once('./inc/headers.php') ;

  class Replies{
     public $conn ;
     public function __construct($conn){
        $this -> conn = $conn ;
     }
    #-----------------------------------------------------------------------#
    //a function to get all replies from database
    #------------------------------------------------------------------------#
    public function getReplies($comment_id){
            $sql = '  
                SELECT 
                    reply.id AS id ,
                    reply.reply AS reply ,
                    reply.createdAt AS dateCreated,
                    customer.name AS customerName,
                    customer.email AS customerEmail
                FROM _ammi_reply reply
                INNER JOIN _ammi_customers customer
                ON customer.id = reply.customer_id 
                WHERE reply.comment_id = ?
                ORDER BY reply.createdAt DESC
            ' ;       
           //create a prepared statement from the database connection object
            $stmt = $this -> conn -> prepare($sql) ; 
            $stmt -> bind_param('i', $comment_id) ;        
            $stmt -> execute() ;
            $result = $stmt -> get_result() ;
            $stmt -> store_result();              
            $replies = [];
            foreach( $result -> fetch_all(MYSQLI_ASSOC) as $reply ) $replies[] = $reply ;
            //returns a json response if there is one or more replies 
            $stmt -> close() ;      
            if( count( $replies ) > 0 ){
                echo json_encode([ 'status' => 200 , 'replies' => $replies ]) ;
            }     
            else echo json_encode([ 'status' => 0  ]) ; 
       }
       #-----------------------------------------------------------------------#
         //a function to add a reply and return new replies from database
       #------------------------------------------------------------------------#
       public function addReply($request_body){
                $sql = '
                    INSERT INTO _ammi_reply
                    ( id, comment_id, customer_id, reply, createdAt, updatedAt )
                    VALUES ( NULL,?,?,?,current_timestamp(),current_timestamp() )
             ' ;
             $stmt = $this -> conn -> prepare($sql) ;
             $stmt -> bind_param(
                                'iis',
                                 $request_body['commentId'], 
                                 $request_body['customerId'],
                                 $request_body['reply']
                                ) ;         
             $stmt -> execute() ;                             
             if( $this -> conn -> affected_rows > 0 ){
                 $this -> getReplies( $request_body['commentId'] ) ;
             }                         
       }
        #-----------------------------------------------------------------------#
         //a function to edit a reply and return new replies from database
       #------------------------------------------------------------------------#
       public function editReply($request_body){
            $sql = 'UPDATE _ammi_reply SET reply = ? WHERE id = ?';
            $stmt = $this->conn -> prepare($sql) ;
            $stmt -> bind_param('si', $request_body['reply'] , $request_body['replyId'] ) ;         
            $stmt -> execute() ;                      
            if( $this->conn -> affected_rows > 0 ) {
                $this ->getReplies($request_body['commentId']) ;
            }             
       }
       #-----------------------------------------------------------------------#
         //a function to delete a reply and return new replies from database
       #------------------------------------------------------------------------#
       public function deleteReply($request_body){
            $sql = 'DELETE FROM _ammi_reply WHERE id = ?';
            $stmt = $this -> conn -> prepare($sql) ;
            $stmt -> bind_param('i',$request_body['replyId']) ;         
            $stmt -> execute() ;                      
            if( $this -> conn -> affected_rows > 0 ) {
                 $this -> getReplies($request_body['commentId']) ;   
            }  
       }
    }
?>