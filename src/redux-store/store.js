import { configureStore , combineReducers } from '@reduxjs/toolkit';
import wishlistSlice from './wishlistSlice/wishlistSlice';
import LoginSlice from './loginSlice/LoginSlice';
import cartSlice from './cartSlice/cartSlice';
import {  
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
 
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const reducers = combineReducers( {
    wishlist : wishlistSlice ,
    login : LoginSlice ,
    cart : cartSlice
} )
const persistedReducers = persistReducer( persistConfig , reducers )

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools : process.env.NODE_ENV !== 'production',
  })
 
