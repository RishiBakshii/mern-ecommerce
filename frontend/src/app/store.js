import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/AuthSlice'

export const store=configureStore({
    reducer:{
        AuthSlice
    }
})