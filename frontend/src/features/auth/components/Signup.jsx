import {FormHelperText, Stack, TextField, Typography ,Button,Box} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'
import {useDispatch,useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab';
import {selectAuthStatus,selectAuthErrors,selectLoggedInUser, signupAsync, verifyOtpAsync, clearAuthErrors, clearAuthSuccessMessage} from '../AuthSlice'
import { toast } from 'react-toastify'

export const Signup = () => {
  const dispatch=useDispatch()
  const status=useSelector(selectAuthStatus)
  const error=useSelector(selectAuthErrors)
  const loggedInUser=useSelector(selectLoggedInUser)
  const [showOtpInput,setShowOtpInput]=useState(false)
  const {register,handleSubmit,reset,formState: { errors }} = useForm()
  const navigate=useNavigate()



  useEffect(()=>{
    /* this checks whether the loggedInUser is verified or not,
    if verified and loggedIn then redirects the user to homepage,
    if loggedIn but not verified then shows the Otp input box to the user
    */
    if(loggedInUser?.isVerified){
      navigate("/")
    }
    else if(loggedInUser){
      setShowOtpInput(true)
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
    if(status==='fullfilled' && loggedInUser.isVerified===false){
      toast.success(`Welcome on board ${loggedInUser.name}, please verify the otp sent on your mail`)
      setShowOtpInput(true)
      reset()
    }
    else if(status==='fullfilled' && loggedInUser.isVerified===true){
      toast.success(`Otp verification successful`)
    }

    return ()=>{
      dispatch(clearAuthErrors())
      dispatch(clearAuthSuccessMessage())
    }
  },[status])

  // this function handles signup and dispatches the signup action with credentails that api requires
  const handleSignup=(data)=>{
    const cred={...data}
    delete cred.confirmPassword
    dispatch(signupAsync(cred))
  }

  // this function handles otp verifiction and dispatches the verifyOtp action with credentails that api requires
  const handleOtpVerification=(data)=>{
    const cred={...data,userId:loggedInUser._id}
    dispatch(verifyOtpAsync(cred))
  }


  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'}>
        <Stack flex={1} justifyContent={'center'} >
          <Lottie animationData={ecommerceOutlookAnimation}/>
        </Stack>

        <Stack>
        </Stack>

        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
          {
            showOtpInput?(
              <Stack component={'form'} noValidate flexDirection={'column'} rowGap={3} justifyContent="center" alignItems="center" onSubmit={handleSubmit(handleOtpVerification)}>
                  <Typography variant='h3' sx={{wordBreak:"break-word"}} fontWeight={300}>Enter the Otp sent on mail</Typography>
                  <TextField sx={{mt:3}} {...register("otp",{required:"Please enter a valid Otp"})} type='number' fullWidth variant='filled'/>
                  {errors.otp && <FormHelperText sx={{fontSize:".9rem"}} error>{errors.otp.message}</FormHelperText>}
                  <Button type='submit' fullWidth variant='contained'>Verify</Button>
              </Stack>
            ):(
              <>
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
            </>
            )
          }

        </Stack>
    </Stack>
  )
}
