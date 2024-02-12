import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createReview, deleteReviewById, fetchReviewsByProductId, updateReviewById } from './ReviewApi'


const initialState={
    status:"idle",
    reviewAddStatus:"idle",
    reviewDeleteStatus:"idle",
    reviewUpdateStatus:"idle",
    reviewFetchStatus:"idle",
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
    reducers:{
        resetReviewAddStatus:(state)=>{
            state.reviewAddStatus='idle'
        },
        resetReviewDeleteStatus:(state)=>{
            state.reviewDeleteStatus='idle'
        },
        resetReviewUpdateStatus:(state)=>{
            state.reviewUpdateStatus='idle'
        },
        resetReviewFetchStatus:(state)=>{
            state.reviewFetchStatus='idle'
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createReviewAsync.pending,(state)=>{
                state.reviewAddStatus='pending'
            })
            .addCase(createReviewAsync.fulfilled,(state,action)=>{
                state.reviewAddStatus='fulfilled'
                state.reviews.push(action.payload)
            })
            .addCase(createReviewAsync.rejected,(state,action)=>{
                state.reviewAddStatus='rejected'
                state.errors=action.error
            })

            .addCase(fetchReviewsByProductIdAsync.pending,(state)=>{
                state.reviewFetchStatus='pending'
            })
            .addCase(fetchReviewsByProductIdAsync.fulfilled,(state,action)=>{
                state.reviewFetchStatus='fulfilled'
                state.reviews=action.payload
            })
            .addCase(fetchReviewsByProductIdAsync.rejected,(state,action)=>{
                state.reviewFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(updateReviewByIdAsync.pending,(state)=>{
                state.reviewUpdateStatus='pending'
            })
            .addCase(updateReviewByIdAsync.fulfilled,(state,action)=>{
                state.reviewUpdateStatus='fulfilled'
                const index=state.reviews.findIndex((review)=>review._id===action.payload._id)
                state.reviews[index]=action.payload
            })
            .addCase(updateReviewByIdAsync.rejected,(state,action)=>{
                state.reviewUpdateStatus='rejected'
                state.errors=action.error
            })

            .addCase(deleteReviewByIdAsync.pending,(state)=>{
                state.reviewDeleteStatus='pending'
            })
            .addCase(deleteReviewByIdAsync.fulfilled,(state,action)=>{
                state.reviewDeleteStatus='fulfilled'
                state.reviews=state.reviews.filter((review)=>review._id!==action.payload._id)
            })
            .addCase(deleteReviewByIdAsync.rejected,(state,action)=>{
                state.reviewDeleteStatus='rejected'
                state.errors=action.error
            })
    }
})


// exporting selectors
export const selectReviewStatus=(state)=>state.ReviewSlice.status
export const selectReviews=(state)=>state.ReviewSlice.reviews
export const selectReviewErrors=(state)=>state.ReviewSlice.errors
export const selectReviewSuccessMessage=(state)=>state.ReviewSlice.successMessage
export const selectReviewAddStatus=(state)=>state.ReviewSlice.reviewAddStatus
export const selectReviewDeleteStatus=(state)=>state.ReviewSlice.reviewDeleteStatus
export const selectReviewUpdateStatus=(state)=>state.ReviewSlice.reviewUpdateStatus
export const selectReviewFetchStatus=(state)=>state.ReviewSlice.reviewFetchStatus

// exporting actions
export const {resetReviewAddStatus,resetReviewDeleteStatus,resetReviewUpdateStatus,resetReviewFetchStatus}=reviewSlice.actions

export default reviewSlice.reducer