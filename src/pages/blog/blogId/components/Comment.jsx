import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CommentReplies from './CommentReplies'

const Comment = ({ comment }) => {

  const { isAuth } = useSelector( state => state.login )
  const dateOptions = { weekday : 'long' , year : 'numeric' , month : 'short' , day : 'numeric'}
  const [ viewReply , setViewReply ] = React.useState(true)

  return (
    <div className='d-flex comment mb-2 ms-2 ms-md-5'>
        <i className='bi bi-person-circle'></i>
        <div className='ms-2'>
            <h5> 
                 <span> { comment.customer_name } </span>                 
                  { 
                    comment.customer_website && 
                    <a href={ comment.customer_website } className='bi bi-link ms-4'></a>
                 }                 
                   <i> 
                     {   
                       `${ new Date(comment.commentedAt).toLocaleDateString( 'en-US', dateOptions ) }`
                     }   
                   </i>
                   <small> Reply ({ comment.totalReplies }) </small>
            </h5>
            <p className='mb-1 comment-body'> {  comment.comment } </p>
            {  
               comment.totalReplies > 0 && 
                <React.Fragment>
                       <span 
                             className='me-4 view-reply' data-bs-toggle='collapse'
                             data-bs-target='#reply'
                             onClick={ () => setViewReply( !viewReply ) }
                         >
                          { viewReply ? 'View' : 'Hide' } Replies
                      </span>
                      <div id='reply' className='collapse ms-0 ps-0 ps-md-3 reply-container'>
                           <CommentReplies commentId = { comment.id } />
                      </div>
                </React.Fragment>
            }
            {
                isAuth ?
                 <button className='btn btn-success py-1 px-3 bi bi-reply'> 
                     &nbsp;Reply
                 </button>
                 :
                 <Link to = '/signup?action=register' className='link'> Login to reply. </Link>
            }
        </div>
    </div>
  )
}

export default Comment