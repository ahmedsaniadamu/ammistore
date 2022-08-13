<?php
   require_once('./inc/databaseConfig.php');
   require_once('./inc/headers.php') ;

   // a function to filter and sanitize input.
  function filterInput( $value ){
    $input = htmlspecialchars($value) ;
    $input = stripslashes( $input ) ;
    $input = trim( $input ) ;
    return $input ;
  } ;
   
  switch($_SERVER['REQUEST_METHOD']){
      case 'GET' :
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
                  ORDER BY orders.orderDate
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
      break;
      case 'POST' :
        $_POST = json_decode( file_get_contents('php://input') , true ) ;
      #data recieved from client
      #---------------------------------------------------------------#
      $customer_id = $_POST['customerId'] ;
      $cart_items = $_POST['cartItems']  ;      
      $postal_code = $_POST['postalCode'] ;      
      $transaction_id = $_POST['transactionId']  ;
      $transaction_ref = $_POST['transactionRef'];
      $payment_completed = $_POST['paymentCompleted']  ;
      $country = filterInput( $_POST['country'] ) ;
      $state = filterInput( $_POST['state'] ) ;
      $city = filterInput( $_POST['city'] ) ;
      $address = filterInput( $_POST['address'] ) ;
      #---------------------------------------------------------------#
      $sql = "
            INSERT INTO `_ammi_orders`
              (
                `id`, `customer_id`, `product_id`,
                  `product_quantity`, `totalPrice`,
                  `orderDate`, `address`,
                  `country`, `state`, `city`,
                  `payment_completed`, `postalCode`,
                  `transaction_id`, `transaction_ref`
                ) 
              VALUES 
                    (
                      NULL,?,?,?,?,current_timestamp(),?,?,?,?,?,?,?,?
                    )
              ";
      $stmt = $conn -> prepare($sql) ;     
      #insert each cart item to the orders  table
      #---------------------------------------------#
      foreach ($cart_items as $cart_item) {
            $stmt -> bind_param(
              'iiiissssisis', 
              $customer_id, $cart_item['id'], $cart_item['quantity'], 
              $cart_item['price'], $address, $country, $state, $city,
              $payment_completed, $postal_code, $transaction_id,
              $transaction_ref
            ) ; 
            $stmt -> execute() ;
      }
        //check if records are inserted
          #---------------------------------------------#
        if( $conn -> affected_rows > 0 ) {
          echo json_encode(['status' => 1 ]) ;   
        }     
      else echo json_encode(['status' => 0 ]) ;
      $stmt -> close() ;
      $conn -> close() ;     
    break;
  }
?> 