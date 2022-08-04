import React from 'react'
import { Link } from 'react-router-dom'
import RecommendedProducts from './components/RecommendedProducts'
import Carousel from './components/Carousel'
import MobileHeader from './components/MobileHeader'
import Services from './components/Services'
import './home.scss'
import SpecialProducts from './components/SpecialProducts'
import HotDeals from './components/HotDeals'
import MobileAndAccessories from './components/MobileAndAccessories'
import Cameras from './components/Cameras'
import NewsLetters from './components/NewsLetters'
import { useNavigateTop } from '../../global-components/custom-hooks/useNavigateTop'

const Home = () => {

  useNavigateTop()

  return (
    <section className='home-page'>
        <MobileHeader />
        <Carousel />
        <Services />
        <section className='product-section-wrapper-1 mt-2 mt-md-3 px-1 py-2 px-md-4  mx-md-5 mb-2 '>
             <h5 className='pb-2 border-bottom pt-1'>  
                   Recommended For You  
                   <Link to={'/products?filter=computers'} > view more. </Link>
             </h5>
             <RecommendedProducts />
        </section>
        <section className='product-section-wrapper-2 px-1 py-2  mx-md-5 mb-0 mb-md-2 row justify-content-between'>
            <SpecialProducts className={'col-12 col-sm-4 m-0'} />
            <HotDeals className={ 'col-12 col-sm-7' } />
        </section>
        <section className='product-section-wrapper-3 mt-2 mt-md-3 px-1 py-2 px-md-4  mx-md-5 mb-3'>
             <h5 className='pb-2 border-bottom pt-1'>  
                    Mobile and Electronics Devices 
                   <Link to={'/products?filter=electronics'} > view more. </Link>
             </h5>
              <MobileAndAccessories />
        </section>
        <section className='product-section-wrapper-4 mt-2 mt-md-3 px-1 py-2 px-md-4  mx-md-5 mb-3'>
             <h5 className='pb-2 border-bottom pt-1'>  
                    High Quality Photographic Cameras
                   <Link to={'/products?filter=cameras'} > view more. </Link>
             </h5>
              <Cameras />
        </section>
        <section className='newsletter-wrapper mt-2 mt-md-3 px-1 pt-2 pb-3 px-md-4  mx-md-5'>
             <h5 className='pb-2 text-center pt-1 text-center mb-0'>  
                    Subscribe to Our Newsletters.
             </h5>  
             <p className='text-center'> 
                  Signup for our weekly newsletter to get the latest news , updates
                  and amazing offers delivered directly to your inbox.
             </p>
             <NewsLetters />
        </section>
    </section>
  )
}

export default Home