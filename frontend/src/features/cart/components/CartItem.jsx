import { Button, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from '../CartSlice';
import { Link } from 'react-router-dom';

export const CartItem = ({id,thumbnail,title,category,brand,price,quantity,stockQuantity,productId}) => {


    const dispatch=useDispatch()
    const theme=useTheme()
    const is660=useMediaQuery(theme.breakpoints.down(660))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    const handleAddQty=()=>{
        const update={_id:id,quantity:quantity+1}
        dispatch(updateCartItemByIdAsync(update))
    }
    const handleRemoveQty=()=>{
        if(quantity===1){
            dispatch(deleteCartItemByIdAsync(id))
        }
        else{
            const update={_id:id,quantity:quantity-1}
            dispatch(updateCartItemByIdAsync(update))
        }
    }

    const handleProductRemove=()=>{
        dispatch(deleteCartItemByIdAsync(id))
    }


  return (
    <Stack mt={is660?0:1} p={is660?1:2} flexDirection={'row'} width={'100%'} component={Paper} justifyContent={'space-between'} alignItems={'center'}>
        
        {/* image and details */}
        <Stack  flexDirection={is480?"column":'row'} alignItems={'center'} columnGap={2}>

            <Stack width={'200px'} height={'200px'} component={Link} to={`/product-details/${productId}`}>
                <img style={{height:"100%",width:"100%",objectFit:'contain'}} src={thumbnail} alt={`${title} image unavailabe`} />
            </Stack>

            <Stack alignSelf={is480?"flex-start":""}>
                <Typography component={Link} to={`/product-details/${productId}`} sx={{textDecoration:"none",color:theme.palette.primary.main}} variant='h6' fontWeight={500}>{title}</Typography>
                <Typography variant='body2' color={'text.secondary'}>{brand}</Typography>
                <Typography mt={1}>Quantity</Typography>
                <Stack flexDirection={'row'} alignItems={'center'}>
                    <IconButton onClick={handleRemoveQty}><RemoveIcon fontSize='small'/></IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton onClick={handleAddQty}><AddIcon fontSize='small'/></IconButton>
                </Stack>
            </Stack>
        </Stack>

        {/* price and remove button */}
        <Stack justifyContent={'space-evenly'} alignSelf={is480?"flex-end":""} height={'100%'} rowGap={'1rem'} alignItems={'flex-end'}>
            <Typography variant='body2'>${price}</Typography>
            <Button size={is480?'small':""} onClick={handleProductRemove} variant='contained'>Remove</Button>
        </Stack>
    </Stack>
  )
}
