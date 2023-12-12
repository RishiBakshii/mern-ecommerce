import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProductById, fetchProductById, fetchProducts, undeleteProductById, updateProductById } from "./ProductApi";


const initialState={
    status:"idle",
    products:[],
    selectedProduct:null,
    errors:null,
    successMessage:null
}

export const addProductAsync=createAsyncThunk("products/addProductAsync",async(data)=>{
    const addedProduct=await addProduct(data)
    return addedProduct
})
export const fetchProductsAsync=createAsyncThunk("products/fetchProductsAsync",async(filters)=>{
    const products=await fetchProducts(filters)
    return products
})
export const fetchProductByIdAsync=createAsyncThunk("products/fetchProductByIdAsync",async(id)=>{
    const selectedProduct=await fetchProductById(id)
    return selectedProduct
})
export const updateProductByIdAsync=createAsyncThunk("products/updateProductByIdAsync",async(update)=>{
    const updatedProduct=await updateProductById(update)
    return updatedProduct
})
export const undeleteProductByIdAsync=createAsyncThunk("products/undeleteProductByIdAsync",async(id)=>{
    const unDeletedProduct=await undeleteProductById(id)
    return unDeletedProduct
})
export const deleteProductByIdAsync=createAsyncThunk("products/deleteProductByIdAsync",async(id)=>{
    const deletedProduct=await deleteProductById(id)
    return deletedProduct
})

const productSlice=createSlice({
    name:"productSlice",
    initialState:initialState,
    reducers:{
        clearProductErrors:(state)=>{
            state.errors=null
        },
        clearProductSuccessMessage:(state)=>{
            state.successMessage=null
        },
        resetProductStatus:(state)=>{
            state.status='idle'
        },
        clearSelectedProduct:(state)=>{
            state.selectedProduct=null
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addProductAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(addProductAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
                state.products.push(action.payload)
            })
            .addCase(addProductAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(fetchProductsAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchProductsAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
                state.products=action.payload
            })
            .addCase(fetchProductsAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(fetchProductByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchProductByIdAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
                state.selectedProduct=action.payload
            })
            .addCase(fetchProductByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(updateProductByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(updateProductByIdAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
                const index=state.products.findIndex((product)=>product._id===action.payload._id)
                state.products[index]=action.payload
            })
            .addCase(updateProductByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(undeleteProductByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(undeleteProductByIdAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
                const index=state.products.findIndex((product)=>product._id===action.payload._id)
                state.products[index]=action.payload
            })
            .addCase(undeleteProductByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(deleteProductByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(deleteProductByIdAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
                const index=state.products.findIndex((product)=>product._id===action.payload._id)
                state.products[index]=action.payload
            })
            .addCase(deleteProductByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})

// exporting selectors
export const selectProductStatus=(state)=>state.ProductSlice.status
export const selectProducts=(state)=>state.ProductSlice.products
export const selectSelectedProduct=(state)=>state.ProductSlice.selectedProduct
export const selectProductErrors=(state)=>state.ProductSlice.errors
export const selectProductSuccessMessage=(state)=>state.ProductSlice.successMessage

// exporting actions
export const {clearProductSuccessMessage,clearProductErrors,clearSelectedProduct,resetProductStatus}=productSlice.actions

export default productSlice.reducer
