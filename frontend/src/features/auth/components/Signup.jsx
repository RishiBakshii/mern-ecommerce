import {FormHelperText, Stack, TextField, Typography,Box, useTheme, useMediaQuery, Button} from '@mui/material'
import React, { useEffect } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'
import {useDispatch,useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab';
import {selectLoggedInUser, signupAsync,selectSignupStatus, selectSignupError, clearSignupError, resetSignupStatus} from '../AuthSlice'
import { toast } from 'react-toastify'
import { MotionConfig , motion} from 'framer-motion'
import bugsAndHugsH4g from '../../../assets/images/bugsAndHugsH4g.png'
import mwhLogo from '../../../assets/images/mwh-logo.png'

export const Signup = () => {
  const dispatch=useDispatch()
  const status=useSelector(selectSignupStatus)
  const error=useSelector(selectSignupError)
  const loggedInUser=useSelector(selectLoggedInUser)
  const {register,handleSubmit,reset,formState: { errors }} = useForm()
  const navigate=useNavigate()
  const theme=useTheme()
  const is900=useMediaQuery(theme.breakpoints.down(900))
  const is480=useMediaQuery(theme.breakpoints.down(480))

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

//   return (
//     <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{overflowY:"hidden"}}>

//       {
//         !is900 &&

//         <Stack bgcolor={'black'} flex={1} justifyContent={'center'} >
//           <Lottie animationData={ecommerceOutlookAnimation}/>
//         </Stack>
        
//         }

//         <Stack flex={1} justifyContent={'center'} alignItems={'center'}>

//               <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
//                   <Stack rowGap={'.4rem'}>
//                     <Typography variant='h2' sx={{wordBreak:"break-word"}} fontWeight={600}>Mern Shop</Typography>
//                     <Typography alignSelf={'flex-end'} color={'GrayText'} variant='body2'>- Shop Anything</Typography>
//                   </Stack>

//               </Stack>

//                 <Stack mt={4} spacing={2} width={is480?"95vw":'28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleSignup)}>

//                     <MotionConfig whileHover={{y:-5}}>

//                       <motion.div>
//                         <TextField fullWidth {...register("name",{required:"Username is required"})} placeholder='Username'/>
//                         {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}
//                       </motion.div>

//                       <motion.div>
//                         <TextField fullWidth {...register("email",{required:"Email is required",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Enter a valid email"}})} placeholder='Email'/>
//                         {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
//                       </motion.div>

//                       <motion.div>
//                         <TextField type='password' fullWidth {...register("password",{required:"Password is required",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message:`at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`}})} placeholder='Password'/>
//                         {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
//                       </motion.div>
                      
//                       <motion.div>
//                         <TextField type='password' fullWidth {...register("confirmPassword",{required:"Confirm Password is required",validate:(value,fromValues)=>value===fromValues.password || "Passwords doesn't match"})} placeholder='Confirm Password'/>
//                         {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
//                       </motion.div>
                    
//                     </MotionConfig>

//                     <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
//                       <LoadingButton sx={{height:'2.5rem'}} fullWidth loading={status==='pending'} type='submit' variant='contained'>Signup</LoadingButton>
//                     </motion.div>

//                     <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'}>
//                         <MotionConfig whileHover={{x:2}} whileTap={{scale:1.050}}>
//                             <motion.div>
//                                 <Typography mr={'1.5rem'} sx={{textDecoration:"none",color:"text.primary"}} to={'/forgot-password'} component={Link}>Forgot password</Typography>
//                             </motion.div>

//                             <motion.div>
//                                 <Typography sx={{textDecoration:"none",color:"text.primary"}} to={'/login'} component={Link}>Already a member? <span style={{color:theme.palette.primary.dark}}>Login</span></Typography>
//                             </motion.div>
//                         </MotionConfig>
//                     </Stack>

//                 </Stack>


//         </Stack>
//     </Stack>
//   )
return (
  <div style={{ display: "flex", width: "100vw", height: "100vh", backgroundColor: "#F6F4F1", overflowY: "hidden" }}>
    {!is900 && (
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <img src={bugsAndHugsH4g} alt="Hugs & More" style={{ width: "444px" }} />
          <img src={mwhLogo} alt="Muhammadiyah Welfare Home" style={{ width: "200px" }} />
        </div>
      </div>
    )}
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        width={is480 ? "90vw" : "30rem"}
        maxWidth="700px"
        padding={4}
        borderRadius={8}
        boxShadow={3}
        bgcolor="white"
      >
        <Stack direction="column" spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color="GrayText">Have an Account?</Typography>
            <Link to="/login" style={{ color: theme.palette.primary.main, textDecoration: "none" }}>
              Sign in
            </Link>
          </Stack>
          <Typography variant="h3" fontWeight={600}>Sign up</Typography>

          <form noValidate onSubmit={handleSubmit(handleSignup)}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                {...register("name", { required: "Full name is required" })}
                placeholder="Full name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="Email address"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <TextField
                  fullWidth
                  {...register("username", { required: "Username is required" })}
                  placeholder="Username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  fullWidth
                  {...register("contact", { required: "Contact number is required" })}
                  placeholder="Contact number"
                  error={!!errors.contact}
                  helperText={errors.contact?.message}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <TextField
                  fullWidth
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message: "Must be at least 8 characters with uppercase, lowercase, and a number",
                    },
                  })}
                  placeholder="Password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <TextField
                  fullWidth
                  {...register("room", { required: "Room number is required" })}
                  placeholder="Room number"
                  error={!!errors.room}
                  helperText={errors.room?.message}
                />
              </div>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={status === "pending"}
                sx={{ backgroundColor: "#A33B20", color: "#FFF" }}
              >
                {status === "pending" ? "Signing up..." : "Sign up"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </div>
  </div>
)}