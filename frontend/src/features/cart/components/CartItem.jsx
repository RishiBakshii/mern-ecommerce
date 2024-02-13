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
    const is900=useMediaQuery(theme.breakpoints.down(900))
    const is480=useMediaQuery(theme.breakpoints.down(480))
    const is552=useMediaQuery(theme.breakpoints.down(552))

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
    <Stack bgcolor={'white'} component={is900?'':Paper} p={is900?0:2} elevation={1}  flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        
        {/* image and details */}
        <Stack flexDirection={'row'} rowGap={'1rem'} alignItems={'center'} columnGap={2} flexWrap={'wrap'}>

            <Stack width={is552?"auto":'200px'} height={is552?"auto":'200px'} component={Link} to={`/product-details/${productId}`}>
                <img style={{width:"100%",height:is552?"auto":"100%",aspectRatio:is552?1/1:'',objectFit:'contain'}} src={thumbnail} alt={`${title} image unavailabe`} />
            </Stack>

            <Stack alignSelf={''}>
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
        <Stack justifyContent={'space-evenly'} alignSelf={is552?'flex-end':''} height={'100%'} rowGap={'1rem'} alignItems={'flex-end'}>
            <Typography variant='body2'>${price}</Typography>
            <Button size={is480?"small":""} onClick={handleProductRemove} variant='contained'>Remove</Button>
        </Stack>
    </Stack>
  )
}
