import { axiosi } from "../../config/axios";

export const fetchAllBrands=async()=>{
    try {
        const res=await axiosi.get("/brands")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}