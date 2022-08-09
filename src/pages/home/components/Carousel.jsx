import React from 'react'

const CarouselImages = [ 
    '/assets/The-Ultimate-Deal.webp',
    '/assets/Lazada-9BDAY_TH-Key-Visual-1-600x338.jpg',     
    '/assets/banner-and-eCommerce.jpg',
    '/assets/okladka-przepis-na-kaloryczny-black-friday-w-ecommerce-800x420.png',              
    '/assets/IMG_20220522_090526.png',               
 ]
const HighlightImages = [
  '/assets/Konga-flash-sales-scaled-e1593377258604.jpg',
  '/assets/black-friday-4606219.jpg',
  '/assets/BlackFriday.jpg',
  '/assets/big-summer.jpg'
]

const Carousel = () => {
 
  return (
    <section className='px-1 px-md-2 px-xl-5 mx-md-2 row m-0 mx-auto mt-1 mt-sm-3'>
        <div className='col-12 col-md-7 p-0 carousel-images-wrapper'>
           <div id='demo' className='carousel carousel-fade slide' data-bs-ride='carousel'>          
                <div className='carousel-inner'>
                     {  CarouselImages.map( ( image,id ) => {
                          if( id === 0 ) {
                              return (
                                <div key={ id } className='carousel-item w-100 h-100 active'>
                                    <img 
                                         src={ image } alt={`carousel item ${ id + 1 }`} 
                                         className='d-block w-100 h-100' 
                                    />
                                </div>  
                              )
                           }
                           return (
                            <div key={ id } className='carousel-item w-100 h-100'>
                                <img 
                                     src={ image } alt={`carousel item ${ id + 1 }`} 
                                     className='d-block w-100 h-100' 
                                />
                            </div>  
                          )
                     } ) }                                   
                </div>
                {/* carousel controls */}
                <button className='carousel-control-prev' type='button' data-bs-target='#demo' data-bs-slide='prev'>
                   <span className='carousel-control-prev-icon'></span>
                </button>
               <button className='carousel-control-next' type='button' data-bs-target='#demo' data-bs-slide='next'>
                   <span className='carousel-control-next-icon'></span>
               </button>
           </div>
        </div>
        <div className='col-12 col-md-5 p-0 hightlight-images-wrapper row  ms-2'>
             { HighlightImages.map( (image,id) => {
                  return(
                      <img 
                          key={ id } src={ image } className='col-6'
                          alt={`highlight item ${ id+1 }`}
                       />
                  )
             }) }
        </div>
    </section>
  )
}

export default Carousel