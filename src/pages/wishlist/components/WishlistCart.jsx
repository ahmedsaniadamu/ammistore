import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteWishlist } from '../../../redux-store/wishlistSlice/wishlistSlice'

const WishlistCart = ( wishlist ) => {
 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navigateToProductPage = () => navigate( `/products/${ wishlist.id }` )
  const RemoveWishlist = () => dispatch( deleteWishlist( wishlist.id ) )

  return (
        <div className='col-6 col-md-2 mb-2'>
            <div className='header w-100 d-flex justify-content-end pe-2'> 
                <span 
                  data-bs-toggle='tooltip' title='Remove Product from wishlist' 
                  className='bi bi-trash'  onClick={ RemoveWishlist } >                        
                </span>
            </div>
            <div onClick={ navigateToProductPage } className='cart-body'>                 
                <img 
                src={ process.env.REACT_APP_SERVER_URL + wishlist.image } 
                alt={ wishlist.name } className='w-100' 
                />
                <p className='mb-1'> { wishlist.name } </p>
                <div className='price-wrapper'>
                        <CurrencyFormat 
                            value={ wishlist.oldPrice } displayType='text' 
                            thousandSeparator={true} prefix='₦'
                        />
                        <CurrencyFormat 
                            value={ wishlist.price } displayType='text' 
                            thousandSeparator={true} prefix='₦'
                        />
                </div>
            </div>
       </div>
  )
}

export default WishlistCart