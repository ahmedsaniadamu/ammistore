import React from 'react'
import './blog.scss'
import { useNavigateTop } from '../../global-components/custom-hooks/useNavigateTop'
import { Link } from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner'
import useSWR from 'swr'
import BlogPosts from './components/BlogPosts'

const Blog = () => {

  useNavigateTop()
  const fetcher = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER_URL + 'api/blog.php')
    const data = await res.json() 
    return data ;
 }     

const {  data } = useSWR( 'blog', fetcher )
  return (
    <section className='blog-page px-1'>
         <div className='bread-crumbs py-1'>
          <Link to={'/'} className='bi bi-house-door me-1'> Home</Link><small>/</small>
          <Link to={'/blog'} className='me-1'> Blog</Link>
        </div>     
        <fieldset className='border-top border-2 float-none'>
            <legend className='float-none w-auto mx-auto px-2'> Popular Posts </legend>
         </fieldset>
        {
           data ? <BlogPosts posts = { data } /> : <LoadingSpinner />  
        }       
    </section>
  )
}

export default Blog