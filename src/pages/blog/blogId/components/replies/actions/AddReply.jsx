import React,{ useContext, useState } from 'react'
import { RepliesContext } from '../repliesContext'
import { CommentsContext } from '../../comments/commentsContext'
import LoadingSpinner from '../../../../components/LoadingSpinner' 
import { useSelector } from 'react-redux'

const AddReply = () => {
    
    const { commentId , setReplies } = useContext( RepliesContext )
    const { postComments , setPostComments } = useContext( CommentsContext )
    const { id } = useSelector( state => state.login )
    const [ addReply , setAddReply ] = useState({
        reply : '',
        errorMessage : ''
     })
    const [ loading , setLoading ] = useState(false) 

    const handleAddReply = (event) => {          
        event.preventDefault()               
        if( !addReply.reply ) {
             setAddReply({...addReply , errorMessage : 'Error! No empty reply.'})
             return
         }           
        //--------------------------------------------------------------------//
             // send new reply to the backend on error free
        //--------------------------------------------------------------------//           
        else{                     
            setAddReply({...addReply , errorMessage : ''})
            setLoading(true)            
            let _addReply = async () => {                            
                const req = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/blog-replies.php`,
                  {
                    method : 'POST',
                    headers : {
                            'content-type' : 'application/json'
                          } ,
                    body : JSON.stringify({
                        method : 'POST',
                        customerId : id , 
                        commentId ,
                        reply : addReply.reply
                      })
                  })
                const res = await req.json()
                if(res.status){     
                       // update replies
                        setReplies([...res.replies])    
                        //update comment total replies
                        setPostComments({
                             ...postComments,                               
                             comments : [...postComments.comments].map(
                                  comment => {
                                     if( comment.id === commentId ){
                                        comment.totalReplies = res.replies.length
                                     }
                                     return comment;
                                  }
                             ) })          
                        setLoading(false)                                   
                      //close edit reply modal
                      document.querySelector(`#close-add-reply-btn-${ commentId }`).click()
                  }   
              }
             _addReply() 
          }
    }
    return(
        <>
           <button 
                 className='btn btn-success py-1 px-3 bi bi-reply'data-bs-toggle='offcanvas'
                  onClick={ () => setAddReply({ ...addReply , reply : '' })}
                 data-bs-target={ `#add-reply-${ commentId }`}
            > 
               &nbsp;Reply
           </button>
           <div className='offcanvas offcanvas-bottom add-reply-container mx-md-auto' id={ `add-reply-${ commentId }`}>
           <div className='offcanvas-header border-bottom py-2'>
               <h5 className='offcanvas-title bi bi-reply'> Add Reply </h5>
               <button 
                     className='p-1 bi bi-x-lg' id={`close-add-reply-btn-${ commentId }`}
                     data-bs-dismiss='offcanvas'
               ></button>
           </div>
           <div className='offcanvas-body py-0 px-1 px-md-2'>            
                  <form className='add-reply-form mx-auto py-2 py-md-3'>
                       <textarea 
                             name="addReply" 
                             value = { addReply.reply }
                             onChange = { e => setAddReply({...addReply,reply : e.target.value}) }
                             className = 'form-control py-2 add-reply-textarea'
                        ></textarea>
                      <div className='text-danger mt-1'>
                          { addReply.errorMessage }
                      </div> 
                      <div className='d-flex justify-content-end mt-3'>
                          <button type='submit' onClick={ handleAddReply } className='btn btn-success px-4'>
                               Reply
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

export default AddReply