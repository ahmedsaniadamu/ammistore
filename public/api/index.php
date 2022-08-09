<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;
 # a filter string from the query parameter
 $filter = $_GET['filter'] ;

    if( isset( $filter ) ){ 
        $sql = " SELECT 
        product.id AS id ,
        product.name AS name ,
        product.image AS image,
        product.oldPrice AS oldPrice,
        product.price AS price ,
        product.updatedAt AS arrivalDate ,
        ( SUM(review.ratings ) / COUNT(review.customer_id ) ) AS rating
        FROM  `_ammi_products` product
        INNER JOIN _ammi_product_reviews  review
        ON product.id = review.product_id  
        WHERE product.category = ?
        GROUP BY review.product_id" ;
    }
    else   $sql = " SELECT 
                    product.id AS id ,
                    product.name AS name ,
                    product.image AS image,
                    product.oldPrice AS oldPrice,
                    product.price AS price ,
                    product.updatedAt AS arrivalDate ,
                    ( SUM(review.ratings ) / COUNT(review.customer_id ) ) AS rating
                    FROM  `_ammi_products` product
                    INNER JOIN _ammi_product_reviews  review
                    ON product.id = review.product_id " ;

    //create a prepared statement from the database connection object
        $stmt = $conn -> prepare($sql) ; 
        # bind paremeter if there is a query string in the GET request
        if( isset( $filter ) ) $stmt -> bind_param('s', $filter ) ;        
        $stmt -> execute() ;
        $result = $stmt -> get_result() ;
        $stmt -> store_result();              
        $products = [] ;
        foreach(  $result -> fetch_all(MYSQLI_ASSOC) as $row ){
              $products[] = $row ;
         }
          //returns a json response if there is one or more products
          if( count($products) > 0 ) echo json_encode($products) ;         
        $stmt -> close() ;
        $conn -> close() ;

?>