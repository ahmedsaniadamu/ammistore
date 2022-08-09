<?php  
  require_once('./inc/headers.php') ;

  class Comments{
       public $conn ;       
       public function __construct($conn){
          $this -> conn = $conn ;          
       }
       #-----------------------------------------------------------------------#
       //a function to get all comments from database
       #------------------------------------------------------------------------#
       public function getComments($postId){
                $sql = '  
                    SELECT 
                    id ,
                    customer_name, customer_website,
                    comment, commentedAt ,
                    ( 
                        SELECT COUNT( _ammi_reply.id ) FROM _ammi_reply
                        WHERE _ammi_comments.id = _ammi_reply.comment_id
                    ) 
                    AS totalReplies
                    FROM `_ammi_comments` WHERE post_id = ? ORDER BY commentedAt DESC
                ' ;       
                //---- create a prepared statement from the database connection object ------//
                $stmt = $this -> conn -> prepare($sql) ; 
                $stmt -> bind_param('i', $postId) ;        
                $stmt -> execute() ;
                $result = $stmt -> get_result() ;
                $stmt -> store_result();              
                $comments = [];
                foreach( $result -> fetch_all(MYSQLI_ASSOC) as $row ) $comments[] = $row ;                
                 //---- returns a json response if there is one or more comments ------//
                if( count($comments) > 0 ){
                    echo json_encode([ 'status' => 200 , 'comments' => $comments ]) ;
                }     
                else {
                     echo json_encode([ 'status' => 0  ]) ;
                 }   
        }
        #-----------------------------------------------------------------------#
        // a function to add new comments
        #-----------------------------------------------------------------------#
        public function addComment(){
            $sql = '
                INSERT INTO `_ammi_comments`
                (
                `id`, `post_id`, `customer_email`, 
                `customer_name`, `customer_website`,
                    `comment`, `commentedAt`, `updatedAt`
                ) 
                VALUES ( NULL,?,?,?,?,?,current_timestamp(),current_timestamp() )
             ' ;             
            $stmt = $this ->conn -> prepare($sql) ;
            $stmt -> bind_param(
                                 'issss',
                                 $_POST['postId'],$_POST['email'],
                                 $_POST['customerName'],$_POST['website'],
                                 $_POST['comment']
                                 ) ;         
              $stmt -> execute() ;       
          //------ return new comments if comment is added successfully. -----------//                                 
          if( $this ->conn -> affected_rows > 0 ) $this -> getComments($_POST['postId']) ;
      }
  }
?>