import React from 'react'
import { useSearchParams , Navigate } from 'react-router-dom'
import SignupForm from './components/Signup'
import Login from './components/Login'
import { useSelector } from 'react-redux'
import './login-signup.scss'

const LoginSignup = () => {

  const [ searchParams ] = useSearchParams()
  const actionQuery = searchParams.get('action')
  const { isAuth } = useSelector( state => state.login )
  
  if( isAuth ) {
    return ( <Navigate to='/' />  )
  }

  return (
    <section className='login-signup my-2 my-md-5'>
        { 
          ( actionQuery === 'register' ) ?
                <div className='signup-wrapper mx-auto'>
                    <SignupForm />
                </div>
                :
                <div className='login-wrapper mx-auto'>
                      <Login />
                </div>
         }
    </section>
  )
}

export default LoginSignup