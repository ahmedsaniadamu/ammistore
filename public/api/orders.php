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
   

  if( $_SERVER['REQUEST_METHOD'] === 'POST'){
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
  } ; 
?> 