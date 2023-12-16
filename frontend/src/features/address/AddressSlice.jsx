import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddress, deleteAddressById, fetchAddressByUserId, updateAddressById } from "./AddressApi";


const initialState={
    status:"idle",
    addresses:[],
    errors:null,
    successMessage:null
}


export const addAddressAsync=createAsyncThunk('address/addAddressAsync',async(address)=>{
    const createdAddress=await addAddress(address)
    return createdAddress
})
export const fetchAddressByUserIdAsync=createAsyncThunk('address/fetchAddressByUserIdAsync',async(id)=>{
    const addresses=await fetchAddressByUserId(id)
    return addresses
})
export const updateAddressByIdAsync=createAsyncThunk('address/updateAddressByIdAsync',async(id)=>{
    const updatedAddress=await updateAddressById(id)
    return updatedAddress
})
export const deleteAddressByIdAsync=createAsyncThunk('address/deleteAddressByIdAsync',async(id)=>{
    const deletedAddress=await deleteAddressById(id)
    return deletedAddress
})

const addressSlice=createSlice({
    name:"addressSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(addAddressAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(addAddressAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.addresses.push(action.payload)
            })
            .addCase(addAddressAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(fetchAddressByUserIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchAddressByUserIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.addresses=action.payload
            })
            .addCase(fetchAddressByUserIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(updateAddressByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(updateAddressByIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                const index=state.addresses.findIndex((address)=>address._id===action.payload._id)
                state.addresses[index]=action.payload
            })
            .addCase(updateAddressByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(deleteAddressByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(deleteAddressByIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.addresses=state.addresses.filter((address)=>address._id!==action.payload._id)
            })
            .addCase(deleteAddressByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})

// exporting selectors
export const selectAddressStatus=(state)=>state.AddressSlice.status
export const selectAddresses=(state)=>state.AddressSlice.addresses
export const selectAddressErrors=(state)=>state.AddressSlice.errors
export const selectAddressSuccessMessage=(state)=>state.AddressSlice.successMessage


export default addressSlice.reducer