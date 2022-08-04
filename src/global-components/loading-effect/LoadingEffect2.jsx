import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './loading-effect.scss'

const LoadingEffect2 = ({ className }) => {
  return (
    <div className={ 'loading-effect-2 d-flex flex-nowrap ' + className }>
        <Skeleton baseColor='#e9e8e8' borderRadius={ 50 } className='image-placeholder' />
         <div className='wrapper ms-2 mt-2'>
            <Skeleton baseColor='#e9e8e8' className='product-name-placeholder mt-2' />
            <Skeleton baseColor='#e9e8e8' className='rating-placeholder mt-2' />   
         </div>          
    </div>
  )
}

export default LoadingEffect2