import React from 'react'
import useSWR from 'swr'
import LoadingEffect from '../../../global-components/loading-effect/LoadingEffect'
import { useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import CurrencyFormat from 'react-currency-format'

const Cameras = () => {

    const fetcher = async () => {
        const res = await fetch( process.env.REACT_APP_SERVER_URL + 'api/product.php?filter=cameras&limit=8')
        const data = await res.json() 
        return data ;
    }     
   
  const {  data } = useSWR( 'cameras', fetcher )
  
  if(!data){
      return(
        <div className='placeholder-container d-flex justify-content-center justify-content-md-between'>
            <LoadingEffect />             
            <LoadingEffect className={'m-none'} />
            <LoadingEffect className={'m-none'}/>
            <LoadingEffect className={'m-none mt-3'}/>
            <LoadingEffect className={'m-none mt-3'}/>
            <LoadingEffect className={'mt-3 m-none'} />
            <LoadingEffect className={'mt-3 m-none'} />
            <LoadingEffect className={'mt-3 m-none'} />
            <LoadingEffect className={'mt-3 m-none'} />
       </div>
      )
  }
  return (
    <div className='cameras-products-wrapper mt-sm-3 d-flex  justify-content-md-between'>         
        {             
         data.map( product => {                            
              return ( 
                       <ProductCart key={ product.id } {...product}  /> 
                    )
             } )
        }
    </div>
   )
}

const ProductCart = ({ id , image , name , oldPrice , price , rating  }) => {
    const navigate = useNavigate()
    const navigateToProductPage = () => navigate( `/products/${ id }` )
    const ratings = parseFloat(rating).toFixed(1)
    
    return(
        <div className='product-cart mb-md-4' onClick={ navigateToProductPage }>
             <img 
                   src={ process.env.REACT_APP_SERVER_URL + image }
                    alt={ name }  className = 'd-sm-block mx-sm-auto'
              />
             <p className='mb-0 mt-1'> { name } </p>
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
    )

}

export default Cameras