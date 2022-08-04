import React from 'react'
import { Link } from 'react-router-dom'
import DesktopSearchBar from './components/DesktopSearchBar'
import { useSelector , useDispatch } from 'react-redux'
import { logoutUser } from '../../redux-store/loginSlice/LoginSlice'

const DesktopNavbar = ({ className }) => {
  
  const dispatch = useDispatch()
  const { isAuth , username } = useSelector( state => state.login )
  const { products } = useSelector( state => state.cart )
  
  const handleLogoutUser = () => dispatch( logoutUser() )

  return (
    <div className={`mb-2 desktop-navbar h-100 ${className}`} >
        <div className='w-100 h-100 flex-nowrap justify-content-between  d-flex align-items-center'>  
          <Link to={'/'} > 
              <img src='/assets/IMG_20220522_090742.png' alt='logo' className='logo'/>
          </Link>
          <DesktopSearchBar />
          <div className='navigation-links-wrapper me-3 h-100 d-flex align-items-center'>
              <Link to='/cart' className='text-white'> Help </Link>
              <Link to='/cart' className='text-white'> FAQs </Link>
              {     
                    isAuth ?  
                     <>
                        <span className='dd-btn d-flex align-items-center' data-bs-toggle='dropdown'>  
                             <i className='bi bi-person-circle me-1'></i>
                             { username.slice( 0 , 6 )  }..
                             <i className='bi bi-chevron-down ms-1'></i>
                         </span>
                         <ul className='dropdown-menu login-dd-menu'>                            
                            <li>
                               <Link to={'/dashboard'} className='dropdown-item pe-3'>
                                   Dashboard
                               </Link>
                             </li>          
                             <li>
                                 <Link 
                                      to={'/'}  onClick={ handleLogoutUser }
                                      className='dropdown-item pe-3 border-top text-danger mt-1'                                      
                                    >
                                    <i className=' bi bi-box-arrow-in-left'> </i>Logout
                                 </Link>
                            </li>                          
                         </ul>
                     </> 
                    :
                    <Link to='/signup?action=register' className='text-white'>
                       Login / Signup 
                    </Link>
              }
              <Link to='/blog' className='text-white'> Blog </Link>
              <Link to='/wishlist' className='text-white bi bi-heart'>  </Link>
              <Link to='/cart' className='bi bi-cart4 text-white'> 
                <sup>{ products.length  }</sup> 
              </Link>
          </div>
        </div>
    </div>
  )
}

export default DesktopNavbar