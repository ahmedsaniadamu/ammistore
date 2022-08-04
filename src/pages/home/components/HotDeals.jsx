import React from 'react'
import LoadingEffect from '../../../global-components/loading-effect/LoadingEffect'
import { useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import useSWR from 'swr'

const HotDeals = ({ className }) => {
    
  const fetcher = async () => {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + 'api/product.php?filter=hot-deals&limit=6')
        const data = await res.json() 
        return data ;
    }     
   
  const {  data } = useSWR('hot-products', fetcher )

  return (
    <div className={'hot-deals ' + className }>
        <h5 className='pb-2 pt-3 border-bottom mb-1 mb-md-3'> Hot Deals </h5>
        {
            data ? <div className='products-wrapper d-flex justify-content-md-between'> 
                        {
                            data.map(  product => {
                            return(
                                <ProductCart key={ product.id } {...product} />
                            )
                            } )
                        } 
                    </div>
                :
                <div className='placeholder-wrapper d-flex justify-content-center justify-content-md-between'>
                    <LoadingEffect />
                    <LoadingEffect className={'m-none'} />
                    <LoadingEffect className={'m-none'}/>
                    <LoadingEffect className={'mt-3 m-none'} />
                    <LoadingEffect className={'mt-3 m-none'} />
                    <LoadingEffect className={'mt-3 m-none'} />
                </div>
            }
        <img src='/assets/IMG_20220522_090526.png' alt='black friday' className='black-friday w-100 mt-3' />
    </div>
  )
}

const ProductCart = ({ id , image , name , oldPrice , price  }) => {
    const navigate = useNavigate()
    const navigateToProductPage = () => navigate( `/products/${ id }` )
    
    return(
        <div className='product-cart' onClick={ navigateToProductPage }>
             <img src={ process.env.REACT_APP_SERVER_URL + image } alt={ name } />
             <p className='mb-0'> { name } </p>
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
export default HotDeals