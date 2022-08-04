import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { addItemToCart } from '../../../../redux-store/cartSlice/cartSlice'

const AddToCartButton = props => {
   
  const dispatch = useDispatch()
  const { products } = useSelector( state => state.cart )
  const isItemAddedToCart = products.find( ({ id }) => id === props.id ) === undefined ? false : true
  const handleAddTocart = () => dispatch( addItemToCart( props ) )
  
  return (
    <>
        <button
             className='px-4 px-md-5 py-2 btn btn-success ms-3 bi bi-cart'
             style={ { opacity : isItemAddedToCart ? 0.6 : 1 } }
             onClick={ handleAddTocart }
         >
             &nbsp; add To Cart 
        </button>
    </>
  )
}

export default AddToCartButton