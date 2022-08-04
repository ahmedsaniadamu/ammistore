import React from 'react'
import { categories } from './categories'
import { Link , useNavigate } from 'react-router-dom'

const DesktopSearchBar = () => {

  const [ search , setSearchInput ] = React.useState('')
  const handleSearchInput = event => setSearchInput(event.target.value)
  const navigate = useNavigate() ;
   
  return (
    <div className='input-group desktop-search-bar p-0 m-0 '>
        <button type='button' className='btn btn-light px-3' data-bs-toggle='dropdown'>
            <span className='bi bi-grid'></span> All Categories              
        </button>
         <ul className='dropdown-menu'>
               {  categories.map(   ( category , id ) => {
                    return (
                       <li key={ id }>
                           <Link to={`products?filter=${category.name}`} className='dropdown-item pe-3'>
                               <img src={ category.image } alt={ category.name } />
                                &nbsp;<span> { category.name  } </span>
                           </Link>
                        </li>                       
                    )
               } ) }
          </ul>
        <input 
              type='search' className='form-control'
              placeholder='&#128269; search our global store...' 
              value={ search } onChange = { handleSearchInput }
        />
        <button className='btn btn-warning px-3' onClick={ () => navigate(`/search/${ search }`) }> 
            Search  
        </button>
     </div>
  )
}
export default DesktopSearchBar