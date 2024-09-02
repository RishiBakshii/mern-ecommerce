import { useEffect } from 'react'
import { checkAuthAsync } from '../../features/auth/AuthSlice'
import { useDispatch } from 'react-redux'

export const useAuthCheck = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(checkAuthAsync())
      },[dispatch])
}
