import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../AuthSlice"
import { Navigate } from "react-router"


export const Protected = ({children}) => {
    const loggedInUser=useSelector(selectLoggedInUser)

    if(loggedInUser?.isVerified){
        return children
    }
    return <Navigate to={'/login'} replace={true}/>
}
