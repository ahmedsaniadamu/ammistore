import React,{ useState , useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector , useDispatch } from 'react-redux';
import { validate } from './checkoutFormValidation';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import TestCard from './TestCard';
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../../redux-store/cartSlice/cartSlice'

const CheckoutForm = () => {
  
  const [ countries , setCountries ] = useState([])
  const [ states , setStates ] = useState({
    isReadOnly : true ,
    list : []
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { username , email , id } = useSelector( state => state.login )
  const { products } = useSelector( state => state.cart )
  //calculate cart items price
  const subTotal = products.reduce( ( total , item) => total + item.price , 0 )
  //add 0.2%  tax of total product
  const tax = parseFloat( (( subTotal / 100 ) * 0.2 ).toFixed(2) );
  //total cart item price + VAT
  const totalAmount = subTotal + tax ;

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email,
      name: username,
    },
    customizations: {
      title: 'Ammi Store Payment',
      description: 'Payment for items in your cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  
  const handleFlutterPayment = useFlutterwave(config);

  useEffect(
       () => {
          const getCountries = async () => {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/states');
            const countries = await response.json() ;
             setCountries( countries.data )               
          }
         getCountries() 
       } , []
  ) 

  const formik = useFormik({

    initialValues: {
      email, username , country : '',
      state : '', postalCode : '', city : '',  address : '',
    },

    validate,    
    onSubmit: values => {      
         // proceed customer to payment.                 
        handleFlutterPayment({
            callback: flutterwaveResponse => {
                // check if transaction is successful                
                if( flutterwaveResponse.status === 'successful' ){
                    //--------------------------------------//
                    //get the id of each cart item and store it in a new array
                    let cartItems = [] ;
                    for( let index = 0 ; index < products.length ; index++ ) {
                        cartItems.push( {
                             id : products[index].id,
                             price : products[index].price ,
                             quantity : products[index].quantity
                        } )
                    } 
                    //------------------------------------//
                    //send the API response and cart items data to the backend
                    const submitPaymentDetails = async () => {
                       const req = await fetch(`${ process.env.REACT_APP_SERVER_URL }api/orders.php`,
                        {
                           method : 'POST' ,
                           headers : { 'Content-type' : 'application/json' },
                           body : JSON.stringify({
                               customerId : id ,
                               paymentCompleted : 1,
                               cartItems,
                               country : values.country ,
                               state : values.state ,
                               city : values.city ,
                               postalCode : values.postalCode ,
                               address : values.address ,
                               transactionId : flutterwaveResponse.transaction_id ,
                               transactionRef : flutterwaveResponse.tx_ref ,
                           })
                        })
                       const res = await req.json() ;
                       if( res.status ){
                           //clear customer cart items.
                           dispatch( clearCart() )
                           //navigate user to dashboard page
                           navigate('/dashboard')
                           // close flutterwave modal window
                           closePaymentModal() 
                       }
                    }
                    submitPaymentDetails()
                }                             
            } 
          }); 
    },
  });
  
  const handleCountryChange = event => {  
      formik.handleChange( event )     
      if( event.target.value ){ 
             const selectedCountry = countries.filter( country => {
                return country.name === event.target.value 
             })
       setStates({ ...states, isReadOnly : false , list : selectedCountry[0].states })         
      }       
  }
  const { errors , touched } = formik

  return (
    <form onSubmit={formik.handleSubmit} className='checkout-form'> 
        <div className='row px-1 px-md-3'>            
           <div className='col-12 col-md-6'>  
                <label htmlFor='name'> Customer Name : </label>
                <input id='name' name='name' type='text'
                  className='form-control py-3 text-capitalize'
                  onChange={ formik.handleChange }
                  onBlur = { formik.handleBlur }
                  value={formik.values.username}
                  readOnly = { true }
                />                
            </div>

            <div className='col-12 col-md-6'>  
                <label htmlFor='email'>Email Address :</label>
                <input id='email' name='email' type='email'
                  className='form-control py-3'
                  onChange={ formik.handleChange }
                  onBlur = { formik.handleBlur }
                  value={formik.values.email}
                  readOnly = { true }
                />
            </div>

            <div className='col-12 col-md-6'>  
                <label htmlFor='country'>Country :</label>
                <select 
                     name='country' id='country'
                     value={ formik.values.country }
                     className='form-select py-3'
                     onChange={ handleCountryChange }
                     onBlur = { formik.handleBlur }                      
                 >  
                      <option value = ''> Select </option>
                     {                       
                       countries.length > 0 && countries.map( ( country , id ) => {
                          return (
                             <option key = { id } value = { country.name }>
                                 { country.name }
                             </option>
                          )
                       })
                     }
                </select>
                {  ( touched.country && errors.country ) &&
                  <span className='text-danger'>
                        {  errors.country }
                  </span>
                }
            </div>

            <div className='col-12 col-md-6'>  
                <label htmlFor='state'>State :</label>
                <select 
                     name='state' id='state'
                     value={ formik.values.state }
                     className='form-select py-3'
                     onChange={ formik.handleChange }
                     onBlur = { formik.handleBlur } 
                     disabled = { states.isReadOnly }                     
                 >
                    <option value=''> Select </option>
                    {                       
                       states.list.length > 0 && states.list.map( ( state , id ) => {
                          return (
                             <option key = { id } value = { state.name }>
                                 { state.name }
                             </option>
                          )
                       })
                     }
                </select>
                {  ( touched.state && errors.state ) &&
                  <span className='text-danger'>
                        {  errors.state }
                  </span>
                }
            </div>
            <div className='col-12 col-md-6'>  
                <label htmlFor='city'>City :</label>
                <input id='city' name='city' type='text'
                  className='form-control py-3'
                  onChange={ formik.handleChange }
                  onBlur = { formik.handleBlur }
                  value={ formik.values.city }                  
                />
                 {  ( touched.city && errors.city ) &&
                  <span className='text-danger'>
                        {  errors.city }
                  </span>
                }
            </div>
            <div className='col-12 col-md-6'>  
                <label htmlFor='postalCode'>Postal Code :</label>
                <input id='postalCode' name='postalCode' type='number'
                  className='form-control py-3'
                  onChange={ formik.handleChange }
                  onBlur = { formik.handleBlur }
                  value={formik.values.postalCode}   
                  min = { 10 }               
                />
                 {  ( touched.postalCode && errors.postalCode ) &&
                  <span className='text-danger'>
                        {  errors.postalCode }
                  </span>
                }
            </div>
            <div className='col-12'>  
                <label htmlFor='address'> Address : </label>
                <textarea 
                      name='address' id='address' 
                      placeholder='your contact address..' 
                      className='form-control py-3'
                      onChange={ formik.handleChange }
                      onBlur = { formik.handleBlur }
                      value={formik.values.address} 
                />
                 {  ( touched.address && errors.address ) &&
                  <span className='text-danger'>
                        {  errors.address }
                  </span>
                }
            </div>
        </div>     
       <TestCard />            
       <div className='d-flex justify-content-end pe-1 pe-md-3 py-2'>
          <button type='submit' className='btn btn-success px-5 py-2'> 
              Proceed to payment <span className='bi bi-arrow-right ps-1'></span> 
          </button>
       </div>
    </form>
  );
};

export default CheckoutForm