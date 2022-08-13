import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './cart.scss'
import CartItems from './components/CartItems'
import OrderSummary from './components/OrderSummary'
import { useNavigateTop } from '../../global-components/custom-hooks/useNavigateTop'

const Cart = () => {
  useNavigateTop()
  const { products } = useSelector( state => state.cart )
  
  return (
    <section className='cart-page'>
         <div className='bread-crumbs py-1 ps-1'> 
            <Link to={'/'} className='bi bi-house-door me-1'> Home</Link><small>/ </small>
            <Link to={'/'} className='me-1'> Cart</Link>
          </div>
          <div className='wrapper mx-1 mx-md-5 mt-md-2'>
              <h5 className='pb-1'> My Cart  ({ products.length }) </h5>
              <CartItems />
              { products.length ? <OrderSummary /> : null }
          </div>
    </section>
  )
}

export default Cart