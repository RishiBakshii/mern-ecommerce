import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/AuthSlice'
import ProductSlice from '../features/products/ProductSlice'
import UserSlice from '../features/user/UserSlice'
import BrandSlice from '../features/brands/BrandSlice'
import CategoriesSlice from '../features/categories/CategoriesSlice'
import CartSlice from '../features/cart/CartSlice'
import AddressSlice from '../features/address/AddressSlice'
import ReviewSlice from '../features/review/ReviewSlice'

export const store=configureStore({
    reducer:{
        AuthSlice,
        ProductSlice,
        UserSlice,
        BrandSlice,
        CategoriesSlice,
        CartSlice,
        AddressSlice,
        ReviewSlice,
    }
})