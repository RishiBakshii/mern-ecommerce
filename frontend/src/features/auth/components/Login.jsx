import {FormHelperText, Stack, TextField, Typography ,Button,Box} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'
import {useDispatch,useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab';
import {selectAuthStatus,selectAuthErrors,selectLoggedInUser,verifyOtpAsync, clearAuthErrors, clearAuthSuccessMessage, loginAsync, resetAuthStatus} from '../AuthSlice'
import { toast } from 'react-toastify'

export const Login = () => {
  const dispatch=useDispatch()
  const status=useSelector(selectAuthStatus)
  const error=useSelector(selectAuthErrors)
  const loggedInUser=useSelector(selectLoggedInUser)
  const {register,handleSubmit,reset,formState: { errors }} = useForm()
  const navigate=useNavigate()


  useEffect(()=>{
    // this checks whether the user is logged in and is verified, if yes then redirects the user to homepage
    if(loggedInUser?.isVerified){
      navigate("/")
    }
    else if(!loggedInUser?.isVerified){
      navigate("/verify-otp")
    }
  },[loggedInUser])


  // it checks if there are errors in the auth state, if yes then toasts them and shows
  useEffect(()=>{
    if(error){
      toast.error(error.message)
    }
  },[error])

  
  useEffect(()=>{
    /* It tracks the auth status, on being fullfilled it shows the message accordinly*/
    if(status==='fullfilled' && loggedInUser?.isVerified===true){
      toast.success(`Login successful`)
      reset()
    }
    return ()=>{
      dispatch(clearAuthErrors())
      dispatch(clearAuthSuccessMessage())
      dispatch(resetAuthStatus())
    }
  },[status])

  // this function handles login and dispatches the login action with credentails that api requires
  const handleLogin=(data)=>{
    const cred={...data}
    delete cred.confirmPassword
    dispatch(loginAsync(cred))
  }


  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'}>
        <Stack flex={1} justifyContent={'center'} >
          <Lottie animationData={ecommerceOutlookAnimation}/>
        </Stack>

        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
              <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                  <Typography variant='h3' sx={{wordBreak:"break-word"}} fontWeight={300}>Shop Anything</Typography>
                  <Box width={'100px'}>
                    <Lottie animationData={shoppingBagAnimation} ></Lottie>
                  </Box>
              </Stack>

                <Stack mt={4} spacing={2} width={'28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleLogin)}>

                    <TextField {...register("email",{required:"Email is required",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Enter a valid email"}})} placeholder='Email'/>
                    {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                    
                    <TextField {...register("password",{required:"Password is required"})} placeholder='Password'/>
                    {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
                    
                    <LoadingButton loading={status==='pending'} type='submit' variant='contained'>Login</LoadingButton>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                      <Typography to={'/forgot-password'} component={Link}>Forgot password</Typography>
                      <Typography to={'/signup'} component={Link}>Create new Account?</Typography>
                    </Stack>

                </Stack>
        </Stack>
    </Stack>
  )
}
