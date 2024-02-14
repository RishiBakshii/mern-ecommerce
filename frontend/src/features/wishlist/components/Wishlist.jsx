import { Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch,useSelector} from 'react-redux'
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistFetchStatus, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, resetWishlistItemUpdateStatus, selectWishlistFetchStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItemUpdateStatus, selectWishlistItems, updateWishlistItemByIdAsync } from '../WishlistSlice'
import {ProductCard} from '../../products/components/ProductCard'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { emptyWishlistAnimation, loadingAnimation } from '../../../assets';
import Lottie from 'lottie-react' 
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useForm } from "react-hook-form"
import {addToCartAsync, resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems} from '../../cart/CartSlice'
import { motion } from 'framer-motion';

export const Wishlist = () => {

  const dispatch=useDispatch()
  const wishlistItems=useSelector(selectWishlistItems)
  const wishlistItemAddStatus=useSelector(selectWishlistItemAddStatus)
  const wishlistItemDeleteStatus=useSelector(selectWishlistItemDeleteStatus)
  const wishlistItemUpdateStatus=useSelector(selectWishlistItemUpdateStatus)
  const loggedInUser=useSelector(selectLoggedInUser)
  const cartItems=useSelector(selectCartItems)
  const cartItemAddStatus=useSelector(selectCartItemAddStatus)
  const wishlistFetchStatus=useSelector(selectWishlistFetchStatus)

  const [editIndex,setEditIndex]=useState(-1)
  const [editValue,setEditValue]=useState('')
  const {register,handleSubmit,watch,formState: { errors }} = useForm()

  const theme=useTheme()
  const is1130=useMediaQuery(theme.breakpoints.down(1130))
  const is642=useMediaQuery(theme.breakpoints.down(642))
  const is480=useMediaQuery(theme.breakpoints.down(480))
  
  const handleAddRemoveFromWishlist=(e,productId)=>{
    if(e.target.checked){
        const data={user:loggedInUser?._id,product:productId}
        dispatch(createWishlistItemAsync(data))
    }

    else if(!e.target.checked){
        const index=wishlistItems.findIndex((item)=>item.product._id===productId)
        dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  } 

  useEffect(()=>{
    window.scrollTo({
        top:0,
        behavior:"instant"
    })
  },[])

  useEffect(()=>{
    if(wishlistItemAddStatus==='fulfilled'){
        toast.success("Product added to wishlist")
    }
    else if(wishlistItemAddStatus==='rejected'){
        toast.error("Error adding product to wishlist, please try again later")
    }


  },[wishlistItemAddStatus])

  useEffect(()=>{
    if(wishlistItemDeleteStatus==='fulfilled'){
        toast.success("Product removed from wishlist")
    }
    else if(wishlistItemDeleteStatus==='rejected'){
        toast.error("Error removing product from wishlist, please try again later")
    }

  },[wishlistItemDeleteStatus])


  useEffect(()=>{
    if(wishlistItemUpdateStatus==='fulfilled'){
      toast.success("Wislist item updated")
    }
    else if(wishlistItemUpdateStatus==='rejected'){
      toast.error("Error updating wishlist item")
    }

    setEditIndex(-1)
    setEditValue("")

  },[wishlistItemUpdateStatus])

  useEffect(()=>{

    if(cartItemAddStatus==='fulfilled'){
        toast.success("Product added to cart")
    }

    else if(cartItemAddStatus==='rejected'){
        toast.error('Error adding product to cart, please try again later')
    }

},[cartItemAddStatus])


  useEffect(()=>{
    if(wishlistFetchStatus==='rejected'){
      toast.error("Error fetching wishlist, please try again later")
    }
  },[wishlistFetchStatus])

  useEffect(()=>{
    return ()=>{
      dispatch(resetWishlistFetchStatus())
      dispatch(resetCartItemAddStatus())
      dispatch(resetWishlistItemUpdateStatus())
      dispatch(resetWishlistItemDeleteStatus())
      dispatch(resetWishlistItemAddStatus())
    }
  },[])

  const handleNoteUpdate=(wishlistItemId)=>{
    const update={_id:wishlistItemId,note:editValue}
    dispatch(updateWishlistItemByIdAsync(update))
  }

  const handleEdit=(index)=>{
    setEditValue(wishlistItems[index].note)
    setEditIndex(index)
  }

  const handleAddToCart=(productId)=>{
    const data={user:loggedInUser?._id,product:productId}
    dispatch(addToCartAsync(data))
  }


  return (
    // parent
    <Stack justifyContent={'flex-start'} mt={is480?3:5} mb={'14rem'} alignItems={'center'}>
        {
          wishlistFetchStatus==='pending'?
          <Stack width={is480?'auto':'25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} alignItems={'center'}>
                <Lottie animationData={loadingAnimation}/>
          </Stack>
          :

        <Stack width={is1130?"auto":'70rem'} rowGap={is480?2:4}>

            {/* heading area and back button */}
            <Stack alignSelf={'flex-start'} flexDirection={'row'} columnGap={1} justifyContent={'center'} alignItems={'center'}>
                <motion.div whileHover={{x:-5}}>
                  <IconButton component={Link} to={'/'}><ArrowBackIcon fontSize={is480?'medium':'large'}/></IconButton>
                </motion.div>
                <Typography variant='h4' fontWeight={500}>Your wishlist</Typography>
            </Stack>

            {/* product grid */}
            <Stack >

              {
                !wishlistFetchStatus==='pending' && wishlistItems?.length===0?(
                  // empty wishlist animation
                  <Stack minHeight={'60vh'} width={is642?'auto':'40rem'} justifySelf={'center'}  alignSelf={'center'} justifyContent={'center'} alignItems={'center'}>
                    <Lottie animationData={emptyWishlistAnimation}/>
                    <Typography variant='h6' fontWeight={300}>You have no items in your wishlist</Typography>
                  </Stack>
                ):
                // wishlist grid
                <Grid container gap={1} justifyContent={'center'} alignContent={'center'}>
                  {
                    wishlistItems.map((item,index)=>(
                      <Stack component={is480?"":Paper} elevation={1} >

                          <ProductCard item key={item._id} brand={item.product.brand.name} id={item.product._id} price={item.product.price} stockQuantity={item.product.stockQuantity} thumbnail={item.product.thumbnail} title={item.product.title} handleAddRemoveFromWishlist={handleAddRemoveFromWishlist} isWishlistCard={true}/>
                        
                        <Stack paddingLeft={2} paddingRight={2} paddingBottom={2}>

                          {/* note heading and icon */}
                          <Stack flexDirection={'row'} alignItems={'center'}>
                            <Typography variant='h6' fontWeight={400}>Note</Typography>
                            <IconButton onClick={()=>handleEdit(index)} ><EditOutlinedIcon/></IconButton>
                          </Stack>

                          {
                            editIndex===index?(

                              <Stack rowGap={2}>
                                
                                <TextField multiline rows={4} value={editValue} onChange={(e)=>setEditValue(e.target.value)}/>
                                
                                <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={1}>
                                    <Button onClick={()=>handleNoteUpdate(item._id)} size='small' variant='contained'>Update</Button>
                                    <Button onClick={()=>setEditIndex(-1)} size='small' variant='outlined' color='error'>Cancel</Button>
                                </Stack>

                              </Stack>
                            ):
                            <Box>
                              <Typography sx={{wordWrap:"break-word",color:item.note?'text.primary':'GrayText'}}>{item.note?item.note:"Add a custom note here"}</Typography>
                            </Box>
                          }

                          {
                            cartItems.some((cartItem)=>cartItem.product._id===item.product._id)?
                            <Button sx={{mt:4}} size='small' variant='outlined' component={Link} to={'/cart'}>Already in cart</Button>:<Button sx={{mt:4}} size='small' onClick={()=>handleAddToCart(item.product._id)} variant='outlined'>Add To Cart</Button>
                          }
                          
                          
                        </Stack>
                      </Stack>
                    ))
                  }
                </Grid>
              }
            </Stack>
        
        </Stack>
        }
        
    </Stack>
  )
}
