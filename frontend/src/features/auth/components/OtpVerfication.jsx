import { Button, FormHelperText, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, verifyOtpAsync } from '../AuthSlice'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const inputStyles={
    border:"1px solid black",
    width:"60px",
    height:"60px",
    textAlign:'center',
    borderRadius:"4px",
    fontSize:"1.2rem",
}

export const OtpVerfication = () => {

    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const loggedInUser=useSelector(selectLoggedInUser)
    const navigate=useNavigate()

    const handleOtpVerification=(data)=>{
        const cred={...data,userId:loggedInUser._id,otp:parseInt([data.otp0,data.otp1,data.otp2,data.otp3].join(''))}
        delete cred.otp0
        delete cred.otp1
        delete cred.otp2
        delete cred.otp3
        dispatch(verifyOtpAsync(cred))
    }

    useEffect(()=>{
        if(!loggedInUser){
            navigate('/login')
        }
        else if(loggedInUser && loggedInUser?.isVerified){
            navigate("/")
        }
    },[])

  return (
    <Stack component={'form'} width={'100vw'} height={'100vh'} noValidate flexDirection={'column'} rowGap={3} justifyContent="center" alignItems="center" onSubmit={handleSubmit(handleOtpVerification)}>

        
        <Stack component={Paper} elevation={1} position={'relative'} justifyContent={'center'} alignItems={'center'} p={'2rem'} rowGap={'3rem'}>
            <IconButton component={Link} to={'/login'} sx={{position:"absolute",top:0,left:0}}><ArrowBackIcon fontSize='medium'/></IconButton>
            <Typography mt={4} variant='h5' fontWeight={500}>Verify Your Email Address</Typography>

            <Stack rowGap={'1rem'}>
                <Typography color={'GrayText'}>Enter the OTP code here</Typography>
                <Stack flexDirection={'row'} columnGap={'4px'}>
                    {
                        [0,1,2,3].map((value)=>(
                            <input style={inputStyles} maxLength="1" type="text" {...register(`otp${value}`,{required:"otp is required"})}/>
                        ))
                    }
                </Stack>
            </Stack>

            <Stack textAlign={'center'} rowGap={'1rem'}>
                <Typography>Didn't receive an OTP?</Typography>
                <Typography style={{cursor:"pointer"}} fontWeight={'600'}>Resend OTP?</Typography>
            </Stack>

            <LoadingButton type='submit' fullWidth variant='contained'>
                Submit
            </LoadingButton>

        </Stack>
    </Stack>
  )
}
