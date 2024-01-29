import { Box, Button, FormHelperText, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resendOtpAsync, selectLoggedInUser, selectResendOtpStatus, verifyOtpAsync } from '../AuthSlice'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"


export const OtpVerfication = () => {
    
    const {register,handleSubmit,watch,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const loggedInUser=useSelector(selectLoggedInUser)
    const navigate=useNavigate()
    const resendOtpStatus=useSelector(selectResendOtpStatus)
    const [otp,setOtp]=useState('')

    useEffect(()=>{
        if(!loggedInUser){
            navigate('/login')
        }
        else if(loggedInUser && loggedInUser?.isVerified){
            navigate("/")
        }
    },[])

    const handleSendOtp=()=>{
        const data={user:loggedInUser?._id}
        dispatch(resendOtpAsync(data))
    }
    
    const handleVerifyOtp=(data)=>{
        const cred={...data,userId:loggedInUser?._id}
        dispatch(verifyOtpAsync(cred))
    }

  return (
    <Stack width={'100vw'} height={'100vh'} noValidate flexDirection={'column'} rowGap={3} justifyContent="center" alignItems="center" >

        
        <Stack component={Paper} elevation={1} position={'relative'} justifyContent={'center'} alignItems={'center'} p={'2rem'} rowGap={'2rem'}>
            
            <Typography mt={4} variant='h5' fontWeight={500}>Verify Your Email Address</Typography>

            {
                resendOtpStatus!=='fullfilled'?(
                    <Stack width={'100%'} rowGap={'1rem'} component={'form'} noValidate onSubmit={handleSubmit(handleVerifyOtp)}>
                        <Stack rowGap={'1rem'}> 
                            <Stack>
                                <Typography  color={'GrayText'}>Enter the 4 digit OTP sent on</Typography>
                                <Typography fontWeight={'600'} color={'GrayText'}>{loggedInUser?.email}</Typography>
                            </Stack>
                            <Stack>
                                <TextField {...register("otp",{required:"OTP is required",minLength:{value:4,message:"Please enter a 4 digit OTP"}})} fullWidth type='number' />
                                {errors?.otp && <FormHelperText sx={{color:"red"}}>{errors.otp.message}</FormHelperText>}
                            </Stack>
                       </Stack>
                        <Button type='submit' fullWidth variant='contained'>Verify</Button>
                    </Stack>
                ):
                <>
                <Stack>
                    <Typography color={'GrayText'}>We will send you a OTP on</Typography>
                    <Typography fontWeight={'600'} color={'GrayText'}>{loggedInUser?.email}</Typography>
                </Stack>
                <LoadingButton onClick={handleSendOtp} loading={resendOtpStatus==='pending'} fullWidth variant='contained'>Get OTP</LoadingButton>
                </>
             }

        </Stack>
    </Stack>
  )
}
