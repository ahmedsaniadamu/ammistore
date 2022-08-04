import React from 'react'
import useSWR from 'swr'
import LoadingEffect from '../../../global-components/loading-effect/LoadingEffect'
import ProductCart from './ProductCart1'
import { useSelector } from 'react-redux'

const MobileAndAccessories = () => {

    const fetcher = async () => {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + 'api/product.php?filter=mobile-and-accessories&limit=8')
        const data = await res.json() 
        return data ;
    }     
   
  const {  data } = useSWR( 'mobile-and-accesories-products', fetcher )
  const  wishlist  =  useSelector( state => state.wishlist )

  if(!data){
      return(
        <div className='placeholder-container d-flex justify-content-center justify-content-md-between'>
            <LoadingEffect />
            <LoadingEffect className= {'mobile-none'} />
            <LoadingEffect className={ 'mobile-none' } />
            <LoadingEffect className={'mobile-none'}/>
       </div>
      )
  }

  return (
      <div className='mobile-and-accessories-product-wrapper d-block mt-sm-3'>         
         {             
           data.map( product => {
                //search and apply a color indicator if an item is already added to wishlist
                let searchWishlist =  wishlist.products.find( ({ id }) => id === product.id )
                let className = ( searchWishlist === undefined ) ? 'not-added-wishlist' : 'added-wishlist'
                 
                return ( 
                         <ProductCart key={ product.id } {...product} className = { className } /> 
                      )
          } )
         }
      </div>
  )
}

export default MobileAndAccessories