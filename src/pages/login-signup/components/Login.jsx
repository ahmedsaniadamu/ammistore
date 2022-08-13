import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signUser } from '../../../redux-store/loginSlice/LoginSlice';
import { useNavigateTop } from '../../../global-components/custom-hooks/useNavigateTop'

const Login = () => {
 
 useNavigateTop()
 const initialValues = { email : '' , password : ''}
 const [ loading , setLoading ] = useState( false )
 const [ loginError , setLoginError ] = useState('')
 const dispatch = useDispatch()
 const navigate = useNavigate()
 //formik custom validation function
 const validate = values => {
    const errors = {};
       //email validation
        if (!values.email)  errors.email = 'Error! your email is required'
        else if (values.email.length > 150) errors.email = 'Must be 150 characters or less' 
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        //password validation
        if (!values.password)  errors.password = 'Error! your password is required'
        else if (values.password.length < 8 ) errors.password = 'Password must not be less than 8 characters' 
        return errors ;
 }

 const handleLogin =  () => {  
    setLoading( true )                          
    // send form data to the backend using form data api
    const signupForm = document.querySelector('form.login-form')
    const formData = new FormData( signupForm )
    const submitFormData = async () => {
        const response = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/login.php`,
          {
            method : 'post',
            body : formData
          })
        const credentials = await response.json()
        //submit user credentials to redux store on successful registration.
        if( credentials.status ) {        
            dispatch( signUser( credentials ) )                                           
            setLoading(false)
             navigate(-2,{ replace : true })
        }  
        else {
             setLoginError( credentials.messege )                          
              setLoading( false )
        }
    }
    submitFormData()      
   }      
 
  return (
    <React.Fragment>
        <Formik initialValues={ initialValues } validate = { validate } onSubmit = { handleLogin }>
            <Form className='login-form mx-auto py-2 py-md-3'>
                <div className='d-flex justify-content-center'>  
                   <span className='bi bi-person-circle'></span> 
               </div>
               <div className='input-wrapper mt-0'>
                    <label htmlFor='email'>Email Address <span className='text-danger'> *</span></label>
                    <Field name='email' type='email' className = 'form-control py-2' id = 'email' />                    
                    <div className='text-danger'>
                        <ErrorMessage name='email' />
                    </div>
                </div>  
                <div className='input-wrapper'>
                    <label htmlFor='password'>Password <span className='text-danger'> *</span></label>
                    <Field name='password' type='password' className = 'form-control py-2' id = 'password' />                    
                    <div className='text-danger'>
                       <ErrorMessage name='password' />
                       { loginError }
                    </div>
                </div>  
                <button type='submit' className='btn btn-success d-block mx-auto text-center py-2 mt-3'>
                    {  loading ? 'Loading...' : 'Login'  }
                 </button>
                <p className='mt-2 mb-0'> 
                        Don't have an account ? 
                        <Link to='/signup?action=register'> Signup </Link> 
                </p>
            </Form>
        </Formik>
    </React.Fragment>
  )
}

export default Login