import React from 'react'
import { Link } from 'react-router-dom'

const NoWishlist = () => {
  return (
    <div className='no-wishlist pb-3'>
         <img src='/assets/empty-inbox.PNG' alt='no wishlist' className='mx-auto d-block' />
         <h5 className='text-center'>  
             <span className='text-danger'> Oops! </span> &nbsp; There is no item in your wishlist
         </h5>
         <p className='text-center'>
               You can add more product items to your wishlist by click the button below.
          </p>
         <Link to={ '/products/?filter=fashions'} className='btn py-2 btn-success d-block mx-auto text-center'> 
            Add More. 
        </Link>
    </div>
  )
}

export default NoWishlist