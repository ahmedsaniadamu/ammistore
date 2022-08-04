import React from 'react'

const TestCard = () => {

  const [ text , setText ] = React.useState('Copy')
  const copyToClipboard = () => {
    const cartInfo = `
         "MasterCardPin : 5399838383838381  \n
         CCV  :  470  \n
         Exp Date : 10/31 \n
         Pin : 3310 \n
         OTP : 12345"
      `
    window.navigator.clipboard.writeText(cartInfo)
    setText('Copied')
  }

  return (
    <>
       <p> 
           <b>Note :</b> You can  
            use this test card information to complete payment.           
            <span className='btn ms-5 py-1' onClick = { copyToClipboard }>
                {  text } 
            </span>
        </p>
        <div className='cart-information'>
            <ul className='list-group'>
               <li className='list-group-item d-flex justify-content-between border-0'>
                   <span>MasterCart Pin : </span> 
                   <span> 5399838383838381  </span>
               </li>
               <li className='list-group-item d-flex justify-content-between border-0'>
                   <span> CCV : </span> 
                   <span>  470  </span>
               </li>
               <li className='list-group-item d-flex justify-content-between border-0'>
                   <span> Exp Date : </span> 
                   <span> 10/31 </span>
               </li>
               <li className='list-group-item d-flex justify-content-between border-0'>
                   <span> Pin :  </span> 
                   <span> 3310 </span>
               </li>
               <li className='list-group-item d-flex justify-content-between border-0'>
                   <span> OTP : </span> 
                   <span> 12345  </span>      
               </li>
            </ul>
        </div>
    </>
  )
}

export default TestCard