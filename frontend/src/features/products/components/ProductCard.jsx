import { FormHelperText, IconButton, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';

export const ProductCard = ({id,title,price,thumbnail,brand,stockQuantity,handleAddRemoveFromWishlist,isWishlistCard}) => {


    const navigate=useNavigate()
    const wishlistItems=useSelector(selectWishlistItems)
    let isProductAlreadyinWishlist=-1

    isProductAlreadyinWishlist=wishlistItems.some((item)=>item.product._id===id)

  return (
    <>

    {

    isProductAlreadyinWishlist!==-1 ?
    <Stack  component={isWishlistCard?"":Paper} elevation={1} p={2} width={'340px'}  sx={{cursor:"pointer"}} onClick={()=>navigate(`/product-details/${id}`)}>

        {/* image display */}
        <Stack flex={4} height={'300px'} justifyContent={'center'} alignItems={'center'}>
            <img style={{height:"100%",width:"100%",objectFit:"contain"}} src={thumbnail} alt={`${title} photo unavailable`} />
        </Stack>

        {/* lower section */}
        <Stack flex={2} justifyContent={'flex-end'} spacing={1}>

            <Stack>
                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='h6' fontWeight={400}>{title}</Typography>
                    <Checkbox onClick={(e)=>e.stopPropagation()} checked={isProductAlreadyinWishlist} onChange={(e)=>handleAddRemoveFromWishlist(e,id)} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:'red'}} />} />
                </Stack>
                <Typography color={"text.secondary"}>{brand}</Typography>
            </Stack>

            <Typography>${price}</Typography>
            {
                stockQuantity<=10 && (
                    <FormHelperText sx={{fontSize:".9rem"}} error>{stockQuantity===1?"Only 1 stock is left":"Only few are left"}</FormHelperText>
                )
            }
        </Stack>
    </Stack> 
    :''
    
    
    }
    
    </>
  )
}
