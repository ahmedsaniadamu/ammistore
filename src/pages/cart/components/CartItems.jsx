import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NoCartItem from './NoCartItem'
import { Rating } from 'react-simple-star-rating'
import CurrencyFormat from 'react-currency-format'
import { deleteCartItem, increaseQuantity , decreaseQuantity } from '../../../redux-store/cartSlice/cartSlice'

const CartItems = () => {

  const { products } = useSelector( state => state.cart )
  const dispatch = useDispatch()
  const handleDeleteCartItem = id => dispatch( deleteCartItem( id ) )  
  const handleIncreaseQuantity = id =>  dispatch( increaseQuantity( id ) )
  const handleDecreaseQuantity = id =>  dispatch( decreaseQuantity( id ) )

  return (
    <div className='row justify-content-center px-md-2'>
        {
          products.length ? 
             products.map( ( product , id ) => {
                return(
                    <div className='col-12 col-md-6 cart-item mb-2' key = { product.id }>
                      <div className='border'> 
                        <div className='d-flex justify-content-end'> 
                             <span 
                                className='btn btn-close me-2 mt-2'
                                 onClick={ () => handleDeleteCartItem( product.id ) }
                              >
                             </span> 
                        </div>
                       <div className='d-flex'>
                           <img 
                               src={ process.env.REACT_APP_SERVER_URL + product.image } 
                               alt={ product.name } className='mb-2 ms-1'
                             />
                             <div className='ms-2'>                                   
                                 <p className='mb-0'> { product.name } </p>
                                 <div className='price-wrapper'>                                                                                                                      
                                      <CurrencyFormat 
                                        value={ product.price } displayType='text' 
                                        thousandSeparator={true} prefix='₦'
                                      />
                                 </div>
                                 <Rating 
                                    initialValue = { parseFloat( product.rating ).toFixed(1) }
                                    readOnly = { true }
                                    allowHover = { false }
                                    className = { 'stars' }
                                    size = { 18 }
                                  />
                                  <div className='quantity-wrapper mt-1 mb-2'>
                                      <button 
                                          className='btn btn-secondary py-1 px-3'
                                          onClick={ () => handleDecreaseQuantity( id ) }
                                        >
                                          -
                                        </button>
                                      <span className='p-2'> { product.quantity } </span>
                                      <button
                                          className='btn btn-secondary py-1 px-3'
                                          onClick={ () => handleIncreaseQuantity( id ) }
                                       >
                                        +
                                      </button>
                                  </div>
                             </div>
                         </div>
                        </div>
                    </div>
                )
             } )
          :
          <NoCartItem />
        }
    </div>
  )
}

export default CartItems