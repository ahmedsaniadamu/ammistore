import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

const OrderSummary = () => {
 
 const { products } = useSelector( state => state.cart )   
 const subTotal = products.reduce( ( total, cartItem ) => cartItem.price + total , 0 )
 //5% of total product
 const tax = parseFloat( (( subTotal / 100 ) * 0.2 ).toFixed(2) );
 const total = subTotal + tax ;

  return (
    <div className='order-summary d-flex justify-content-md-end mt-2 pb-3'>
        <div>
             <ul className='list-group border-0 p-0 m-0'>
                 <li className='list-group-item d-flex px-2 border-0 m-0 justify-content-between'>
                     <span> Sub Total </span> 
                     <CurrencyWrapper price={ subTotal } />
                 </li>
                 <li className='list-group-item d-flex px-2 border-0 m-0 justify-content-between'>
                     <span> Tax 0.2% </span> 
                     <CurrencyWrapper price={ tax } />
                 </li>
                 <li className='list-group-item d-flex px-2 border-0 m-0 justify-content-between'>
                     <span>Total </span>
                    <CurrencyWrapper price={ total } />
                 </li>
             </ul>
             <Link to='/checkout' className='checkout-btn px-5 mt-2 btn btn-success ms-5 ms-md-2'>
                 Proceed to checkout <i className='bi bi-arrow-right ms-1'></i>
             </Link>
        </div>
    </div>
  )
}

const CurrencyWrapper = ({ price }) => {
   return(
      <CurrencyFormat 
        value={ price } 
        displayType='text' 
        thousandSeparator={true} prefix='₦'
      />
   )
}
export default OrderSummary