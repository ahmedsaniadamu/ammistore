import React from 'react'

const ProductFilter = ({ products , setProducts }) => {
  
  const filterTypes = [ 
                           'featured' ,
                           'price: low to high' , 
                           'price: high to low' , 
                           'customers ratings' , 
                           'new arrivals'
                        ]
  const [ filter , setFilter ] = React.useState(filterTypes[0])

  const handleFilter = filter => {
       switch ( filter ) {
              case filterTypes[0] :
                   // default sort                    
                   setProducts( [...products].sort( ( a , b ) => {
                                  return a.id - b.id
                              }))
                  setFilter( filterTypes[0] )
              break;      
              case filterTypes[1] :
                // sort by price accending               
                   setProducts([...products].sort( ( a , b ) => {
                       return  a.price - b.price
                     }))
                   setFilter( filterTypes[1] )
              break;   
              case filterTypes[2] :
                //   sort by price deccending            
                     setProducts([...products].sort( ( a , b ) => {
                         return  b.price - a.price
                      }))
                      setFilter( filterTypes[2] )
              break; 
              case filterTypes[3] :
                // sort by customer ratings                 
                  setProducts([...products].sort( ( a , b ) => {
                       return  b.rating - a.rating
                    }))
                  setFilter( filterTypes[3] )
              break; 
              case filterTypes[4] :
                //  sort by arrival date                
                  setProducts([...products].sort( ( a , b ) => {
                    return  ( new Date (a.arrivalDate).getTime() ) - ( new Date (b.arrivalDate).getTime() )
                   }))
                  setFilter( filterTypes[4] )
              break; 
              default :
                setProducts( products )
      } 
  }
    
  return (
    <>
       <button className='btn py-0 filter-btn' data-bs-toggle='dropdown'> 
          <i className='bi bi-funnel'></i> Filter By | { filter }             
        </button>
        <ul className='dropdown-menu'>
               {  filterTypes.map(   ( filterType , id ) => {
                    return (
                       <li key={ id }>
                           <span className='dropdown-item border-bottom py-2' onClick={ () => handleFilter( filterType ) }>
                                { filterType }
                           </span>
                        </li>                       
                    )
               } ) }
        </ul>
    </>
  )
}

export default ProductFilter