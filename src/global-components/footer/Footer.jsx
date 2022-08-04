import React from 'react'
import BackToTop from './components/BackToTop'
import './footer.scss'
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <footer className='mt-2 w-100 mx-0'>
        <BackToTop />
        <div className='row px-2 px-sm-3 px-md-5 mt-3'>
            <div className='col-6 col-md-3'>
                <h5 className='mb-1'>  About Us </h5>
                <ul className='list-group px-0 m-0'>
                   <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > Help Center </Link>
                    </li>
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/blog'} > Blog </Link>
                    </li>                                       
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/contact'} > Contact us </Link>
                    </li>
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > About us </Link>
                    </li>
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > Careers </Link>
                    </li>
                </ul>
            </div>
            <div className='col-6 col-md-3'>
                <h5 className='mb-1'>  Make Money With Us </h5>
                <ul className='list-group px-0 m-0'>
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > Advertise with us </Link>
                    </li>   
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > Become an affiliate </Link>
                    </li>     
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > Sell on ammi </Link>
                    </li> 
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > Ammi Special offers </Link>
                    </li>                    
                </ul>
            </div>
            <div className='col-6 col-md-3'>
                <h5 className='mb-1'>  Know More </h5>
                <ul className='list-group px-0 m-0'>
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > Terms & Conditions </Link>
                    </li>   
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > Privacy Policy </Link>
                    </li>     
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > FAQs </Link>
                    </li> 
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} >Ammi Return Policy </Link>
                    </li>                    
                    <li className='list-group-item py-0 m-0'>
                       <Link to={'/'} > Site Map </Link>
                    </li>   
                </ul>
            </div>
            <div className='col-6 col-md-3'>
                <h5 className='mb-1'>  Get In Touch </h5>
                <ul className='list-group px-0 m-0'>
                    <li className='list-group-item py-0 m-0'>
                       <a href='tel:+2348125391892' className='bi bi-telephone'>
                           &nbsp;+2348125391892
                       </a>
                    </li>   
                    <li className='list-group-item py-0 m-0'>
                       <a href='tel:+2347067905912' className='bi bi-telephone'>
                           &nbsp;+2347067905912
                       </a>
                    </li>      
                    <li className='list-group-item py-0 m-0'>
                        <a href="mailto:support@ammistore.com" className='bi bi-envelope-check mail'> 
                            &nbsp;support@ammistore.com
                         </a>
                    </li> 
                    <li className='list-group-item py-0 m-0 social-media mt-2'>
                         <span className='bi bi-facebook me-3'></span>
                         <span className='bi bi-whatsapp me-3'></span>
                         <span className='bi bi-telegram me-3'></span>
                         <span className='bi bi-twitter me-3'></span>
                         <span className='bi bi-instagram '></span>
                    </li>                                         
                </ul>
            </div>
        </div>
        <p className='py-2 mx-1 mx-md-3 text-center mb-0 border-top mt-2 mt-sm-4'>
            Copyright &copy; { `${ new Date().getFullYear() }` } ammi store all right reserved.
        </p>
    </footer>
  )
}

export default Footer