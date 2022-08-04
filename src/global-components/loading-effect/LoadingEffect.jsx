import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './loading-effect.scss'

const LoadingEffect = ({ className }) => {
  return (
    <div className={ 'loading-effect-1 ' + className }>
        <Skeleton baseColor='#e9e8e8' className='image-placeholder' />
        <Skeleton baseColor='#e9e8e8' className='product-name-placeholder mt-2' />
        <Skeleton baseColor='#e9e8e8' className='rating-placeholder mt-2' />             
    </div>
  )
}

export default LoadingEffect