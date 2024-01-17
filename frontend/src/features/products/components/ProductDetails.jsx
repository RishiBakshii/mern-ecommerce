import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductByIdAsync, selectSelectedProduct } from '../ProductSlice'
import { Alert,Button,Rating, Stack, TextField, Typography, useTheme } from '@mui/material'
import { addToCartAsync, resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { createReviewAsync, fetchReviewsByProductIdAsync, selectReviewStatus,} from '../../review/ReviewSlice'
import { useForm } from "react-hook-form"
import {LoadingButton} from '@mui/lab'
import { Reviews } from '../../review/components/Reviews'
import {toast} from 'react-toastify'


export const ProductDetails = () => {
    const {id}=useParams()
    const [value, setValue] = useState(1);
    const product=useSelector(selectSelectedProduct)
    const loggedInUser=useSelector(selectLoggedInUser)
    const dispatch=useDispatch()
    const cartItems=useSelector(selectCartItems)
    const theme=useTheme()
    const reviewStatus=useSelector(selectReviewStatus)
    const cartItemAddStatus=useSelector(selectCartItemAddStatus)
    

    const isProductAlreadyInCart=cartItems.some((item)=>item.product._id===id)


    const handleAddToCart=()=>{
        const item={user:loggedInUser._id,product:id,quantity:1}
        dispatch(addToCartAsync(item))
    }

    
    useEffect(()=>{
        if(id){
            dispatch(fetchProductByIdAsync(id))
            dispatch(fetchReviewsByProductIdAsync(id))
        }
    },[id])


    useEffect(()=>{

        if(cartItemAddStatus==='fulfilled'){
            toast.success("Product added to cart")
        }

        else if(cartItemAddStatus==='rejected'){
            toast.error('Error adding product to cart, please try again later')
        }

        return ()=>{
            dispatch(resetCartItemAddStatus())
        }

    },[cartItemAddStatus])
    


  return (
    <Stack alignItems={'center'}>

        {/* parent */}
        <Stack width={'80%'} rowGap={5} justifyContent={'center'} mb={5}>

            {/* upper */}
            <Stack mt={5} gap={2} height={"30rem"}  flexDirection={'row'} justifyContent={'space-evenly'}>

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
                        {
                            isProductAlreadyInCart?(
                                <Alert severity='info' color={'info'} sx={{bgcolor:theme.palette.primary.light}}>This Product is Already in your cart</Alert>
                            ):(

                                loggedInUser?.isAdmin?null:
                                <Button variant='contained' onClick={handleAddToCart}>Add to cart</Button>
                            )
                        }
                </Stack>
            </Stack>


            {/* reviews */}
            <Stack mt={5}  alignSelf={'flex-start'}>

                <Reviews productId={id}/>       

            </Stack>


        </Stack>



    </Stack>
  )
}
