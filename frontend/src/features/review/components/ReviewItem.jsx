import { Avatar, Button, IconButton, Menu, MenuItem, Paper, Rating, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import {deleteReviewByIdAsync, selectReviewStatus, updateReviewByIdAsync} from '../ReviewSlice'
import { useForm } from "react-hook-form"
import {LoadingButton} from '@mui/lab'


export const ReviewItem = ({id,username,userid,comment,rating,createdAt}) => {

  const dispatch=useDispatch()
  const loggedInUser=useSelector(selectLoggedInUser)
  const reviewStatus=useSelector(selectReviewStatus)
  const {register,handleSubmit,watch,formState: { errors }} = useForm()
  const [edit,setEdit]=useState(false)
  const [editRating,setEditRating]=useState(rating)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteReview=()=>{
    dispatch(deleteReviewByIdAsync(id))
    handleClose()
  }

  const handleUpdateReview=(data)=>{
    const update={...data,_id:id,rating:editRating}
    dispatch(updateReviewByIdAsync(update))
    setEdit(false)
  }


  return (
    <Stack position={'relative'} component={Paper} p={2} rowGap={3}>

        {/* user , rating and created at*/}
        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>

            <Stack flexDirection={'row'} columnGap={2}>
                <Avatar sx={{width:50,height:50}} src='none' alt={username}></Avatar>
                <Stack> 
                        <Typography variant='body2'>{username}</Typography>
                        <Rating readOnly={!edit} onChange={(e)=>setEditRating(e.target.value)} value={edit?editRating:rating}/>
                </Stack>
            </Stack>

          {
            userid===loggedInUser._id && (
              <Stack sx={{position:'absolute',top:0,right:0}}>

              <IconButton aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                <MoreVertIcon/>
              </IconButton>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={()=>{setEdit(true);handleClose()}}>Edit</MenuItem>
                <MenuItem onClick={deleteReview}>Delete</MenuItem>
              </Menu>
            </Stack>
            )
          }

            <Typography alignSelf={"flex-end"} justifySelf={'flex-end'} variant='body2'>{new Date(createdAt).toDateString()}</Typography>
        </Stack>

        {/* review comment */}
        <Stack>
          {
            edit?(
              <Stack component={'form'} noValidate onSubmit={handleSubmit(handleUpdateReview)} rowGap={2}>
                <TextField {...register("comment",{required:true,value:comment})}/>
                <Stack flexDirection={'row'} alignSelf={'flex-end'} rowGap={1} justifyContent={'center'} alignItems={'center'}>
                  <LoadingButton size='small' type='submit' sx={{alignSelf:"flex-end"}} variant='contained'>Update</LoadingButton>
                  <Button size='small' onClick={()=>setEdit(false)} color='error'>Cancel</Button>
                </Stack>
              </Stack>
            ):(<Typography>{comment}</Typography>)
          }
            
        </Stack>
    </Stack>
  )
}
