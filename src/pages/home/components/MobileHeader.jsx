import React from 'react'
import { categories } from '../../../global-components/navbar/components/categories'
import { Link } from 'react-router-dom'

const MobileHeader = () => {
  return (
    <header className='mobile-header d-sm-none pt-3 pb-2 px-1'>
        <h5 className='border-bottom pb-1'> My Markets </h5>
        <div className='categories-wrapper d-block'>  
             {  categories.map(   ( category , id ) => {
                    return (
                       <div key={ id } className='d-inline-block me-4'>
                           <Link to={`products?filter=${category.name}`}>
                               <img src={ category.image } alt={ category.name } />
                                <span className='d-block w-100 mt-1'> { category.name  } </span>
                           </Link>
                        </div>                       
                    )
               } ) }
        </div>
    </header>
  )
}

export default MobileHeader