import React  from 'react'
import useSWR from 'swr'
import LoadingEffect2 from '../../../global-components/loading-effect/LoadingEffect2'
import { useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import { Rating } from 'react-simple-star-rating'

const SpecialProducts = ({ className }) => {

    const fetcher = async () => {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + 'api/product.php?filter=special&limit=6')
        const data = await res.json() 
        return data ;
    }     
   
  const {  data } = useSWR('special-products', fetcher )

  return (
    <div className={'special-products ' + className }> 
         <h5 className='pb-2 border-bottom bi bi-bag-plus pt-3'> Special Products </h5>
           {
              data ? <div className='products-wrapper'> 
                         {
                             data.map(  product => {
                                return(
                                    <ProductCart key={ product.id } {...product} />
                                )
                             } )
                         } 
                     </div>
                    :
                    <div className='placeholder-wrapper ms-2 ms-sm-0'>
                        <LoadingEffect2 className={'mt-2'} />
                        <LoadingEffect2 className={'mt-2'} />
                        <LoadingEffect2  className={'mt-2'} />
                        <LoadingEffect2  className={'mt-2'}/>
                  </div>
           }
    </div>
  )
}

const ProductCart = ({ id , name , image , oldPrice , price , rating }) => {
     
    const navigate = useNavigate()
    const navigateToProductPage = () => navigate( `/products/${ id }` )
    const ratings = parseFloat(rating).toFixed(1)

    return(
        <div className='w-100 d-flex product-cart mt-3 mx-2 mx-md-1' onClick={  navigateToProductPage }>
            <img  src={ process.env.REACT_APP_SERVER_URL + image } alt={ name }  />
             <div className='ms-2'> 
                 <p className='mb-0 mt-1'>  { name } </p>               
                 <Rating 
                      initialValue = { ratings }
                      readOnly = { true }
                      allowHover = { false }
                      className = { 'stars' }
                      size = {  window.matchMedia('max-width(500px)') ? 17 : 20 }
                  />
                 <div className='price-wrapper mt-1 mt-sm-0'>
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

export default SpecialProducts