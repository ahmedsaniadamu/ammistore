import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import { validate } from './signup-validation';
import { useNavigateTop } from '../../../global-components/custom-hooks/useNavigateTop'
import { useDispatch } from 'react-redux';
import { signUser } from '../../../redux-store/loginSlice/LoginSlice';

const SignupForm = () => {

 useNavigateTop()
//formik input fields
 const initialValues =  { name: '', email: '' , number : '' , password : '' , confirmPassword : ''}
 const [ loading , setLoading ] = useState( false )
 const [ signupError , setSignupError ] = useState('')
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const handleSignup =  () => {  
    setLoading( true )                          
    // send form data to the backend using form data api
    const signupForm = document.querySelector('form.signup-form')
    const formData = new FormData( signupForm )
    const submitFormData = async () => {
        const response = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/signup.php`,
          {
            method : 'post',
            body : formData
          })
        const credentials = await response.json()
        //submit user credentials to redux store on successful registration.
        if( credentials.status ) {
            dispatch( signUser( credentials ) )
            navigate('/')            
        }  
        else setSignupError('Error! user already exist.')                              
        setLoading( false )
    }
    submitFormData()      
   }      
   
  return (
     <React.Fragment>
          <Formik initialValues={ initialValues } validate = { validate } onSubmit = { handleSignup }>
            <Form className='signup-form mx-auto py-3'>
                    <h5 className='mb-0'> Hey There! </h5>
                    <p className='mb-1'> Looks like you're new here. Enter your details and get started. </p>
                    <span className='divider mb-2'></span>

                <div className='input-wrapper'>
                    <label htmlFor='name'>Full Name <span className='text-danger'> *</span></label>
                    <Field name='name' type='text' className = 'form-control py-2' id = 'name' />
                    <div className='text-danger'>
                       <ErrorMessage name='name'/>
                    </div>
                </div>                    
                
                <div className='input-wrapper'>
                    <label htmlFor='email'>Email Address <span className='text-danger'> *</span></label>
                    <Field name='email' type='email' className = 'form-control py-2' id = 'email' />                    
                    <div className='text-danger'>
                        <ErrorMessage name='email' />
                    </div>
                </div>                     

                <div className='input-wrapper'>
                    <label htmlFor='number'>Contact Number <span className='text-danger'> *</span></label>
                    <Field name='number' maxLength = { 20 } type='number' className = 'form-control py-2' id = 'number' />                    
                    <div className='text-danger'>
                       <ErrorMessage name='number' />
                    </div>
                </div>                    

                <div className='input-wrapper'>
                    <label htmlFor='password'>Password <span className='text-danger'> *</span></label>
                    <Field name='password' type='password' className = 'form-control py-2' id = 'password' />                    
                    <div className='text-danger'>
                       <ErrorMessage name='password' />
                    </div>
                </div>                    

                <div className='input-wrapper'>
                    <label htmlFor='confirmPassword'>Confirm password <span className='text-danger'> *</span></label>
                    <Field name='confirmPassword' type='password' className = 'form-control py-2' id = 'confirmPassword' />                    
                    <div className='text-danger'>
                        <ErrorMessage name='confirmPassword' />
                        { signupError }
                    </div>  
                </div>
                                    
                <button type='submit' className='btn btn-success d-block mx-auto text-center py-2 mt-3'>
                    {  loading ? 'Loading...' : 'Signup'  }
                 </button>
                <p className='mt-2 mb-0'> 
                        Already have an account ? 
                        <Link to='/signup?action=login'> Login </Link> 
                </p>
            </Form>
        </Formik>
     </React.Fragment>
  );
}
export default SignupForm