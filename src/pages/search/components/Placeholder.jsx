import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Placeholder = () => {
  return (
    <div className='row justify-content-between placeholder-container py-1 py-md-3 px-md-3'>
        <div className='col-12 col-md-5 image-wrapper'>
            <Skeleton baseColor='#e9e8e8' className='image-placeholder' />
        </div>
        <div className='col-12 col-md-6 description-wrapper mt-3 mt-sm-0 mb-0 pb-0'>
            <Skeleton baseColor='#e9e8e8' className='name-1' />
            <Skeleton baseColor='#e9e8e8' className='name-2 mt-3' />
            <Skeleton baseColor='#e9e8e8' className='name-3 mt-3' />
            <Skeleton baseColor='#e9e8e8' className='name-4 mt-3' />
            <Skeleton baseColor='#e9e8e8' className='name-5 mt-3' />
            <Skeleton baseColor='#e9e8e8' className='name-6 mt-3' />
            <Skeleton baseColor='#e9e8e8' className='name-7 mt-3' />
        </div>
    </div>
  )
}

export default Placeholder