<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;
#select certain column with limit if the limit value is added in the url query parameter
 if( isset( $_GET['category'] , $_GET['id']) ){        
            $sql = " SELECT 
            product.id AS id ,
            product.name AS name ,
            product.image AS image,             
            product.oldPrice AS oldPrice,
            product.price AS price ,             
            ( SUM(review.ratings ) / COUNT(review.customer_id ) ) AS rating
           FROM  `_ammi_products` product
           INNER JOIN _ammi_product_reviews  review
           ON product.id = review.product_id  
           WHERE product.category = ? AND product.id <> ?
           GROUP BY review.product_id LIMIT 10" ;
       
    //create a prepared statement from the database connection object
        $stmt = $conn -> prepare($sql) ; 
        $stmt -> bind_param('si',$_GET['category'] , $_GET['id']) ;        
        $stmt -> execute() ;
        $result = $stmt -> get_result() ;
        $stmt -> store_result();              
        $products = [];
        foreach( $result -> fetch_all(MYSQLI_ASSOC) as $row ) $products[] = $row ;
        //returns a json response if there is one or more products
        if( count($products) > 0 ) echo json_encode($products) ;     
        $stmt -> close() ;
        $conn -> close() ;
 }
 else echo http_response_code(404);

?>