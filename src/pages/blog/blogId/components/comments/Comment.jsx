import React from 'react'
import CommentReplies from '../replies/CommentReplies'

const Comment = ({ comment }) => {
 
  const dateOptions = { weekday : 'long' , year : 'numeric' , month : 'short' , day : 'numeric'}   

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
            <CommentReplies comment = { comment } />
        </div>
    </div>
  )
}

export default Comment