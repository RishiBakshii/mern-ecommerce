import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createOrder, getAllOrders, getOrderByUserId, updateOrderById } from './OrderApi'


const initialState={
    status:"idle",
    orders:[],
    errors:null,
    successMessage:null
}

export const createOrderAsync=createAsyncThunk("orders/createOrderAsync",async(order)=>{
    const createdOrder=await createOrder(order)
    return createdOrder
})

export const getAllOrdersAsync=createAsyncThunk("orders/getAllOrdersAsync",async()=>{
    const orders=await getAllOrders()
    return orders
})

export const getOrderByUserIdAsync=createAsyncThunk("orders/getOrderByUserIdAsync",async(id)=>{
    const orders=await getOrderByUserId(id)
    return orders
})

export const updateOrderByIdAsync=createAsyncThunk("orders/updateOrderByIdAsync",async(update)=>{
    const updatedOrder=await updateOrderById(update)
    return updatedOrder
})

const orderSlice=createSlice({
    name:'orderSlice',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createOrderAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(createOrderAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.orders.push(action.payload)
            })
            .addCase(createOrderAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(getAllOrdersAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(getAllOrdersAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.orders=action.payload
            })
            .addCase(getAllOrdersAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(getOrderByUserIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(getOrderByUserIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.orders=action.payload
            })
            .addCase(getOrderByUserIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(updateOrderByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(updateOrderByIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                const index=state.orders.findIndex((order)=>order._id===action.payload._id)
                state.orders[index]=action.payload
            })
            .addCase(updateOrderByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})


// exporting selectors
export const selectOrderStatus=(state)=>state.OrderSlice.status
export const selectOrders=(state)=>state.OrderSlice.orders
export const selectOrdersErrors=(state)=>state.OrderSlice.errors
export const selectOrdersSuccessMessage=(state)=>state.OrderSlice.successMessage

export default orderSlice.reducer