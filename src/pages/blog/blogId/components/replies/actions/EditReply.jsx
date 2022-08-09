import React,{ useContext, useState } from 'react'
import { RepliesContext } from '../repliesContext'
import LoadingSpinner from '../../../../components/LoadingSpinner'

const EditReply = ({ replyId , reply }) => {

  const { commentId , setReplies } = useContext(RepliesContext)
  const [ editReply , setEditReply ] = useState({
     reply : '',
     errorMessage : ''
  })
 const [ loading , setLoading ] = useState(false)   

 const handleEditReply = (event) => {          
      event.preventDefault()               
      if( !editReply.reply ) {
           setEditReply({...editReply , errorMessage : 'Error! No empty reply.'})
           return
       }  
      else if( editReply.reply === reply ) return
      //--------------------------------------------------------------------//
           // send the updated reply to the backend on error free
      //--------------------------------------------------------------------//           
      else{                     
          setEditReply({...editReply , errorMessage : ''})
          setLoading(true)            
          let _editReply = async () => {                            
              const req = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/blog-replies.php`,
                {
                  method : 'PATCH',
                  headers : {
                          'content-type' : 'application/json'
                        } ,
                  body : JSON.stringify({ 
                      replyId , 
                      commentId ,
                      reply : editReply.reply
                    })
                })
              const res = await req.json()
              if(res.status){     
                      setReplies([...res.replies])              
                      setLoading(false)                                   
                    //close edit reply modal
                    document.querySelector(`#close-reply-btn-${ replyId }`).click()
                }   
            }
           _editReply() 
        }
    }
  return (
    <>       
        <span 
              onClick={ () => setEditReply({ errorMessage : '' , reply }) }
              className='text-info'  data-bs-toggle='offcanvas'
              data-bs-target={ `#edit-reply-${ replyId }`}
         >
             Edit  
       </span>
       <div className='offcanvas offcanvas-bottom edit-reply-container mx-md-auto' id={ `edit-reply-${ replyId }`}>
           <div className='offcanvas-header border-bottom py-2'>
               <h5 className='offcanvas-title bi bi-pencil-square'> Edit Reply </h5>
               <button 
                     className='p-1 bi bi-x-lg' id={`close-reply-btn-${ replyId }`}
                     data-bs-dismiss='offcanvas'
               ></button>
           </div>
           <div className='offcanvas-body py-0 px-1 px-md-2'>            
                  <form className='edit-reply-form mx-auto py-2 py-md-3'>
                       <textarea 
                             name="editReply" 
                             value = { editReply.reply }
                             onChange = { e => setEditReply({...editReply,reply : e.target.value}) }
                             className = 'form-control py-2 edit-reply-textarea'
                        ></textarea>
                      <div className='text-danger mt-1'>
                          { editReply.errorMessage }
                      </div> 
                      <div className='d-flex justify-content-end mt-3'>
                          <button type='submit' onClick={ handleEditReply } className='btn btn-success px-4'>
                              Edit
                           </button>
                          <button 
                              type='button'
                             className='btn btn-danger  ms-3 px-4'
                             data-bs-dismiss='offcanvas'
                            > 
                               Cancel 
                           </button>
                      </div> 
                 </form>                               
           </div>
       </div>
       {
          loading && <div className='loading-spinner-full'>
               <LoadingSpinner />
          </div>
       }
    </>
  )
}

export default EditReply