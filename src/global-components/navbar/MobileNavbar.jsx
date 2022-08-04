import React from 'react'
import { Link , useLocation } from 'react-router-dom'
import MobileSearchBar from './components/MobileSearchBar'
import { categories } from './components/categories'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux-store/loginSlice/LoginSlice'

const MobileNavbar = ({className}) => {

   const { isAuth  } = useSelector( state => state.login )
   const { products } = useSelector( state => state.cart )
   const dispatch = useDispatch()
   const location = useLocation()
   const handleLogoutUser = () => dispatch( logoutUser() )

  return (
    <div className={`mb-2 mobile-navbar ${className}`}>
         <div className='d-flex justify-content-between align-items-center'> 
            <Link to={'/'} >  
               <img src='/assets/IMG_20220522_090742.png' alt='ammi logo'  className='logo'/>                
              </Link>
              <div className='navigation-links h-100 d-flex align-items-center'>                   
                {
                  isAuth && 
                  <>
                        <span className='dd-btn d-flex align-items-center' data-bs-toggle='dropdown'>  
                           <i className='bi bi-person-circle me-1'>  </i>                                                    
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
                  }
                  <Link to='/cart' className='bi bi-cart4 text-white'>
                       <sup> { products.length } </sup>
                  </Link>
                  <Link to='/wishlist' className='bi bi-heart text-white'></Link>
                  <span 
                      className='bi bi-justify pe-1' data-bs-toggle='offcanvas'
                       data-bs-target='#sidebar'>                        
                  </span>
              </div>
         </div>
         <div className='offcanvas offcanvas-start w-75' id='sidebar'>
          <div className='offcanvas-header align-items-center ps-0 py-2 pe-1'>             
             <span className='bi bi-arrow-left-short  text-reset pe-1 ps-0 ms-0' data-bs-dismiss='offcanvas'></span>
             <MobileSearchBar />
          </div>
          <div className='offcanvas-body p-0 mt-3 ps-1'>               
              <h5 className='border-bottom pb-1 '> Explore Our Categories </h5>
              <ul className='list-group'>
                {  categories.map(   ( category , id ) => {
                      return (
                        <li key={ id } data-bs-dismiss='offcanvas'>
                            <Link to={`products?filter=${category.name}`} className='list-group-item border-0 ps-1 py-1'>                                
                                  { category.name  }  
                            </Link>
                          </li>                       
                      )
                } ) }
              </ul>      
              <ul className='list-group mt-3'>
                  <li data-bs-dismiss='offcanvas'>  
                       <Link to= '/' className='list-group-item border-0 ps-1 py-2 border-top'> 
                          <span className='bi bi-house-door'></span>  Home
                       </Link> 
                  </li>
                  <li data-bs-dismiss='offcanvas'>  
                       <Link to= '/' className='list-group-item border-0 ps-1 py-2 border-top'> 
                          <span className='bi bi-globe'></span>  About 
                       </Link> 
                  </li>
                  <li data-bs-dismiss='offcanvas'>  
                       <Link to= '/cart' className='list-group-item border-0 ps-1 py-2 border-top'> 
                          <span className='bi bi-cart4'></span>  My Cart
                       </Link> 
                  </li>
                  <li data-bs-dismiss='offcanvas'>  
                       <Link to= '/wishlist' className='list-group-item border-0 ps-1 py-2 border-top'> 
                          <span className='bi bi-heart'></span>  Wishlist
                       </Link> 
                  </li>
                  {  !isAuth &&
                    <li data-bs-dismiss='offcanvas'>  
                       <Link to= '/signup?action=register' 
                            className='list-group-item border-0 ps-1 py-2 border-top'
                            onClick = { 
                              () =>  {
                                   window.localStorage.setItem('redirect-path', location.pathname )                                   
                              } 
                           }
                        > 
                          <span className='bi bi-person-circle'></span>  login / signup
                       </Link> 
                    </li>  
                  }
                  <li data-bs-dismiss='offcanvas'>  
                       <Link to= '/' className='list-group-item border-0 ps-1 py-2 border-top'> 
                          <span className='bi bi-info-circle'></span>  Help
                       </Link> 
                  </li>
                  <li data-bs-dismiss='offcanvas'>  
                       <Link to= '/blog' className='list-group-item border-0 ps-1 py-2 border-top'> 
                          <span className='bi bi-printer'></span>  Blog
                       </Link> 
                  </li>
                  <li data-bs-dismiss='offcanvas'>  
                       <Link to= '/' className='list-group-item border-0 ps-1 py-2 border-top'> 
                          <span className='bi bi-question-circle'></span>  FAQs
                       </Link> 
                  </li>
                  <li data-bs-dismiss='offcanvas'>  
                       <Link to= '/' className='list-group-item border-0 ps-1 py-2 border-top border-bottom'> 
                          <span className='bi bi-telephone-plus'></span>  Contact
                       </Link> 
                  </li>
              </ul>
          </div>
        </div>
    </div>
  )
}

export default MobileNavbar