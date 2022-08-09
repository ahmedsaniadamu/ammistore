import React from 'react'
import { useSelector } from 'react-redux'
import DeleteReply from './actions/DeleteReply'
import EditReply from './actions/EditReply'

const Reply = ({ replies }) => {

  const dateOptions = { weekday : 'long' , year : 'numeric' , month : 'short' , day : 'numeric'}
  const { isAuth , email } = useSelector( state => state.login )

  return (
    <>
     { 
       replies.map( reply => {
           return (
             <div className='d-flex reply mb-2 ms-0 mt-2 ms-md-4' key={ reply.id }>
              <i className='bi bi-person-circle'></i>
              <div className='ms-2'>
                  <h5> 
                      <span> { reply.customerName } </span>                                                  
                        <i> 
                          {   
                            `${ new Date(reply.dateCreated).toLocaleDateString( 'en-US', dateOptions ) }  `
                          }   
                          at                          
                          {
                             ` ${ new Date(reply.dateCreated).toLocaleTimeString() }`
                          }
                        </i>                  
                  </h5>
                  <p className='mb-1'> {  reply.reply } </p>
                    {   
                        /* 
                          allow user to edit and delete reply if the user is authenticated 
                          and is reponsible for the individual reply.
                        */
                        ( isAuth && email === reply.customerEmail ) &&
                        <>
                            <EditReply replyId = { reply.id } reply = { reply.reply } />
                            <DeleteReply replyId = { reply.id } />
                        </>
                    }
              </div>
            </div>
           )
       } )
      }
   </>
  )
}

export default Reply