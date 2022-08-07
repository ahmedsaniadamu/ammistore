import React from 'react'

const EditReply = ({ replyId }) => {
  return (
    <>
        <span className='text-info'  data-bs-toggle='offcanvas' data-bs-target='#edit-reply'>
             Edit 
       </span>
       <div className='offcanvas offcanvas-bottom edit-reply-container mx-md-auto' id='edit-reply'>
           <div className='offcanvas-header border-bottom'>
               <h5 className='offcanvas-title bi bi-pencil-square'> Edit Reply </h5>
               <button className='p-1 bi bi-x-lg' data-bs-dismiss='offcanvas'></button>
           </div>
           <div className='offcanvas-body'>
              Lorem ipsum dolor sit amet consectetur a
              dipisicing elit. Nostrum esse aperiam natus
               officiis. Voluptas suscipit, et iure, corporis
                aut iusto obcaecati dolor blanditiis iste volupta
                SStes hic sed, reiciendis eius delectus!
                timely delivery and more is equally important. Yes, 
                the end route to shopping online is through your convenient space only but there are a few things that you must follow to get a hassle-free shopping experience. 
                Many people have doubts about the product warranty
           </div>
       </div>
    </>
  )
}

export default EditReply