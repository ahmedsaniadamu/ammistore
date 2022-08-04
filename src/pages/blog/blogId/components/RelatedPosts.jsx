import React, { useState , useEffect } from 'react'
import { useSWRConfig } from 'swr'
import { useNavigate } from 'react-router-dom'
import LoadingPlaceholder from './LoadingPlaceholder'

const RelatedPosts = ({ postId }) => {

    const [ relatedPosts , setRelatedPosts ] = useState([])
    const navigate = useNavigate()
    const {  mutate } = useSWRConfig()
    const dateOptions = { weekday : 'long' , year : 'numeric' , month : 'short' , day : 'numeric'}

    useEffect(
        () => {
            const fetcher = async () => {
                const request = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/related-posts.php?postId=${ postId }`)
                const relatedPosts = await request.json()
                setRelatedPosts( relatedPosts )
               }
            fetcher()
        } , [ postId ]
    )

    // refetch and update catched post data in swr
    const refreshBlogPostData = ( id , title )=> {
         const fetcher = async () => {
          const request = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/post.php?postId=${ postId }`)
          const data = await request.json()
          return data
         }         
         // tell all SWRs with this key to revalidate
         mutate('blog/postId' , fetcher)
         navigate(`/blog/${id}-${ title.replace(/ /g,'-') }`)
         window.scroll(0,0);
    }

  return (
    <div className='border-start  border-top h-auto pb-3'>
         <h5 className='border-bottom py-2 ps-3'> Related Posts </h5>
         {
            relatedPosts.length ?                  
                    relatedPosts.map( post => {
                        return(
                          <div 
                                className='d-flex mb-2 mb-md-3 ms-2' key={ post.id }
                                 onClick={ () => refreshBlogPostData( post.id , post.title ) } 
                          >
                               <img src={ process.env.REACT_APP_SERVER_URL + post.image } alt={ post.title } />
                               <div className='ms-1'>
                                <p className='mb-1 pb-0'> { post.title } </p>
                                <span className='bi bi-calendar-check'> 
                                     &nbsp;
                                        {  
                                          `${ new Date(post.postedAt)
                                            .toLocaleDateString(
                                                'en-US', dateOptions
                                              ) 
                                        }` }                                               
                                </span>
                             </div>
                     </div>
                        )
                    } )
              :
            <LoadingPlaceholder />
         }
    </div>
  )
}

export default RelatedPosts