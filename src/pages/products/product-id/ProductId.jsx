import React, { useEffect, useState } from 'react'
import './product.scss'
import { useParams , Link } from 'react-router-dom'
import Placeholder from './components/Placeholder'
import { useNavigateTop } from '../../../global-components/custom-hooks/useNavigateTop'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import RelatedProduct from './components/RelatedProduct'
import { Rating } from 'react-simple-star-rating'
import CurrencyFormat from 'react-currency-format'
import AddToCartButton from './components/AddToCartButton'

const Product = () => {
  
  useNavigateTop()
  const { id } = useParams()
  const [ products , setProducts ] = useState({
    id : 1 ,
    name : '',
    image : '',
    description : '' ,
    category : '',
    price : 0,
    rating : 0 ,
    oldPrice : 0 ,
    specification : [] ,    
  })
  const [ loading , setLoading ] = useState( false )
  const [ quantity , setQuantity ] = useState(1)
  const selectQuantity = event => setQuantity( parseInt( event.target.value ) )

  useEffect(
    () => {
       setLoading(true)
      const fetcher = async () => {
         const res = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/productId.php?id=${ id }`)
         const productDetails = await res.json()          
          setProducts( { 
                 ...products ,
                   id : productDetails.id , 
                   name : productDetails.name , 
                   image : productDetails.image , 
                   description : productDetails.description, 
                   category : productDetails.category ,                   
                   price : productDetails.price,
                   oldPrice : productDetails.oldPrice,
                   rating : productDetails.rating ,
                   specification : [ ...Object.entries(productDetails.specification ) ]
                   } )
          setLoading( false )
       }  
       fetcher()   
    } , [ id ]
  )
  
  return (
    <section className='product-id-page px-1 px-md-3'> 
       <div className='bread-crumbs py-1'> 
          <Link to={'/'} className='bi bi-house-door me-1'> Home</Link><small>/</small>
          { 
             !loading &&  <>
                 <Link to={ '/products?filter=' + products.category } className='mx-1'>
                    { products.category }
                </Link><small>/</small>
             </> 
          }
           { 
             !loading &&  <>
                 <Link to={ '/products/' + products.id } className='mx-1'>
                    {  products.name }
                </Link> 
             </> 
          }

       </div>     
       <div className='product-description-wrapper px-1 px-2'>
           {
             !loading ? 
               <div className='row'>
                   <div className='col-12 col-md-5 image-wrapper'>
                      <img 
                            src= { process.env.REACT_APP_SERVER_URL + products.image }
                             alt={ products.name } className='d-block mx-auto my-2 my-md-4'
                        />
                   </div>
                   <div className='col-12 col-md-7 description-wrapper'>
                        <h5 className='mt-md-3 mb-md-3'> { products.name } </h5>
                        <span className='d-block mb-1'> Item #:  AMIPDC00{ products.id }</span>
                        <p className='d-flex align-items-center mb-1'>
                           Rating : &nbsp;
                           <Rating 
                              initialValue = { parseFloat(products.rating).toFixed(1) }
                              readOnly = { true }
                              allowHover = { false }
                              className = { 'stars' }                               
                              size = {  window.matchMedia('max-width(500px)') ? 20 : 27 }
                           />
                           <b className='ms-3'> { parseFloat(products.rating).toFixed(2)  } </b>
                        </p>
                        <p className='mb-1'>  
                           <span className='text-secondary'> Availability : </span> 
                            { products.itemInStock } In Stock <i className='bi bi-check-all'></i>
                         </p>
                         <div className='price-wrapper'>
                            Item Price : &nbsp;
                              <CurrencyFormat 
                                 value={ products.oldPrice } displayType='text' 
                                 thousandSeparator={true} prefix='₦'
                              />
                              <CurrencyFormat 
                                 value={ products.price * quantity } displayType='text' 
                                 thousandSeparator={true} prefix='₦'
                              />
                        </div>
                        <div className='mt-3 mt-md-4 d-flex'>
                            <select name='quantity' value={ quantity } onChange={ selectQuantity } className='form-select'>
                                 <option value='1' selected> Quantity : 1 </option>
                                 <option value='2' selected> Quantity : 2 </option>
                                 <option value='3' selected> Quantity : 3 </option>
                                 <option value='4' selected> Quantity : 4 </option>
                                 <option value='5' selected> Quantity : 5 </option>
                            </select>
                            <AddToCartButton                                
                               name = { products.name }
                               id = { products.id }
                               image = { products.image }
                               quantity = { quantity }
                               price = { products.price * quantity }                               
                               standartPrice = { products.price }
                               rating = { products.rating }
                            />
                        </div>
                        <p className='mt-3 mt-md-4'> 
                           NOTE : please note that delivery time is based on customers location
                           but we ensure items delivey as soon as possible.
                        </p>
                        <div className='social-media mt-md-2'>
                            SHARE ON : &nbsp; &nbsp;
                            <a href={`${ process.env.REACT_APP_SERVER_URL }/products/${ products.id }`} className='bi bi-facebook me-3' target={'_blank'}></a>
                            <a href="#" className='bi bi-whatsapp me-3' target={'_blank'}></a>
                            <a href="#" className='bi bi-twitter me-3' target={'_blank'}></a>
                            <a href="#" className='bi bi-instagram me-3' target={'_blank'}></a>                            
                        </div>
                   </div>
               </div>
             :
            <Placeholder />            
           }
       </div>   
       <div className='mt-2  mt-md-4 px-1 px-md-2 product-info'>
            <h5 className='py-2 border-bottom'>Product  Description </h5>
            {   !loading ?
                  <p className='mb-0'>   { products.description } </p>
                 :
                <div className='px-1 px-md-3'>
                  <Skeleton baseColor='#e9e8e8' className='name-3 mt-2 mt-md-3' />
                  <Skeleton baseColor='#e9e8e8' className='name-3 mt-2 mt-md-3' />
                  <Skeleton baseColor='#e9e8e8' className='name-3 mt-2 mt-md-3' />                
               </div>
            }
       </div>
       <div className='mt-2  mt-md-4 px-1 px-md-2 product-info pb-2'>
       <h5 className='py-2 mb-0'> Product  Specification </h5>
            {   !loading ?
                  <ul className='list-group border-0'>
                        {
                           products.specification.length && products.specification.map(
                             ( product , id ) => {
                                  return(
                                      <li className='list-group-item border-0' key={ id }>
                                          { product[0] } : <span className='ms-3'> { product[1] } </span>
                                      </li>
                                  )
                              }
                           )
                        }
                  </ul>
                 :
                <div className='px-1 px-md-3 mt-2'>
                     <Skeleton baseColor='#e9e8e8' className='name-3 mt-2 mt-md-3' />
                     <Skeleton baseColor='#e9e8e8' className='name-3 mt-2 mt-md-3' />
                     <Skeleton baseColor='#e9e8e8' className='name-3 mt-2 mt-md-3' />                
                </div>
            }
       </div>  
       {  !loading && <RelatedProduct category={ products.category } id = { products.id } /> }
    </section>
  )
}

export default Product