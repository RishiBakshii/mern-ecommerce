import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetCurrentOrder, selectCurrentOrder } from '../features/order/OrderSlice'
import { selectUserInfo } from '../features/user/UserSlice'
import { orderSuccessAnimation } from '../assets'
import Lottie from 'lottie-react'

export const OrderSuccessPage = () => {


    const navigate=useNavigate()
    const dispatch=useDispatch()
    const currentOrder=useSelector(selectCurrentOrder)
    const userDetails=useSelector(selectUserInfo)
    const {id}=useParams()

    useEffect(()=>{
        if(!currentOrder){
            navigate("/")
        }
    },[currentOrder])

  return (
    <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>

        <Stack component={Paper} rowGap={3} elevation={1} p={4} justifyContent={'center'} alignItems={'center'}>

            <Box width={'10rem'} height={'7rem'}>
                <Lottie animationData={orderSuccessAnimation}></Lottie>
            </Box>

            <Stack mt={2} justifyContent={'center'} alignItems={'center'} rowGap={1}>
                <Typography variant='h6' fontWeight={400}>Hey {userDetails?.name}</Typography>

                <Typography variant='h5' >Your Order #{currentOrder?._id} is confirmed</Typography>
                <Typography variant='body2' color='text.secondary'>Thankyou for shopping with us❤️</Typography>
            </Stack>

            <Button component={Link} to={'/orders'} onClick={()=>dispatch(resetCurrentOrder())}  variant='contained'>Check order status in my orders</Button>
        </Stack>

    </Stack>
  )
}
