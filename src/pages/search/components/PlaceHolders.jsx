import React from 'react'
import LoadingEffect from '../../../global-components/loading-effect/LoadingEffect'

const PlaceHolders = () => {
  return (
    <>
       <div className='placeholder-container d-flex justify-content-between'>
            <LoadingEffect />
            <LoadingEffect  />
            <LoadingEffect />
            <LoadingEffect  />
            <LoadingEffect />
            <LoadingEffect />
            <LoadingEffect className={ 'mobile-none' } />
            <LoadingEffect className={'mobile-none'}/>
            <LoadingEffect className={ 'mobile-none' } />
            <LoadingEffect className={'mobile-none'}/>
            <LoadingEffect className={ 'mobile-none' } />
            <LoadingEffect className={'mobile-none'}/>
       </div>
    </>
  )
}

export default PlaceHolders