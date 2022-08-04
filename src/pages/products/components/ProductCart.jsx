import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToWishlist } from '../../../redux-store/wishlistSlice/wishlistSlice'
import { Rating } from 'react-simple-star-rating'


const ProductCart = ({ className , name , id , image , price , oldPrice , rating }) => {
 
    const navigate = useNavigate()
    const dispatch = useDispatch()     
    const ratings = parseFloat(rating).toFixed(1)

    const navigateToProductPage = () => navigate( `/products/${ id }` )
    const addProductToWishlist = () => dispatch( addToWishlist( { id , image , price , oldPrice , name } ) )

    return (
        <div className='col-6 col-md-3 col-xl-2 product-cart mt-md-1'> 
            <h5 className='d-flex justify-content-end pe-2'>               
               <span className={'bi bi-heart ' + className } onClick={ addProductToWishlist }></span>              
           </h5>
       <div onClick={ navigateToProductPage } >
            <img 
                    src={ process.env.REACT_APP_SERVER_URL + image  }
                    alt={ name } className='d-block mx-auto'
            />
            <p className='mb-sm-0 mt-1'> { name } </p>
            <Rating 
                  initialValue = { ratings }
                  readOnly = { true }
                  allowHover = { false }
                  className = { 'stars' }
                  size = { 15 }
              />
            <div className='price-wrapper'>
                    <CurrencyFormat 
                        value={ oldPrice } displayType='text' 
                        thousandSeparator={true} prefix='₦'
                    />
                    <CurrencyFormat 
                        value={ price } displayType='text' 
                        thousandSeparator={true} prefix='₦'
                    />
            </div>
        </div>
    </div>
  )    
}

export default ProductCart