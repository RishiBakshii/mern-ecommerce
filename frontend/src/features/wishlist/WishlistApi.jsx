import {axiosi} from '../../config/axios'

export const createWishlistItem=async(data)=>{
    try {
        const res=await axiosi.post("/wishlist",data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchWishlistByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/wishlist/user/${id}`)
        const totalResults=await res.headers.get("X-Total-Count")
        return {data:res.data,totalResults:totalResults}
    } catch (error) {
        throw error.response.data
    }
}

export const updateWishlistItemById=async(update)=>{
    try {
        const res=await axiosi.patch(`/wishlist/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const deleteWishlistItemById=async(id)=>{
    try {
        const res=await axiosi.delete(`/wishlist/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}