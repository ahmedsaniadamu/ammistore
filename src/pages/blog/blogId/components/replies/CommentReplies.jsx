import React, { useState , useEffect } from 'react'
import Reply from './Reply'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { RepliesContext } from './repliesContext'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AddReply from './actions/AddReply'

const CommentReplies = ({ comment }) => {
 
  const { isAuth } = useSelector( state => state.login )
  const [ replies , setReplies ] = useState([])  
  const [ viewReply , setViewReply ] = React.useState(true)

  useEffect(
    () => {
     const fetcher = async () => {
       const request = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/blog-replies.php?commentId=${ comment.id }`)
       const result = await request.json()
        if( result.status ) {
             setReplies([...result.replies])
          }       
      }
      fetcher()
    } , [ comment.id ]
  )

  return (
    <RepliesContext.Provider value={{ setReplies , commentId : comment.id }}>
        {  
          replies.length > 0 && 
          <React.Fragment>
                  <span 
                        className='me-4 view-reply' data-bs-toggle='collapse'
                        data-bs-target={`#reply-${ comment.id }`}
                        onClick={ () => setViewReply( !viewReply ) }
                    >
                    { viewReply ? 'View' : 'Hide' } Replies
                </span>
                <div id = {`reply-${ comment.id }`} className='collapse ms-0 ps-0 ps-md-3 reply-container'>
                      {   
                          replies.length ?
                              <Reply replies = { replies }  />              
                                  : 
                            <LoadingSpinner />
                      }
                </div>
          </React.Fragment>
        }
        {
            isAuth ?
                <AddReply  />
                   :
               <Link to = '/signup?action=register' className='link'> Login to reply. </Link>
        }         
    </RepliesContext.Provider>
  )
}

export default CommentReplies