import React , { Fragment } from 'react';
import { BrowserRouter , Routes , Route , Outlet } from 'react-router-dom'
import Navbar from './global-components/navbar/NavbarWrapper'; 
import Home from './pages/home/Home';
import { ToastContainer  } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './global-styles/index.scss'
import Footer from './global-components/footer/Footer';
import WishList from './pages/wishlist/WishList';
import _404 from './pages/404/404';
import NoNetworkConnection from './global-components/no-newtwork-connection/NoNetworkConnection';
import Products from './pages/products/Products';
import LoginSignup from './pages/login-signup/Login-Signup';
import ProductId from './pages/products/product-id/ProductId';
import Search from './pages/search/Search';
import Cart from './pages/cart/Cart';
import ProtectedRoute from './global-components/ProtectedRoute';
import Checkout from './pages/checkout/Checkout'
import Dashboard from './pages/dashboard/Dashboard';
import Blog from './pages/blog/Blog';
import BlogId from './pages/blog/blogId/BlogId';

 const App = () => {     
    //--------------------------------------------------------------------------//
       //check wether a  user is not connected to the internet.
       if(!window.navigator.onLine) return ( <NoNetworkConnection /> ) 
    //--------------------------------------------------------------------------//         
     return (
         <Fragment>             
             <BrowserRouter>
               <Navbar />  
               <Routes>
                    <Route path='/' element = { <Home /> } />
                    <Route path='/wishlist' element = { <WishList /> } />
                    <Route path='/products' element = { <Outlet /> }>
                        <Route index element = { <Products /> } />
                        <Route path=':id' element = { <ProductId /> } />
                    </Route>
                    <Route path='/signup' element = { <LoginSignup /> } />
                    <Route path='/blog' element = { <Outlet /> } >
                         <Route index element = { <Blog /> } />
                         <Route path=':postTitle' element={ <BlogId /> } />
                    </Route>
                    <Route path='/search/:query' element = { <Search /> } />
                    <Route path='/cart' element = { <Cart /> } />
                    <Route path='/checkout' element = { 
                         <ProtectedRoute fallback = {'/signup?action=register'}>
                              <Checkout/>
                         </ProtectedRoute>
                     } />
                    <Route path='/dashboard' element = { 
                         <ProtectedRoute fallback = {'/'}>
                              <Dashboard />
                         </ProtectedRoute>
                     } />
                    <Route path='/*' element = { <_404 /> } />
                </Routes>
               <Footer /> 
            </BrowserRouter>                    
            <ToastContainer />   
         </Fragment>
     )
 }

export default App;
