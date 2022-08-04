import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

const ProductCart = ({ name , id , image , price , oldPrice , rating }) => {
 
    const navigate = useNavigate()       
    const ratings = parseFloat(rating).toFixed(1)

    const navigateToProductPage = () => navigate( `/products/${ id }` )    

    return (
        <div className='col-6 col-md-3 col-xl-2 product-cart mt-1'>             
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