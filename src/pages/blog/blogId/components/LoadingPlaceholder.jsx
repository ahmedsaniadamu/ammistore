import React from 'react'
import LoadingEffect2 from '../../../../global-components/loading-effect/LoadingEffect2'

const LoadingPlaceholder = () => {
  return (
    <div className='placeholder-wrapper ms-3'>
        <LoadingEffect2 className={'mt-2'} />
        <LoadingEffect2 className={'mt-2'} />
        <LoadingEffect2  className={'mt-2'} />
        <LoadingEffect2  className={'mt-2'}/>
        <LoadingEffect2  className={'mt-2'}/>
        <LoadingEffect2  className={'mt-2'}/>
        <LoadingEffect2  className={'mt-2'}/>
   </div>
  )
}

export default LoadingPlaceholder