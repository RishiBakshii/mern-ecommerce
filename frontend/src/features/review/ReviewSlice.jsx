import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createReview, deleteReviewById, fetchReviewsByProductId, updateReviewById } from './ReviewApi'


const initialState={
    status:"idle",
    reviews:[],
    errors:null,
    successMessage:null
}

export const createReviewAsync=createAsyncThunk('review/createReviewAsync',async(review)=>{
    const createdReview=await createReview(review)
    return createdReview
})

export const fetchReviewsByProductIdAsync=createAsyncThunk('review/fetchReviewsByProductIdAsync',async(id)=>{
    const reviews=await fetchReviewsByProductId(id)
    return reviews
})

export const updateReviewByIdAsync=createAsyncThunk("review/updateReviewByIdAsync",async(update)=>{
    const updatedReview=await updateReviewById(update)
    return updatedReview
})

export const deleteReviewByIdAsync=createAsyncThunk('reviews/deleteReviewByIdAsync',async(id)=>{
    const deletedReview=await deleteReviewById(id)
    return deletedReview
})

const reviewSlice=createSlice({
    name:"reviewSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createReviewAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(createReviewAsync.fulfilled,(state,action)=>{
                state.status='pending'
                state.reviews.push(action.payload)
            })
            .addCase(createReviewAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(fetchReviewsByProductIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchReviewsByProductIdAsync.fulfilled,(state,action)=>{
                state.status='pending'
                state.reviews=action.payload
            })
            .addCase(fetchReviewsByProductIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(updateReviewByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(updateReviewByIdAsync.fulfilled,(state,action)=>{
                state.status='pending'
                const index=state.reviews.findIndex((review)=>review._id===action.payload._id)
                state.reviews[index]=action.payload
            })
            .addCase(updateReviewByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(deleteReviewByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(deleteReviewByIdAsync.fulfilled,(state,action)=>{
                state.status='pending'
                state.reviews=state.reviews.filter((review)=>review._id!==action.payload._id)
            })
            .addCase(deleteReviewByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})


// exporting selectors
export const selectReviewStatus=(state)=>state.ReviewSlice.status
export const selectReviews=(state)=>state.ReviewSlice.reviews
export const selectReviewErrors=(state)=>state.ReviewSlice.errors
export const selectReviewSuccessMessage=(state)=>state.ReviewSlice.successMessage

export default reviewSlice.reducer