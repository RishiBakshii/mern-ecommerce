import { axiosi } from "../../config/axios"

export const fetchLoggedInUserById=async(id)=>{
    try {
        const res=await axiosi.get(`/users/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateUserById=async(update)=>{
    try {
        const res=await axiosi.patch(`/users/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}