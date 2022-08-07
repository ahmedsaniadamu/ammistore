import React from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import './blog-id.scss'
import { useNavigateTop } from '../../../global-components/custom-hooks/useNavigateTop'
import useSWR  from 'swr'
import RelatedPosts from './components/RelatedPosts'
import PostComments from './components/comments/PostComments'
 
const BlogId = () => {

  useNavigateTop()
  const { postTitle } = useParams()
  const postId =  parseInt( postTitle.slice(0, postTitle.indexOf('-')) )
  
  const fetcher = async () => {
        const request = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/post.php?postId=${ postId }`)
        const data = await request.json()
        return data
  }
  const dateOptions = { weekday : 'long' , year : 'numeric' , month : 'short' , day : 'numeric'}
  const { data } = useSWR('blog/postId' , fetcher )
  
  return (
    <section className='blog-id-page px-1 px-md-3 px-xl-5'>               
         {
            data ?
              <div className='row pt-3 pt-md-4'>
                  <div className='col-12 col-md-8 col-xl-9 post-info'>
                     <h5> { data.title } </h5>
                     <div className='header-info'>
                          <span className='ms-1'>                                                                     
                               Posted At :
                                <i className='ms-2'>           
                                  {  
                                      `${ new Date(data.postedAt)
                                      .toLocaleDateString(
                                          'en-US', dateOptions
                                        ) 
                                  }` }      
                                   &nbsp;&nbsp;
                                    {
                                      `${  new Date( data.postedAt ).toLocaleTimeString()}`
                                    }                      
                                </i> 
                          </span>
                          {
                             data.postedAt !== data.updatedAt &&
                             <span className='ms-4'>                                                                     
                                 Updated At :
                                  <i className='ms-2'>           
                                    {  
                                        `${ new Date(data.updatedAt)
                                        .toLocaleDateString(
                                            'en-US', dateOptions
                                          ) 
                                    }` }      
                                    &nbsp;&nbsp;
                                    {
                                      `${  new Date( data.updatedAt ).toLocaleTimeString()}`
                                    }                     
                                  </i> 
                              </span>
                          }
                          <span className='ms-4'> 
                              Author : 
                             <i className='ms-2'> { data.author } </i> 
                          </span> 
                      </div>
                      <div className='social-media mt-md-2'>
                            SHARE ON : &nbsp; &nbsp;
                            <a href='#' className='bi bi-facebook me-4' target={'_blank'}></a>
                            <a href="#" className='bi bi-whatsapp me-4' target={'_blank'}></a>
                            <a href="#" className='bi bi-twitter me-4' target={'_blank'}></a>
                            <a href="#" className='bi bi-instagram me-3' target={'_blank'}></a>                            
                        </div>
                      <img 
                          src={ process.env.REACT_APP_SERVER_URL + data.image }
                          alt={ data.name }
                          className='w-100 mt-1'
                        />
                     <p className='px-md-2 pt-2'> { data.body } </p>                   
                     <div className='comments-container mt-3'>
                         <h5 className='border-bottom border-2 border-success d-inline-block pe-2 mb-3'>
                             Comments 
                          </h5>
                          <PostComments  postId = { postId } />                          
                     </div>
                  </div>
                 <div className='col-12 col-md-4 col-xl-3 related-post px-0'>
                     <RelatedPosts postId = { postId } />
                 </div>
              </div>
              :
              <LoadingSpinner />
         }
    </section>
  )
}

export default BlogId