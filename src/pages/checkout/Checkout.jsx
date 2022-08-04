import React from 'react'
import './checkout.scss'
import CheckoutForm from './components/CheckoutForm'
import { useNavigateTop } from '../../global-components/custom-hooks/useNavigateTop'
import OrderSummary from './components/OrderSummary'

const Checkout = () => {  
  useNavigateTop()       
  return (
    <section className='checkout-page px-1 px-md-2 pb-2'>
         <h5 className='text-center text-bold pt-3 pt-md-4 mb-1 mb-md-2'> Customer Order Form </h5>
         <p className='text-center'> 
             please fill all the required fields marked with <b className='text-danger'>* </b>
             and ensure that all the informations provided are correct.
          </p>                    
            <div className='row'>
                <div className='col-12 col-md-8'>
                    <h5>  Personal Information </h5>
                    <CheckoutForm  />
                </div>
                <div className='col-12 col-md-4'>
                    <h5 className='mt-3 mt-sm-0'> Order Summary </h5>
                    <OrderSummary />
                </div>
            </div>                 
    </section>
  )
}

export default Checkout