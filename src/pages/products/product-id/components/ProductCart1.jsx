import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

const ProductCart = ( props ) => {

    const { id, image , price , oldPrice , name , rating } = props
    const ratings = parseFloat(rating).toFixed(1)
    const navigate = useNavigate()
    const discountPercentage =  ( ( ( oldPrice - price  ) / oldPrice  ) * 100 ).toFixed(1) ;
    
    const navigateToProductPage = () => { 
        navigate( `/products/${ id }` )
        window.scroll(0,0)
    }    

    return (
        <div className='me-3 product-cart mt-1'> 
            <h5 className='d-flex px-2'>
               <span className='discount py-1 text-center'> - { discountPercentage }% </span>                
           </h5>
           <div onClick={ navigateToProductPage }>
                <img 
                        src={ process.env.REACT_APP_SERVER_URL + image  }
                        alt={ name } className='w-100'
                />
                <p className='mb-1 mb-sm-0 mt-1'> { name } </p>
                <Rating 
                      initialValue = { ratings }
                      readOnly = { true }
                      allowHover = { false }
                      className = { 'stars' }
                      size = {  window.matchMedia('max-width(500px)') ? 17 : 20 }
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