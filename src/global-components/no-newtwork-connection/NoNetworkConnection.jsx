import React from 'react'
import './no-network-connection.scss'

const NoNetworkConnection = () => {
  return (
    <div className='no-network-connection d-flex align-items-center mx-0 mx-md-5 justify-content-center'>
         <div>
                <h5 className='text-center bi bi-wifi-off'>  </h5>
                <h6 className='text-center'>
                    <span className='text-danger me-1'> Error! </span>
                    No Network Access
                </h6>
                <p className='text-center'>
                    You are not connected to the internet. please
                    check your internet settings and try again.
                </p>
         </div>
    </div>
  )
}

export default NoNetworkConnection