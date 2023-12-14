import React, { useEffect } from 'react'
import { CartItem } from './CartItem'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { selectCartItems } from '../CartSlice'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export const Cart = () => {

    const items=useSelector(selectCartItems)
    const subtotal=items.reduce((acc,item)=>item.product.price*item.quantity+acc,0)
    const totalItems=items.reduce((acc,item)=>acc+item.quantity,0)
    const navigate=useNavigate()

    useEffect(()=>{
        if(items.length===0){
            navigate("/")
        }
    },[items])

  return (
    <Stack width={'100vw'} height={'calc(100vh - 4rem)'} justifyContent={'flex-start'} alignItems={'center'}>

        <Stack p={4} width={'50rem'} rowGap={4}>

            {/* cart items */}
            <Stack>
            {
                items && items.map((item)=>(
                    <CartItem key={item._id} id={item._id} title={item.product.title} brand={item.product.brand.name} category={item.product.category.name} price={item.product.price} quantity={item.quantity} thumbnail={item.product.thumbnail} stockQuantity={item.product.stockQuantity}/>
                ))
            }
            </Stack>
            
            {/* subtotal */}
            <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>

                <Stack>
                    <Typography variant='h6' fontWeight={500}>Subtotal</Typography>
                    <Typography>Total items in cart {totalItems}</Typography>
                    <Typography color={'text.secondary'}>Shipping and taxes will be calculated at checkout.</Typography>
                </Stack>

                <Stack>
                    <Typography variant='h6' fontWeight={500}>${subtotal}</Typography>
                </Stack>
            </Stack>
            
            {/* checkout or continue shopping */}
            <Stack>
                <Button variant='contained'>Checkout</Button>
                <Typography mt={2} component={Link} to={'/'} textAlign={'center'}>or continue shopping</Typography>
            </Stack>
    
        </Stack>


    </Stack>
  )
}
