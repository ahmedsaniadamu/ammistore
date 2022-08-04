import React from 'react'
import { useNavigate } from 'react-router-dom'

const MobileSearchBar = () => {
  
    const [ search , setSearchInput ] = React.useState('')
    const handleSearchInput = event => setSearchInput(event.target.value)
    const navigate = useNavigate()
    const handleNavigation = () => navigate(`/search/${ search }`)

    return (
    <div className='input-group'>
        <input 
               type='search' className='form-control border-0 py-2'
                placeholder='search our global store...'
               value={ search } onChange = { handleSearchInput }
          />
        <span className='input-group-text bi bi-search bg-warning border-0' 
              data-bs-dismiss='offcanvas' onClick={ handleNavigation }
         ></span>
    </div>
  )
}

export default MobileSearchBar