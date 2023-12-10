import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync, selectLoggedInUser } from '../AuthSlice'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
    const dispatch=useDispatch()
    const loggedInUser=useSelector(selectLoggedInUser)
    const navigate=useNavigate()

    useEffect(()=>{
        dispatch(logoutAsync())
    },[])

    useEffect(()=>{
        if(!loggedInUser){
            navigate("/login")
        }
    },[loggedInUser])

  return (
    <></>
  )
}
