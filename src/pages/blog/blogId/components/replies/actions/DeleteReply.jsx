import React from 'react'
import LoadingSpinner from '../../../../components/LoadingSpinner'
import { RepliesContext } from '../repliesContext'

const DeleteReply = ({ replyId }) => {

 const  { setReplies , commentId } = React.useContext( RepliesContext )
 const [ loading , setLoading ] = React.useState(false)
 
 const deleteReply = () => {
    setLoading(true)
    const fetcher = async () => {
        const request = await fetch(
                 `${ process.env.REACT_APP_SERVER_URL }api/blog-replies.php` ,
                 {
                    method : 'DELETE',
                    headers : {
                        'content-type' : 'application/json'
                    } ,
                    body : JSON.stringify({ replyId , commentId })
                 }
              )
        const response = await request.json()
         if( response.status ) {                  
              setReplies([...response.replies])
              setLoading( false )
           }       
         else {
               setReplies([])
              setLoading( false )
         }
       }
       fetcher()
 }

  return (
    <React.Fragment>  {  console.log(commentId) }
         <span className='text-danger ms-3 ms-md-4 ' onClick={ deleteReply }> 
            Delete
        </span>
        {  loading &&
            <div className='loading-spinner-full'>
              <LoadingSpinner />
           </div>
        }
    </React.Fragment>
  )
}

export default DeleteReply