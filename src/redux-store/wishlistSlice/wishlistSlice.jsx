import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const wislistSlice = createSlice({
    name : 'wishlist' ,
    initialState : {
        products : []
    },
    reducers : {
        addToWishlist : (state,{ payload }) => {
              // add new product if there is no existing one
              let searchResult = state.products.find( product => product.id === payload.id )
              // check and new wishlist if item does not exists in the wishlist              
              if( searchResult === undefined ){
                  state.products.push( payload )
                  toast(
                          `${ payload.name.slice(0,40) }...  has been successfully 
                             added to your wishlist.`,
                          { position : 'top-center' , type : 'success' }
                       )
              } 
              else{
                toast(
                      'Item is already added in your wishlist',
                    { position : 'top-center' , type : 'warning' }
                 )
              }                         
        } ,
        deleteWishlist : ( state , { payload }) => {
            state.products = state.products.filter( product => product.id !== payload )
            toast('1 item is deleted from wishlist', { type :'error' })
        }
    },   
})

export const { addToWishlist , deleteWishlist } = wislistSlice.actions
export default wislistSlice.reducer