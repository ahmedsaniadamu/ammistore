import React from 'react'
import CurrencyFormat from 'react-currency-format'

const ModalWindow = ({ product , setOpenModal }) => {
  return (
    <div className='modal-window'>            
         <div className='d-flex justify-content-center align-items-center w-100 h-100'> 
              <div className='modal-window-dialog bg-white mt-md-5'> 
                    <div className='modal-header'>
                            <h5 className='modal-title'> Product Details </h5>
                            <button className='btn-close' onClick = { () => setOpenModal(false) }>                                               
                            </button>
                    </div> 
                    <div className='modal-body px-0'>
                           <div className='d-flex'>
                                <img 
                                     src={ process.env.REACT_APP_SERVER_URL  + product.image } 
                                     alt={ product.name } 
                                 /> 
                                 <ul className='list-group border-0'>
                                     <li className='list-group-item'>
                                         { product.name }
                                     </li>
                                     <li className='list-group-item d-flex justify-content-between'>
                                           <span> Product Id : </span>
                                           <span>
                                                #AMIPDC00{ product.id }
                                           </span>
                                     </li> 
                                     <li className='list-group-item d-flex justify-content-between'>
                                           <span> Price : </span>
                                           <CurrencyFormat 
                                             value={ product.price } displayType='text' 
                                             thousandSeparator={true} prefix='₦'
                                           />
                                     </li>
                                     <li className='list-group-item d-flex justify-content-between'>
                                           <span> Order Id :</span>
                                           <span>
                                               #{ product.order_id }
                                           </span>
                                     </li>
                                     <li className='list-group-item d-flex justify-content-between'>
                                           <span> Order date </span>
                                           <span>
                                              { `${ new Date(product.orderDate).toLocaleDateString() }`}
                                           </span>
                                     </li>
                                     <li className='list-group-item d-flex justify-content-between'>
                                           <span> Quantity  :</span>
                                           <span>
                                                { product.quantity }
                                           </span>
                                     </li>
                                     <li className='list-group-item d-flex justify-content-between'>
                                           <span> Order Status  :</span>
                                           <span className={ product.status==='pending' ? 'text-danger order-status' : 'order-status text-success'}>
                                                { product.status }
                                           </span>
                                     </li>
                                     <li className='list-group-item d-flex justify-content-between'>
                                           <span> Transaction Id  :</span>
                                           <span>
                                                #{ product.transactionId }
                                           </span>
                                     </li>
                                     <li className='list-group-item d-flex justify-content-between'>
                                           <span> Transaction Reference  :</span>
                                           <span>
                                                #{ product.transactionRef }
                                           </span>
                                     </li>
                                  </ul>                              
                           </div>
                    </div>  
              </div>   
         </div>             
    </div>
  )
}

export default ModalWindow