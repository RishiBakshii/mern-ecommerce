import {FormHelperText, Stack, TextField, Typography,Box} from '@mui/material'
import React, { useEffect } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'
import {useDispatch,useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab';
import {selectLoggedInUser, signupAsync,selectSignupStatus, selectSignupError, clearSignupError, resetSignupStatus} from '../AuthSlice'
import { toast } from 'react-toastify'

export const Signup = () => {
  const dispatch=useDispatch()
  const status=useSelector(selectSignupStatus)
  const error=useSelector(selectSignupError)
  const loggedInUser=useSelector(selectLoggedInUser)
  const {register,handleSubmit,reset,formState: { errors }} = useForm()
  const navigate=useNavigate()

  // handles user redirection
  useEffect(()=>{
    if(loggedInUser && !loggedInUser?.isVerified){
      navigate("/verify-otp")
    }
    else if(loggedInUser){
      navigate("/")
    }
  },[loggedInUser])


  // handles signup error and toast them
  useEffect(()=>{
    if(error){
      toast.error(error.message)
    }
  },[error])

  
  useEffect(()=>{
    if(status==='fullfilled'){
      toast.success("Welcome! Verify your email to start shopping on mern-ecommerce.")
      reset()
    }
    return ()=>{
      dispatch(clearSignupError())
      dispatch(resetSignupStatus())
    }
  },[status])

  // this function handles signup and dispatches the signup action with credentails that api requires
  const handleSignup=(data)=>{
    const cred={...data}
    delete cred.confirmPassword
    dispatch(signupAsync(cred))
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

                <Stack mt={4} spacing={2} width={'28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleSignup)}>

                    <TextField {...register("name",{required:"Username is required"})} placeholder='Username'/>
                    {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}

                    <TextField {...register("email",{required:"Email is required",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Enter a valid email"}})} placeholder='Email'/>
                    {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                    
                    <TextField {...register("password",{required:"Password is required",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message:`at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`}})} placeholder='Password'/>
                    {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}

                    <TextField {...register("confirmPassword",{required:"Confirm Password is required",validate:(value,fromValues)=>value===fromValues.password || "Passwords doesn't match"})} placeholder='Confirm Password'/>
                    {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
                    
                    <LoadingButton loading={status==='pending'} type='submit' variant='contained'>Signup</LoadingButton>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                      <Typography to={'/forgot-password'} component={Link}>Forgot password</Typography>
                      <Typography to={'/login'} component={Link}>Already a member?</Typography>
                    </Stack>

                </Stack>


        </Stack>
    </Stack>
  )
}
