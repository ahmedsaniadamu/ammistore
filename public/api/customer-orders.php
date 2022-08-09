<?php 
 require_once('./inc/databaseConfig.php');
 require_once('./inc/headers.php') ;
 #select customer orders based on customer id and email address
 $customer_id = $_GET['customer-id'] ;
 $customer_email = $_GET['customer-email'];
 if( isset( $customer_id, $customer_email ) ){        
        $sql = "
              SELECT 
                     orders.id as order_id, 
                     orders.totalPrice as price,
                     orders.status as status,
                     orders.transaction_id as transactionId,
                     orders.transaction_ref as transactionRef,
                     orders.product_quantity as quantity,
                     orders.orderDate as orderDate,                     
                     products.name as name,
                     products.id as id,
                     products.image as image                
              FROM _ammi_orders orders
                 INNER JOIN _ammi_products products
              ON orders.product_id = products.id
                 INNER JOIN _ammi_customers customer
              ON customer.id = orders.customer_id
                WHERE orders.customer_id = ? AND customer.email = ?
              GROUP BY products.id
              " ;
       //create a mysql prepared statement from the database connection object
        $stmt = $conn -> prepare($sql) ; 
        $stmt -> bind_param('is',$customer_id,$customer_email) ;        
        $stmt -> execute() ;
        $result = $stmt -> get_result() ;
        $stmt -> store_result();              
        $products = [];
        foreach( $result -> fetch_all(MYSQLI_ASSOC) as $row ) $products[] = $row ;
        //returns a json response if there is one or more products
        #------------------------------------------------------#
        if( count($products) > 0 ) echo json_encode($products) ;
        #------------------------------------------------------#     
        else echo json_encode([]) ;       
        $stmt -> close() ;
        $conn -> close() ;
 }
 else echo http_response_code(404);

?>