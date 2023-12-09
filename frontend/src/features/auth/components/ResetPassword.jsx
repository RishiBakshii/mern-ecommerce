import { Button, FormHelperText, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthErrors, clearAuthSuccessMessage, resetPasswordAsync, selectAuthErrors, selectAuthStatus, selectAuthSuccessMessage } from '../AuthSlice'
import { LoadingButton } from '@mui/lab'
import { Link, useNavigate, useParams } from 'react-router-dom'


export const ResetPassword = () => {
    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const status=useSelector(selectAuthStatus)
    const error=useSelector(selectAuthErrors)
    const successMessage=useSelector(selectAuthSuccessMessage)
    const {userId,passwordResetToken}=useParams()
    const navigate=useNavigate()

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
            navigate("/login")
        }

        return ()=>{
            dispatch(clearAuthErrors())
            dispatch(clearAuthSuccessMessage())
        }
    },[status])

    const handleResetPassword=async(data)=>{
        const cred={...data,userId:userId,token:passwordResetToken}
        delete cred.confirmPassword
        dispatch(resetPasswordAsync(cred))
    }

  return (
    <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>

        <Stack>

        
        <Stack component={Paper} elevation={2}>
            <Stack component={'form'} width={'30rem'} p={2} rowGap={2} noValidate onSubmit={handleSubmit(handleResetPassword)}>
                <Typography variant='h4'>Reset Password</Typography>

                    <TextField sx={{mt:1}} {...register("password",{required:"Please enter a password",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message:`at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`}})} placeholder='New Password'/>
                    {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
                    
                    <TextField sx={{mt:1}} {...register("confirmPassword",{required:"Please Confirm the password",validate:(value,formValues)=>value===formValues.password || "Passwords dosen't match"})} placeholder='Confirm New Password'/>
                    {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
                    <LoadingButton loading={status==='pending'} type='submit' variant='contained'>Reset Password</LoadingButton>
            </Stack>
        </Stack>
        <Typography mt={2} textAlign={'left'} to={'/login'} variant='body2' component={Link}>Go back to Login</Typography>
        </Stack>
    </Stack>
  )
}
