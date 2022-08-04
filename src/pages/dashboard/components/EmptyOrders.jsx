import React from 'react'
import { Link } from 'react-router-dom'

const EmptyOrders = () => {
  return (
    <div className='empty-orders-wrapper d-flex justify-content-center pt-3 pb-5'>  
           <div> 
               <img src='/assets/no-orders.png' alt='no orders'/>
               <h5 className='text-center'> No Orders </h5>
               <p className='text-center'>  Sorry! you don't have any order at the moment. </p>
               <Link to='/products?filter=electronics' className='btn btn-success mx-auto d-block'>
                   Order Now <span className='bi bi-arrow-right ms-1'></span>
               </Link>
           </div>
     </div>
  )
}

export default EmptyOrders