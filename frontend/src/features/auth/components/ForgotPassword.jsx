import { FormHelperText, Paper, Stack, TextField, Typography, useMediaQuery, useTheme, Box, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { clearForgotPasswordError, clearForgotPasswordSuccessMessage, forgotPasswordAsync,resetForgotPasswordStatus,selectForgotPasswordError, selectForgotPasswordStatus, selectForgotPasswordSuccessMessage } from '../AuthSlice'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import bugsAndHugsH4g from '../../../assets/images/bugsAndHugsH4g.png'
import mwhLogo from '../../../assets/images/mwh-logo.png'

export const ForgotPassword = () => {
    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const status=useSelector(selectForgotPasswordStatus)
    const error=useSelector(selectForgotPasswordError)
    const successMessage=useSelector(selectForgotPasswordSuccessMessage)
    const theme=useTheme()
    const is500=useMediaQuery(theme.breakpoints.down(500))

    useEffect(()=>{
        if(error){
            toast.error(error?.message)
        }
        return ()=>{
            dispatch(clearForgotPasswordError())
        }
    },[error])

    useEffect(()=>{
        if(status==='fullfilled'){
            toast.success(successMessage?.message)
        }
        return ()=>{
            dispatch(clearForgotPasswordSuccessMessage())
        }
    },[status])

    useEffect(()=>{
        return ()=>{
            dispatch(resetForgotPasswordStatus())
        }
    },[])

    const handleForgotPassword=async(data)=>{
        dispatch(forgotPasswordAsync(data))
        reset()
    }

//   return (
//     <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>

//         <Stack rowGap={'1rem'}>
//             <Stack component={Paper} elevation={2}>
//                 <Stack component={'form'} width={is500?"95vw":'30rem'} p={is500?"1rem":'1.5rem'} rowGap={'1rem'} noValidate onSubmit={handleSubmit(handleForgotPassword)}>
                        
//                         <Stack rowGap={'.4rem'}>
//                             <Typography variant='h5' fontWeight={600}>{status==='fullfilled'?"Email has been sent!":"Forgot Your Password?"}</Typography>
//                             <Typography color={'text.secondary'} variant='body2'>{status==='fullfilled'?"Please check your inbox and click on the received link to reset your password":"Enter your registered email below to receive password reset link"}</Typography>
//                         </Stack>
                        
//                         {
//                             status!=='fullfilled' &&
//                         <>
//                         <motion.div whileHover={{y:-2}}>
//                             <TextField fullWidth sx={{mt:1}} {...register("email",{required:"Please enter a email",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Enter a valid email"}})} placeholder='Enter email'/>
//                             {errors.email && <FormHelperText sx={{fontSize:".9rem",mt:1}} error >{errors.email.message}</FormHelperText>}
//                         </motion.div>

//                         <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
//                             <LoadingButton sx={{height:'2.5rem'}} fullWidth loading={status==='pending'} type='submit' variant='contained'>Send Password Reset Link</LoadingButton>
//                         </motion.div>
//                         </>
//                         }
//                 </Stack>
//             </Stack>
            
//             {/* back to login navigation */}
//             <motion.div whileHover={{x:2}} whileTap={{scale:1.050}}>
//                 <Typography sx={{textDecoration:"none",color:"text.primary",width:"fit-content"}} mt={2} to={'/login'} variant='body2' component={Link}>Go back to <span style={{color:theme.palette.primary.dark}}>login</span></Typography>
//             </motion.div>
//         </Stack>
//     </Stack>
//   )
return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{ overflowY: "hidden" }} bgcolor={'#F6F4F1'}>
      {/* Left section: Logos */}
      <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
        <Stack flexDirection={'row'} spacing={4} alignItems={'center'}>
          <img src={bugsAndHugsH4g} alt="Hugs & More" style={{ width: '444px' }} />
          <img src={mwhLogo} alt="Muhammadiyah Welfare Home" style={{ width: '200px' }} />
        </Stack>
      </Stack>

      {/* Right section: Form */}
      <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
        <Box width={'30rem'} maxWidth="700px" p={4} borderRadius={8} boxShadow={3} bgcolor="white">
          <Stack flexDirection={'column'} rowGap={'1rem'}>
            {/* Title and description */}
            <Typography variant="h5" fontWeight={600}>
              {status === 'fullfilled' ? "Email has been sent!" : "Forgot password?"}
            </Typography>
            <Typography color={'GrayText'} variant="body2">
              {status === 'fullfilled'
                ? "Please check your inbox and click on the link to reset your password."
                : "Enter your registered email below to receive the password reset link."}
            </Typography>

            {/* Form */}
            {status !== 'fullfilled' && (
              <form noValidate onSubmit={handleSubmit(handleForgotPassword)}>
                <Stack rowGap={2}>
                  <motion.div whileHover={{ y: -2 }}>
                    <TextField
                      fullWidth
                      {...register("email", {
                        required: "Please enter an email",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email",
                        },
                      })}
                      placeholder="Enter email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ height: '2.5rem', backgroundColor: "#A33B20", color: "#FFF" }}
                    >
                      {status === 'pending' ? "Sending..." : "Send Password Reset Link"}
                    </Button>
                  </motion.div>
                </Stack>
              </form>
            )}
          </Stack>

        {/* Back to login link */}
        <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
          <Typography
            sx={{ textDecoration: "none", color: "text.primary", marginTop: '1rem', cursor: "pointer" }}
            variant="body2"
            component={Link}
            to="/login"
          >
            Go back to <span style={{ color: "#A33B20" }}>login</span>
          </Typography>
        </motion.div>
        </Box>
      </Stack>
    </Stack>
  );
}
