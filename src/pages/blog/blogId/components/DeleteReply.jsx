import React from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'

const DeleteReply = ({ replyId }) => {

 const [ loading , setLoading ] = React.useState(false)
 //# a function to delete reply based on reply id
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
                    body : JSON.stringify({ replyId })
                 }
              )
        const response = await request.json()
         if( response.status ) {
              setLoading( false )
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