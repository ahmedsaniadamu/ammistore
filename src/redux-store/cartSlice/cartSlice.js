import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
    name : 'cart-slice' ,
    initialState : {
        products : [] ,
    } ,
    reducers : {
        addItemToCart : ( state , { payload } ) => {
             // add new product to cart if there is no existing one
             let searchCartItem = state.products.find( product => product.id === payload.id )
             // check and new wishlist if item does not exists in the cart       
             if( searchCartItem === undefined ){
                 state.products.push( payload )
                 toast(
                         `${ payload.name.slice(0,40) }...  has been successfully 
                            added to your cart.`,
                         { position : 'top-center' , type : 'success' }
                      )
             } 
             else{
               toast(
                     'Item is already exists in your cart',
                   { position : 'top-center' , type : 'warning' }
                )
             }    
        } ,
        deleteCartItem : ( state , { payload }) => {
            state.products = state.products.filter( cart => cart.id !== payload )
            toast('1 item is deleted from wishlist', { type :'error' })
        } ,
        increaseQuantity : ( state , { payload } ) => {
             // payload === index of the cart item
             let cartItem = state.products[ payload ]
             if(cartItem.quantity < 5  ){
                 cartItem.quantity += 1  ;
                 cartItem.price = cartItem.standartPrice * cartItem.quantity                                 
             }  
        },
        decreaseQuantity : ( state , { payload } ) => {
            // payload === index of the cart item
            let cartItem = state.products[ payload ]
            if(cartItem.quantity > 1  ){
                cartItem.quantity -= 1  ;
                cartItem.price = cartItem.price - cartItem.standartPrice                
            }  
       },
       clearCart : ( state ) => {
          state.products = [] ;
       }
    }
})
export const { 
               addItemToCart , deleteCartItem , clearCart,
               increaseQuantity , decreaseQuantity 
             } = cartSlice.actions ;
export default cartSlice.reducer