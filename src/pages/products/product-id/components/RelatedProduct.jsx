import React, { useEffect, useState } from 'react'
import LoadingEffect from '../../../../global-components/loading-effect/LoadingEffect'
import ProductCart from './ProductCart1'

const RelatedProduct = ({ category , id }) => {
    
  const [ products , setProducts ] = useState([])
     
  useEffect(
    () => {
      if( id && category ){
        const fetcher = async () => {
          const res = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/related-product.php?category=${ category }&id=${ id }`)
          const data = await res.json() 
          setProducts( data )
       }   
       fetcher() 
      }
    } , [ id , category ]
  )
   
  return (
    <div className='related-products mt-2 px-1 px-md-2 pb-2 pb-md-3 mb-3'>
        <h5 className='py-2 border-bottom'> Related Products </h5>
         {
             products.length ? 
             <div className='related-products-wrapper'>
                 {  products.map( product => {
                          return(
                             <ProductCart {...product} key={ product.id } />
                          )
                   } ) }
             </div> 
             :
             <div className='placeholder-container d-flex justify-content-center justify-content-md-between'>
                <LoadingEffect className={'ms-1 ms-sm-0'}/>
                <LoadingEffect className= {'d-none d-xl-block'} />
                <LoadingEffect className={ 'mobile-none' } />
                <LoadingEffect className={'mobile-none'}/>
            </div>
         } 
    </div>
  )
}

export default RelatedProduct