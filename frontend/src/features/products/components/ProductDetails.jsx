import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductByIdAsync, selectSelectedProduct } from '../ProductSlice'
import { Button, Stack, Typography } from '@mui/material'
import { addToCartAsync } from '../../cart/CartSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'

export const ProductDetails = () => {
    const {id}=useParams()
    const product=useSelector(selectSelectedProduct)
    const loggedInUser=useSelector(selectLoggedInUser)
    const dispatch=useDispatch()


    const handleAddToCart=()=>{
        const item={user:loggedInUser._id,product:id,quantity:1}
        dispatch(addToCartAsync(item))
    }

    useEffect(()=>{
        if(id){
            dispatch(fetchProductByIdAsync(id))
        }
    },[id])

  return (
    <Stack width={'100vw'} height={'calc(100vh - 4rem)'} alignItems={'center'}>

        {/* parent */}
        <Stack width={'80%'} rowGap={5} justifyContent={'center'} alignItems={''}>

            {/* upper */}
            <Stack mt={3} gap={2} height={"30rem"}  flexDirection={'row'} justifyContent={'space-evenly'}>

                <Stack height={'100%'}>
                    <img style={{width:'100%',height:"100%",objectFit:"contain"}} src={product?.images[0]} alt="" />
                </Stack>

                <Stack >
                    <Stack height={'50%'}>
                        <img style={{width:'100%',height:"100%",objectFit:"contain"}} src={product?.images[1]} alt="" />
                    </Stack>
                    <Stack height={'50%'}>
                        <img style={{width:'100%',height:"100%",objectFit:"contain"}} src={product?.images[2]} alt="" />
                    </Stack>
                </Stack>

                <Stack height={'100%'}>
                    <img style={{width:'100%',height:"100%",objectFit:"contain"}} src={product?.images[3]} alt="" />
                </Stack>
            </Stack>

            {/* lower */}
            <Stack flex={1} flexDirection={'row'} columnGap={2} flexWrap={'wrap'}>
                <Stack flex={4} rowGap={2}>
                    <Stack>
                        <Typography variant='h4'>{product?.title}</Typography>
                        <Typography variant='body2' color={'text.secondary'}>{product?.brand.name}</Typography>
                    </Stack>
                    <Typography variant='h6' fontWeight={400}>{product?.description}</Typography>
                </Stack>

                <Stack flex={2} justifyContent={'space-between'}>
                        <Typography variant='h5'>${product?.price}</Typography>
                        <Button variant='contained' onClick={handleAddToCart}>Add to cart</Button>
                </Stack>
            </Stack>

        </Stack>

    </Stack>
  )
}
