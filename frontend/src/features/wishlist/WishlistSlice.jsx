import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createWishlistItem, deleteWishlistItemById, fetchWishlistByUserId, updateWishlistItemById } from './WishlistApi'

const initialState={
    wishlistItemUpdateStatus:"idle",
    wishlistItemAddStatus:'idle',
    wishlistItemDeleteStatus:"idle",
    wishlistFetchStatus:'idle',
    items:[],
    totalResults:0,
    errors:null,
    successMessage:null,
}

export const createWishlistItemAsync=createAsyncThunk('wishlist/createWishlistItemAsync',async(data)=>{
    const createdItem=await createWishlistItem(data)
    return createdItem
})
export const fetchWishlistByUserIdAsync=createAsyncThunk('wishlist/fetchWishlistByUserIdAsync',async(id)=>{
    const fetchedWishlist=await fetchWishlistByUserId(id)
    return fetchedWishlist
})
export const updateWishlistItemByIdAsync=createAsyncThunk('wishlist/updateWishlistItemByIdAsync',async(update)=>{
    const updatedWishlistItem=await updateWishlistItemById(update)
    return updatedWishlistItem
})
export const deleteWishlistItemByIdAsync=createAsyncThunk('wishlist/deleteWishlistItemByIdAsync',async(id)=>{
    const deletedWishlistItem=await deleteWishlistItemById(id)
    return deletedWishlistItem
})

const wishlistSlice=createSlice({
    name:"wishlistSlice",
    initialState:initialState,
    reducers:{
        resetWishlistItemUpdateStatus:(state)=>{
            state.wishlistItemUpdateStatus='idle'
        },
        resetWishlistItemAddStatus:(state)=>{
            state.wishlistItemAddStatus='idle'
        },
        resetWishlistItemDeleteStatus:(state)=>{
            state.wishlistItemDeleteStatus='idle'
        },
        resetWishlistFetchStatus:(state)=>{
            state.wishlistFetchStatus='idle'
        },

    },
    extraReducers:(builder)=>{
        builder
            .addCase(createWishlistItemAsync.pending,(state)=>{
                state.wishlistItemAddStatus='pending'
            })
            .addCase(createWishlistItemAsync.fulfilled,(state,action)=>{
                state.wishlistItemAddStatus='fulfilled'
                state.items.push(action.payload)
            })
            .addCase(createWishlistItemAsync.rejected,(state,action)=>{
                state.wishlistItemAddStatus='rejected'
                state.errors=action.error
            })

            .addCase(fetchWishlistByUserIdAsync.pending,(state)=>{
                state.wishlistFetchStatus='pending'
            })
            .addCase(fetchWishlistByUserIdAsync.fulfilled,(state,action)=>{
                state.wishlistFetchStatus='fulfilled'
                state.items=action.payload.data
                state.totalResults=action.payload.totalResults
            })
            .addCase(fetchWishlistByUserIdAsync.rejected,(state,action)=>{
                state.wishlistFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(updateWishlistItemByIdAsync.pending,(state)=>{
                state.wishlistItemUpdateStatus='pending'
            })
            .addCase(updateWishlistItemByIdAsync.fulfilled,(state,action)=>{
                state.wishlistItemUpdateStatus='fulfilled'
                const index=state.items.findIndex((item)=>item._id===action.payload._id)
                state.items[index]=action.payload
            })
            .addCase(updateWishlistItemByIdAsync.rejected,(state,action)=>{
                state.wishlistItemUpdateStatus='rejected'
                state.errors=action.error
            })

            .addCase(deleteWishlistItemByIdAsync.pending,(state)=>{
                state.wishlistItemDeleteStatus='pending'
            })
            .addCase(deleteWishlistItemByIdAsync.fulfilled,(state,action)=>{
                state.wishlistItemDeleteStatus='fulfilled'
                state.items=state.items.filter((item)=>item._id!==action.payload._id)
            })
            .addCase(deleteWishlistItemByIdAsync.rejected,(state,action)=>{
                state.wishlistItemDeleteStatus='rejected'
                state.errors=action.error
            })
    }
})


// exporting selectors
export const selectWishlistItems=(state)=>state.WishlistSlice.items
export const selectWishlistFetchStatus=(state)=>state.WishlistSlice.wishlistFetchStatus
export const selectWishlistItemUpdateStatus=(state)=>state.WishlistSlice.wishlistItemUpdateStatus
export const selectWishlistItemAddStatus=(state)=>state.WishlistSlice.wishlistItemAddStatus
export const selectWishlistItemDeleteStatus=(state)=>state.WishlistSlice.wishlistItemDeleteStatus
export const selectWishlistErrors=(state)=>state.WishlistSlice.errors
export const selectWishlistSuccessMessage=(state)=>state.WishlistSlice.successMessage
export const selectWishlistTotalResults=(state)=>state.WishlistSlice.totalResults

// exporting actions
export const {resetWishlistFetchStatus,resetWishlistItemAddStatus,resetWishlistItemDeleteStatus,resetWishlistItemUpdateStatus}=wishlistSlice.actions

export default wishlistSlice.reducer