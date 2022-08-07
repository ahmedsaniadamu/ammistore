import React, { useState , useContext } from 'react'
import { Formik , Form , Field , ErrorMessage } from 'formik'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { CommentsContext } from './commentsContext'

const CommentForm = ({ postId }) => {

 const { setPostComments } = useContext( CommentsContext )
 const [ loading , setLoading ] = useState(false)   
 const  initialValues = { 
         email : '' ,
         customerName : '' ,
         website : '' ,
         comment : '' 
      }
  //formik custom validation function
 const validate = values => {
      const errors = {};
     //email validation
      if (!values.email)  errors.email = 'Error! your email address is required'
      else if (values.email.length > 150) errors.email = 'Must be 150 characters or less' 
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
      }      
      if (!values.customerName)  errors.customerName = 'Sorry! your name is required'
      if (!values.comment)  errors.comment = 'Error! comment field cannot be empty'       
      return errors ;
   }

   const addComment = () => {      
        setLoading(true)
       //submit comment data to the backend using FormData API
       let formData = new FormData( document.querySelector('form.comment-form') )
       const sendComment = async () => {
           const req = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/blog-comments.php`,
           {
             method : 'post',
             body : formData
           })
           const res = await req.json()
           if(res.status){              
                setPostComments({ status : 0 , comments : [...res.comments] })                
                setLoading(false)                 
                //clear comment form
                document.querySelector('.reset-button').click() 
                //scroll back to comments top
                 const elementPos = element => document.querySelector(element).getBoundingClientRect().height
                 window.scrollTo({ 
                                 top : elementPos('div.post-info') - elementPos('div.comments-container') ,
                                 behavior : 'smooth'
                                })                              
           }   
       }
       sendComment() 
   }

  return (
    <div className='comment-form-wrapper'>  
         <fieldset className='border-top border-2 w-100 float-none mt-4'>
            <legend className='float-none ms-md-4 px-1 w-auto'> Leave a Comment </legend>
         </fieldset>
         <p className='mb-0 text-center text-md-start'>
              Note : your  email address won't be published.
              Requred fields are marked with *
         </p>
         <Formik initialValues={ initialValues } validate = { validate } onSubmit = { addComment }>
            <Form className='comment-form mx-auto py-2 py-md-3'>
              <input type='hidden' name='postId' value={ postId } />
              <label htmlFor='customerName'>
                    Full Name 
              </label>
              <Field name='customerName' type='text' className='form-control py-3 text-capitalize' id='customerName' />
              <div className='text-danger'>
                  <ErrorMessage name='customerName' />
              </div> 
              <label htmlFor='email' className='mt-2'>
                    Email Address <span className='text-danger'> *</span>
                </label>
              <Field name='email' type='email' className = 'form-control py-3' id = 'email' />
              <div className='text-danger'>
                  <ErrorMessage name='email' />
              </div>  
              <label htmlFor='website' className='mt-2'>
                    Website URL 
                </label>
              <Field name='website' type='text' className = 'form-control py-3' id = 'website' />
              <div className='text-danger'>
                  <ErrorMessage name='website' />
              </div>  
              <label htmlFor='comment' className='mt-2'>
                    Comment <span className='text-danger'> *</span>
                </label>
              <Field name='comment' as = 'textarea' className = 'form-control py-2 comment-textarea' />
              <div className='text-danger'>
                  <ErrorMessage name='comment' />
              </div>              
              <button className='btn btn-success text-center mt-3 mb-0 mb-md-1 d-block ms-2'>  
                  Post  Comment
               </button>
               <input 
                    type='reset' value='' className='reset-button h-0 w-0'
                    style={{ visibility:'hidden'}} 
               />
            </Form>
         </Formik>
         {  loading &&
            <div className='loading-spinner-full'>
              <LoadingSpinner />
           </div>
        }
    </div>
  )
}

export default CommentForm