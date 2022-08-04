import React from 'react'
import './404.scss'
import { Link } from 'react-router-dom'
import { useNavigateTop } from '../../global-components/custom-hooks/useNavigateTop'

const _404 = () => {
  useNavigateTop()
  return (
    <div className='_404 mt-3 d-flex align-items-center mx-0 mx-md-5 justify-content-center'>
         <div>
            <h5 className='text-center'> 404 </h5>
            <h6 className='text-center'>
                <span className='text-danger'> Oops! </span>
                Page Not Found.
            </h6>
            <p className='text-center'>
                The page you are looking for had been removed , temporary unavailable 
                or have been moved to a permanent new address.
            </p>
            <Link to='/' className='btn btn-success py-2 text-center mx-auto d-block bi bi-arrow-left'> 
                &nbsp;Back to Home 
            </Link>
         </div>
    </div>
  )
}

export default _404