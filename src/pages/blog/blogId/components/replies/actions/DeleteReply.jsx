import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../../components/LoadingSpinner'
import { RepliesContext } from '../repliesContext'
import { CommentsContext } from '../../comments/commentsContext'

const DeleteReply = ({ replyId }) => {

 const  { setReplies , commentId } = React.useContext( RepliesContext )
 const { postComments , setPostComments } = React.useContext( CommentsContext )
 const [ loading , setLoading ] = React.useState(false)
 const navigate = useNavigate()

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
               //update comment total replies
               setPostComments({
                     ...postComments,                               
                     comments : [...postComments.comments].map(
                           comment => {
                              if( comment.id === commentId ){
                                 comment.totalReplies = response.replies.length
                              }
                              return comment;
                           }
                     ) })  
              setLoading( false )
           }       
         else {
               setLoading( false )
               navigate(0)                
         }
       }
       fetcher()
 }
  return (
    <React.Fragment> 
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