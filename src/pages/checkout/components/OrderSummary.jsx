import React from 'react'
import { useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'

const OrderSummary = () => {

  const { products } = useSelector( state => state.cart )
  const subTotal = products.reduce( ( total , item) => total + item.price , 0 )
  //5% of total product
 const tax = parseFloat( (( subTotal / 100 ) * 0.2 ).toFixed(2) );
 const total = subTotal + tax ;

  return (
    <ul className='list-group border-0 order-summary'>
        {
            products.map( ( product , id ) => {
                 return(
                    <li className='list-group-item border-0 d-flex justify-content-between' key={id}> 
                        <span className='name w-75'>
                             <i>  { id + 1 } </i> &nbsp; { product.name }                            
                         </span>
                         <CurrencyFormat 
                            value={ product.price } displayType='text' 
                            thousandSeparator={true} prefix='₦'
                         />
                    </li>
                 )
            } )
        }
        <li className='list-group-item border-0 d-flex justify-content-between border-top'> 
            <span className='name'>  Tax 0.2% </span>
            <CurrencyFormat 
                value={ subTotal } displayType='text' 
                thousandSeparator={true} prefix='₦'
            />
       </li>
        <li className='list-group-item border-0 d-flex justify-content-between total'> 
            <span className='name'>  Total </span>
            <CurrencyFormat 
                value={ total } displayType='text' 
                thousandSeparator={true} prefix='₦'
            />
       </li>
    </ul>
  )
}

export default OrderSummary