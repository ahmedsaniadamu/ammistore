import React, { useState , useEffect } from 'react'
import Reply from './Reply'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useSelector } from 'react-redux'

const CommentReplies = ({ commentId }) => {
 
  const [ replies , setReplies ] = useState([])  

  useEffect(
    () => {
     const fetcher = async () => {
       const request = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/blog-replies.php?commentId=${ commentId }`)
       const result = await request.json()
        if( result.status ) {
             setReplies([...result.replies])
          }       
      }
      fetcher()
    } , [ commentId]
  )

  return (
    <>
        {   
            replies.length ?
               <Reply replies = { replies } />              
            : 
              <LoadingSpinner />
         }
    </>
  )
}

export default CommentReplies