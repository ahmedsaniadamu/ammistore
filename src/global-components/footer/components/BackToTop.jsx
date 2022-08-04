import React from 'react'

const BackToTop = () => {

  const scrollToTop = () => window.scroll({ top : 0 , behavior : 'smooth' })

  return (
    <div className='back-to-top py-3 py-md-4 text-white text-center' onClick={ scrollToTop }>
         Back To Top <span className='ms-1 bi bi-caret-up'></span>
    </div>
  )
}

export default BackToTop