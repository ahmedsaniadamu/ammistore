import React,{ Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children , fallback }) => {
    
 const { isAuth } = useSelector( state => state.login )

  if( !isAuth ){
       return(
           <Navigate to={ fallback } />
       )
    }

    return ( 
            <Fragment> 
              { children }
           </Fragment> 
      )
}

export default ProtectedRoute