import React , { useState , useEffect } from 'react'
import { useNavigateTop } from '../../global-components/custom-hooks/useNavigateTop'
import { useSearchParams } from 'react-router-dom';
import ProductFilter from './components/ProductFilter';
import './products.scss'
import PlaceHolders from './components/PlaceHolders';
import ProductCart from './components/ProductCart';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

const Products = () => {

  useNavigateTop() ;  
  const [ searchParams ] = useSearchParams()
  const filterQuery = searchParams.get('filter')
  const [ products , setProducts ] = useState([])
  const [ loading , setLoading ] = useState(false)
  const  wishlist  =  useSelector( state => state.wishlist )
  //pagination setup  
  const [ pageNumber , setPageNumber ] = useState(0)
  //show 12 products in mobile devices , 21 products in tablet and desktop
  const NumberOfproductPerpage = window.matchMedia('(max-width:500px)').matches ? 12 : 21;
  const productsPerPage = Math.ceil( products.length / NumberOfproductPerpage )
  const pagesVisited = ( NumberOfproductPerpage * pageNumber )
  const paginationProducts = products.slice( pagesVisited , pagesVisited + NumberOfproductPerpage )

  //a function that handles pagination actions like next prev and active link.
  const handlePageChange = ({ selected }) => setPageNumber( selected )

  useEffect( () => {    
         setLoading(true)
        const fetcher = async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}api/index.php?filter=${filterQuery}`)
            const data = await res.json() 
            setProducts( data )
            setLoading(false)
         } 
         fetcher()
    } , [ filterQuery ]
  )   

  return (
    <section className='products mx-md-5 pb-2 mt-3 px-1 px-md-2'>
         <h5 className='py-2 py-md-3 border-bottom d-flex justify-content-between'> 
            <span> Showing Result For &nbsp;"{ filterQuery }"</span>  
            { ( !loading && products.length ) && <ProductFilter products = { products  } setProducts = { setProducts } /> }
         </h5>
          { ( loading ) ? 
                    <PlaceHolders  /> :
                    <div className='row m-0 p-0 justify-content-between'>
                        { paginationProducts.map( product => {
                            //search and apply a color indicator if an item is already added to wishlist
                            let searchWishlist =  wishlist.products.find( ({ id }) => id === product.id )
                            let className = ( searchWishlist === undefined ) ? 'not-added-wishlist' : 'added-wishlist'                 
                             return ( 
                                    <ProductCart key={ product.id } {...product} className = { className } /> 
                                )
                        } ) }
                    </div>
          }  
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
    </section>
  )
}

export default Products