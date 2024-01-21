import { Button, FormHelperText, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const ProductCard = ({id,title,price,thumbnail,brand,stockQuantity,handleAddRemoveFromWishlist,isWishlistCard}) => {


    const navigate=useNavigate()
    const wishlistItems=useSelector(selectWishlistItems)
    const loggedInUser=useSelector(selectLoggedInUser)
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()
    let isProductAlreadyinWishlist=-1

    isProductAlreadyinWishlist=wishlistItems.some((item)=>item.product._id===id)

    const isProductAlreadyInCart=cartItems.some((item)=>item.product._id===id)

    const handleAddToCart=async(e)=>{
        e.stopPropagation()
        const data={user:loggedInUser?._id,product:id}
        dispatch(addToCartAsync(data))
    }


  return (
    <>

    {

    isProductAlreadyinWishlist!==-1 ?
    <Stack  component={isWishlistCard?"":Paper} elevation={1} p={2} width={'340px'}  sx={{cursor:"pointer"}} onClick={()=>navigate(`/product-details/${id}`)}>

        {/* image display */}
        <Stack flex={4} height={'300px'} width={"300px"} justifyContent={'center'} alignItems={'center'}>
            <img style={{height:"100%",width:"100%",objectFit:"contain"}} src={thumbnail} alt={`${title} photo unavailable`} />
        </Stack>

        {/* lower section */}
        <Stack flex={2} justifyContent={'flex-end'} spacing={1} rowGap={2}>

            <Stack>
                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='h6' fontWeight={400}>{title}</Typography>
                    <Checkbox onClick={(e)=>e.stopPropagation()} checked={isProductAlreadyinWishlist} onChange={(e)=>handleAddRemoveFromWishlist(e,id)} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:'red'}} />} />
                </Stack>
                <Typography color={"text.secondary"}>{brand}</Typography>
            </Stack>

            <Stack sx={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Typography>${price}</Typography>
                {
                    !isWishlistCard? isProductAlreadyInCart?
                    // <button style={{padding:"10px 15px",borderRadius:"3px",outline:"none",border:"none",cursor:"pointer",backgroundColor:"black",color:"white",fontSize:".9rem"}}>
                    //     <div style={{display:"flex",alignItems:"center",columnGap:".5rem"}}>
                    //         <p>Remove from Cart</p>
                    //     </div>
                    // </button>
                    ''
                    : <button onClick={(e)=>handleAddToCart(e)} style={{padding:"10px 15px",borderRadius:"3px",outline:"none",border:"none",cursor:"pointer",backgroundColor:"black",color:"white",fontSize:".9rem"}}>
                        <div style={{display:"flex",alignItems:"center",columnGap:".5rem"}}>
                            <p>Add To Cart</p>
                        </div>
                    </button>:''
                }
                
            </Stack>
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
