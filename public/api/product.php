<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;
#select certain column with limit if the limit value is added in the url query parameter
 if( isset( $_GET['filter'] , $_GET['limit'] ) ){
    switch($_GET['filter']){
        case 'recommended' :
             $sql = "SELECT id,name,image,price,oldPrice FROM _ammi_products ORDER BY price
                     DESC LIMIT ? " ;
        break ;
        case 'special' :
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
           WHERE product.category = 'fashions'
           GROUP BY review.product_id  ORDER BY product.price ASC LIMIT ? " ;
       break ;
       case 'hot-deals' :
        $sql = "SELECT id,name,image,price,oldPrice FROM _ammi_products 
                WHERE category = 'electronics' LIMIT ? " ;
        break ;
        case 'mobile-and-accessories' :
            $sql = "SELECT id,name,image,price,oldPrice FROM _ammi_products  WHERE category = 'phones' 
                      UNION ALL
                    SELECT id,name,image,price,oldPrice FROM _ammi_products WHERE category = 'electronics' 
                     ORDER BY id ASC LIMIT ? 
                    " ;
            break ;
            case 'cameras' :
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
               WHERE product.category = 'cameras'
               GROUP BY review.product_id  ORDER BY product.price ASC LIMIT ? " ;
           break ;
           case 'more-items' :
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
           WHERE product.category = 'fashions'
           GROUP BY review.product_id  ORDER BY product.price DESC LIMIT ? " ;
       break ;
    } 
    //create a prepared statement from the database connection object
        $stmt = $conn -> prepare($sql) ; 
        $stmt -> bind_param('i',$_GET['limit']) ;        
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
 }

?>