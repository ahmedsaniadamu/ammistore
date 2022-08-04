import React , { useState } from 'react'
import './wishlist.scss'
import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import WishlistCart from './components/WishlistCart'
import NoWishlist from './components/NoWishlist'
import { useNavigateTop } from '../../global-components/custom-hooks/useNavigateTop'
import MoreItems from './components/MoreItems'

const WishList = () => {
   
  useNavigateTop()
  const { wishlist } = useSelector( state => state )
  const [ pageNumber , setPageNumber ] = useState(0)
  const NumberOfproductPerpage = 12 ;
  const productsPerPage = Math.ceil( wishlist.products.length / NumberOfproductPerpage )
  const pagesVisited = ( NumberOfproductPerpage * pageNumber )
  const paginationProducts = wishlist.products.slice( pagesVisited , pagesVisited + NumberOfproductPerpage )

  //a function that handles pagination actions: next prev and active link.
  const handlePageChange = ({ selected }) => setPageNumber( selected )

  return (
    <section className='wishlist'>
         <div className='wishlist-container mt-sm-3 mx-0 px-1 px-md-2 mx-md-5'>
             <h5 className='py-2 border-bottom'>  
                 My Wish List &nbsp; <span> ({ wishlist.products.length })  </span> 
            </h5>
           {  
             wishlist.products.length ?
             <>
                  <div className='row mx-auto p-0 m-0 mb-1'>
                          {
                              paginationProducts.map( wishlist => {
                                return (
                                    <WishlistCart key = { wishlist.id } { ...wishlist } />
                                )
                            } )
                          }
                    </div>
                    <ReactPaginate 
                            previousLabel='<<'
                            nextLabel = '>>'
                            pageCount={ productsPerPage }
                            onPageChange = { handlePageChange }
                            containerClassName='pagination d-flex align-items-center justify-content-center mt-1 border-top py-2'
                            previousLinkClassName='prev'
                            nextLinkClassName='next ms-3'
                            activeLinkClassName='active'
                            breakLabel='...'
                            pageLinkClassName='page-links ms-3'
                        /> 
                    </>
                    :    <NoWishlist />  }
              </div> 
              <div className='add-more-items mt-3 mx-0 px-1 px-md-2 mx-md-5 pb-3 mb-3'>
                   <h5 className='py-2 border-bottom'> Browse & Add More Items To Your Wishlist </h5>
                   <MoreItems />
              </div>                    
    </section>
  )
}

export default WishList