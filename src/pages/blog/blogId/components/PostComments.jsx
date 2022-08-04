import React,{ useState , useEffect } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import Comment from './Comment'

const PostComments = ({ postId }) => {

  const [ postComments , setPostComments ] = useState({
     status : 0 ,
     comments : [] ,
  })

  useEffect(
     () => {
      const fetcher = async () => {
        const request = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/blog-comments.php?postId=${ postId }`)
        const result = await request.json()
         if( result.status ) {
              setPostComments({ status : 200 , comments : [...result.comments] })
           }
         else {
            setPostComments({ status : 404 , comments : [] })
         }
       }
       fetcher()
     } , [ postId ]
  )

  return (
    <div>
         {   
            postComments.comments.length ?  
               postComments.comments.map( comment => {
                  return(
                    <Comment key = { comment.id } comment = { comment } />
                  )
               } )
            :
            ( postComments.status === 404 ) ? 
                       <p className='py-4 text-center'>  No any Comments Yet! </p>
                          :
                       <LoadingSpinner />
         }
    </div>
  )
}

export default PostComments