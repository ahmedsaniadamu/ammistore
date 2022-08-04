import React , { useState , useEffect } from 'react'
import './search.scss'
import { useNavigateTop } from '../../global-components/custom-hooks/useNavigateTop'
import { useParams } from 'react-router-dom'
import PlaceHolders  from './components/PlaceHolders'
import ProductCart from './components/ProductCart';
import ReactPaginate from 'react-paginate';

const Search = () => {

  useNavigateTop() ;
  const [ products , setProducts ] = useState([])
  const [ loading , setLoading ] = useState(false)
  const { query } = useParams() ;
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
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}api/search.php?query=${query}`)
            const data = await res.json() 
            setProducts( data )
            setLoading(false)
        }             
        fetcher()
  } , [ query ] )      

  return (
    <section className='search-page px-1 px-md-5 py-2 py-md-3'>
         <h5> Showing  Best Matches for   <i className='text-success'>"{  query }" &nbsp;</i> 
         { !loading ? products.length : 0 } result found.
        </h5>
         { ( loading ) ? 
                    <PlaceHolders  /> :
                    <div className='row m-0 p-0 justify-content-between justify-content-md-start'>
                        {
                            paginationProducts.length ?  paginationProducts.map( product => {                             
                             return ( 
                                    <ProductCart key={ product.id } {...product}  /> 
                                )
                             } ) 
                            :
                           <div className='no-result-found'>
                                   <img src='/assets/empty-inbox.PNG' alt='no wishlist' className='mx-auto d-block' />
                                    <h5 className='text-center'>  
                                        <span className='text-danger'> Oops! </span> &nbsp; No result Found.
                                    </h5>
                                    <p className='text-center'>
                                          There is no item that matches your search :  { query } 
                                    </p>
                           </div>
                        }
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

export default Search