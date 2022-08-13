import React from 'react'
import useSWR from 'swr'
import LoadingEffect from '../../../global-components/loading-effect/LoadingEffect'
import { useSelector } from 'react-redux'
import ProductCart from './ProductCart1'

const MoreItems = () => {

    const fetcher = async () => {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + 'api/product.php?filter=more-items&limit=8')
        const data = await res.json() 
        return data ;
    }     
   
  const {  data } = useSWR( 'more-products', fetcher )
  const  wishlist  =  useSelector( state => state.wishlist )

  if(!data){
      return(
        <div className='placeholder-container d-flex justify-content-center justify-content-md-between'>
            <LoadingEffect />
            <LoadingEffect className= {'mobile-none'} />
            <LoadingEffect className={ 'mobile-none' } />
            <LoadingEffect className={'d-none d-xl-block'}/>
       </div>
      )
  }

  return (
      <div className='add-more-items-wrapper d-block mt-sm-3'>         
         {             
           data.map( product => {
                //search and apply a color indicator if an item is already added to wishlist
                let searchWishlist =  wishlist.products.find( ({ id }) => id === product.id )
                let className = ( searchWishlist === undefined ) ? 'not-added-wishlist' : 'added-wishlist'
                 
                return ( 
                         <ProductCart key={ product.id } {...product} className = { className } /> 
                      )
            })
         }
      </div>
  )
}

export default MoreItems