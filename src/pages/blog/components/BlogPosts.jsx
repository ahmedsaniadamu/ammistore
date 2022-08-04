import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogPosts = ({ posts }) => {
  const navigate = useNavigate()
  const handleNavigation = post => {
    navigate(`/blog/${ post.id }-${ post.title.replace(/ /gi,'-') }`)
  }
  const dateOptions = { weekday : 'long' , year : 'numeric' , month : 'short' , day : 'numeric'}

  return (
    <article className='row px-1 px-xl-3 blog-posts'>
         {
             posts.map( post => {
                 return(
                    <div className='col-12 col-sm-6 col-md-4 mb-3' key={ post.id }>
                        <div className='border p-0' onClick={ () => handleNavigation( post ) }>
                            <img
                                  src={ process.env.REACT_APP_SERVER_URL + post.image } 
                                  alt={ post.title }
                                  className='w-100' 
                            />
                            <h5 className='px-2 mt-2'>  { post.title } </h5>
                            <div className='ps-2'>
                                 <span className='bi bi-calendar-check ms-1'> 
                                    &nbsp;  {  `${ new Date(post.postedAt).toLocaleDateString('en-US', dateOptions ) }` } 
                                 </span>
                                 <span className='bi bi-person ms-4'> 
                                   &nbsp; { post.author } 
                                 </span>
                                 <span className='bi bi-chat-dots ms-4'> 
                                    &nbsp;  { post.totalComments } 
                                 </span>
                            </div>
                           <p className='px-2 mt-1'>  { post.content } </p>
                        </div>
                    </div>
                 )
             } )
         }
    </article>
  )
}

export default BlogPosts