import { axiosi } from "../../config/axios";

export const addProduct=async(data)=>{
    try {
        const res=await axiosi.post('/products',data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchProducts=async(filters)=>{

    let queryString=''

    if(filters.brand){
        filters.brand.map((brand)=>{
            queryString+=`brand=${brand}&`
        })
    }
    if(filters.category){
        filters.category.map((category)=>{
            queryString+=`category=${category}&`
        })
    }

    try {
        const res=await axiosi.get(`/products?${queryString}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchProductById=async(id)=>{
    try {
        const res=await axiosi.get(`/products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateProductById=async(update)=>{
    try {
        const res=await axiosi.patch(`/products/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const undeleteProductById=async(id)=>{
    try {
        const res=await axiosi.patch(`/products/undelete/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteProductById=async(id)=>{
    try {
        const res=await axiosi.delete(`/products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
