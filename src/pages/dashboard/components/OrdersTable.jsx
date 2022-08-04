import React from 'react'
import EmptyOrders from './EmptyOrders'
import CurrencyFormat from 'react-currency-format'
import ModalWindow from './ModalWindow'

const OrdersTable = ({ products }) => {

 const [ openModal , setOpenModal  ] = React.useState(false)
 const [ productId , setProductId ] = React.useState(0)
 const totalAmount = products.reduce( ( total , product ) =>  total + product.price , 0 )

 const handleModalWimdow = id => {
    setProductId( id )
    setOpenModal(true)
 }
 
  return (
    <>
       {
          products.length ?
            <div className='table-wrapper'>
                 <div className='table-responsive-sm'>
            <table className='table table-bordered'>
               <thead>
                    <tr>
                      <th> S/N </th>
                      <th> Product Image </th>
                      <th> Product Name</th>
                      <th> Order Date </th>
                      <th>  Price </th>                      
                      <th> Quantity </th>
                      <th>  Order Status </th>
                      <th> Action </th>                       
                    </tr>
                  </thead>
                  <tbody className='border-0'>                     
                          {
                            products.map( (product,id) => {
                                return(
                                  <tr key={ id }> 
                                        <td> { id + 1 }</td>
                                        <td className='d-flex justify-content-center'> 
                                           <img 
                                               src={ process.env.REACT_APP_SERVER_URL + product.image } 
                                               alt={ product.name } 
                                            />
                                         </td>
                                        <td className='product-name'> 
                                             <span className='d-block'>
                                                { product.name }
                                             </span>
                                         </td>
                                        <td className='order-date'>  
                                            { `${ new Date(product.orderDate).toLocaleDateString() }`}
                                        </td>
                                        <td>
                                          <CurrencyFormat 
                                             value={ product.price } displayType='text' 
                                             thousandSeparator={true} prefix='₦'
                                           />
                                        </td>                                       
                                        <td> { product.quantity } </td>
                                        <td className={ product.status==='pending' ? 'text-danger order-status' : 'order-status text-success'}> 
                                           { product.status }  
                                        </td>
                                        <td className='action'>
                                           <button 
                                               className='btn btn-success mt-3 ms-2'                                                
                                               onClick = { () => handleModalWimdow( id ) }
                                            >
                                                More info
                                           </button>
                                        </td>  
                                  </tr>
                                )
                            })
                          }                                                         
                    </tbody>
                 </table>
              </div>    
               <div className='summary d-flex justify-content-end'>
                  <ul className='list-group border-0'>
                      <li className='list-group-item border-0 d-flex justify-content-between'>
                           <span> Total Products :</span> <span> { products.length } </span>
                      </li>
                      <li className='list-group-item border-0 d-flex justify-content-between'>
                           <span> Total Amount Charged :</span>  
                           <CurrencyFormat 
                                 value={ totalAmount } displayType='text' 
                                 thousandSeparator={true} prefix='₦'
                           />
                      </li>
                  </ul>
               </div>
              {  
                openModal && <ModalWindow 
                                   product = { products[ productId ] }
                                   setOpenModal = { setOpenModal }
                                /> 
               }           
            </div>
            :
            <EmptyOrders />
       }
    </>
  )
}

export default OrdersTable