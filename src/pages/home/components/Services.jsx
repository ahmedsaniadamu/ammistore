import React from 'react'

const Services = () => {
  return (
     <section className='services mt-2  px-1 py-2 px-md-4  mx-md-5 d-flex justify-content-between'>
         <div className='d-flex align-items-center'>
             <span className="bi bi-truck me-3"></span>
             <div> 
                  <h5 className='mb-0'> Free Delivery </h5>
                  <span className='text'> from ₦1,000 </span>
              </div>
         </div>
         <div className='d-flex align-items-center'>
             <span className="bi bi-headset me-3"></span>
             <div> 
                  <h5 className='mb-0'> Support 24/7 </h5>
                  <span className='text'> online 24 hours </span>
              </div>
         </div>
         <div className='d-flex align-items-center'>
             <span className="bi bi-bootstrap-reboot me-3"></span>
             <div> 
                  <h5 className='mb-0'> Free Return </h5>
                  <span className='text'> free return for all product </span>
              </div>
         </div>
         <div className='d-flex align-items-center'>
             <span className="bi bi-cash-coin me-3"></span>
             <div> 
                  <h5 className='mb-0'> Secured Payment </h5>
                  <span className='text'>secured payment method.  </span>
              </div>
         </div>
     </section>
  )
}
 
export default Services