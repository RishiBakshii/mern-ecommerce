import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/AuthSlice'
import ProductSlice from '../features/products/ProductSlice'

export const store=configureStore({
    reducer:{
        AuthSlice,
        ProductSlice,
    }
})