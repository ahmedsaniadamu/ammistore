import React , { useState } from 'react'

const NewsLetters = () => {

  const [ email , setEmail ] = useState('')
  const handleEmailInput = event => setEmail( event.target.value )

  return (
    <div className='input-group  mx-auto p-0 m-0 '>
         <input 
              type='email' className='form-control py-2' required
              placeholder=' your email address...' 
              value={ email } onChange = { handleEmailInput }
        />
        <button className='btn btn-success ps-md-3 pe-md-4 py-2 bi bi-send-check'> Subscribe </button>
    </div>
  )
}

export default NewsLetters