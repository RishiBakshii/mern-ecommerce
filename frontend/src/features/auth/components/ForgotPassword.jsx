import { Button, FormHelperText, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordAsync, selectAuthErrors, selectAuthStatus, selectAuthSuccessMessage } from '../AuthSlice'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'


export const ForgotPassword = () => {
    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const status=useSelector(selectAuthStatus)
    const error=useSelector(selectAuthErrors)
    const successMessage=useSelector(selectAuthSuccessMessage)

    useEffect(()=>{
        if(error){
            toast.error(error.message)
            reset()
        }
    },[error])

    useEffect(()=>{
        if(status==='fullfilled'){
            toast.success(successMessage.message)
            reset()
        }
    },[status])

    const handleForgotPassword=async(data)=>{
        dispatch(forgotPasswordAsync(data))
    }

  return (
    <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>

        <Stack>

        
        <Stack component={Paper} elevation={2}>
            <Stack component={'form'} width={'30rem'} p={2} rowGap={2} noValidate onSubmit={handleSubmit(handleForgotPassword)}>
                    <Stack>
                        <Typography variant='h6' fontWeight={300}>Enter the registered email</Typography>
                        <Typography color={'text.secondary'}>and let us help you reset your password</Typography>
                    </Stack>
                    <TextField sx={{mt:1}} {...register("email",{required:"Please enter a email",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Enter a valid email"}})} placeholder='Enter email'/>
                    {errors.email && <FormHelperText sx={{fontSize:".9rem"}} error>{errors.email.message}</FormHelperText>}
                    <LoadingButton loading={status==='pending'} type='submit' variant='contained'>Send Password Reset Link</LoadingButton>
            </Stack>
        </Stack>
        <Typography mt={2} textAlign={'left'} to={'/login'} variant='body2' component={Link}>Go back to Login</Typography>
        </Stack>
    </Stack>
  )
}
