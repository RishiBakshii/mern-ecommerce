import { LinearProgress, Rating, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReviewAsync, resetReviewAddStatus, resetReviewDeleteStatus, resetReviewUpdateStatus, selectReviewAddStatus, selectReviewDeleteStatus, selectReviewStatus, selectReviewUpdateStatus, selectReviews } from '../ReviewSlice'
import { ReviewItem } from './ReviewItem'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import {toast} from 'react-toastify'

export const Reviews = ({productId}) => {

    const dispatch=useDispatch()
    const reviews=useSelector(selectReviews)
    const [value,setValue]=useState(1)
    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    const loggedInUser=useSelector(selectLoggedInUser)
    const reviewStatus=useSelector(selectReviewStatus)

    const reviewAddStatus=useSelector(selectReviewAddStatus)
    const reviewDeleteStatus=useSelector(selectReviewDeleteStatus)
    const reviewUpdateStatus=useSelector(selectReviewUpdateStatus)
    

    useEffect(()=>{

        if(reviewAddStatus==='fulfilled'){
            toast.success("Review added")
        }
        else if(reviewAddStatus==='rejected'){
            toast.error("Error posting review, please try again later")
        }

        reset()
        setValue(1)

        return ()=>{
            dispatch(resetReviewAddStatus())
        }
    },[reviewAddStatus])

    useEffect(()=>{

        if(reviewDeleteStatus==='fulfilled'){
            toast.success("Review deleted")
        }
        else if(reviewDeleteStatus==='rejected'){
            toast.error("Error deleting review, please try again later")
        }
        return ()=>{
            dispatch(resetReviewDeleteStatus())
        }
    },[reviewDeleteStatus])

    useEffect(()=>{

        if(reviewUpdateStatus==='fulfilled'){
            toast.success("Review updated")
        }
        else if(reviewUpdateStatus==='rejected'){
            toast.error("Error updating review, please try again later")
        }
        return ()=>{
            dispatch(resetReviewUpdateStatus())
        }
    },[reviewUpdateStatus])

    const ratingCounts={
        5:0,
        4:0,
        3:0,
        2:0,
        1:0
    }

    reviews.map((review)=>{
        ratingCounts[review.rating]=ratingCounts[review.rating]+1
    })

    const productRatings = reviews.reduce((acc, review) => {
        const count = acc.count + 1;
        const rating = acc.rating + review.rating;
        return {count,rating};
    },{ count: 0, rating: 0 });

    const averageRating=parseInt(productRatings.rating/productRatings.count)

    const handleAddReview=(data)=>{
        const review={...data,rating:value,user:loggedInUser._id,product:productId}
        dispatch(createReviewAsync(review))
    }

    

  return (
        <Stack rowGap={3}>

            <Typography variant='h4' fontWeight={400}>Reviews</Typography>

            {/* rating stats */}
            <Stack>
                {
                    reviews?.length?(
                        <Stack rowGap={3}>

                            <Stack rowGap={1} >
                                <Typography variant='h3' fontWeight={700}>{averageRating}.0</Typography>
                                <Rating readOnly value={averageRating}/>
                                <Typography variant='h6' fontWeight={300}>Based on {reviews.length} {reviews.length===1?"Review":"Reviews"}</Typography>
                            </Stack>

                            <Stack rowGap={3}>

                                <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} columnGap={1}>
                                    <Typography>5</Typography>
                                    <LinearProgress sx={{width:"100%"}} variant='determinate'  value={(ratingCounts[5]/reviews?.length)*100}/>   
                                </Stack>

                                <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} columnGap={1}>
                                    <Typography>4</Typography>
                                    <LinearProgress ariant='determinate' value={(ratingCounts[4]/reviews?.length)*100} variant='determinate' sx={{width:"100%"}}/>   
                                </Stack>

                                <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} columnGap={1}>
                                    <Typography>3</Typography>
                                    <LinearProgress ariant='determinate' value={(ratingCounts[3]/reviews?.length)*100} variant='determinate' sx={{width:"100%"}}/>   
                                </Stack>

                                <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} columnGap={1}>
                                    <Typography>2</Typography>
                                    <LinearProgress variant='determinate' value={(ratingCounts[2]/reviews?.length)*100} sx={{width:"100%"}}/>   
                                </Stack>

                                <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} columnGap={1}>
                                    <Typography>1</Typography>
                                    <LinearProgress variant='determinate' value={(ratingCounts[1]/reviews?.length)*100} sx={{width:"100%"}}/>   
                                </Stack>

                            </Stack>
                        </Stack>

                    ):(
                        <Typography variant='h6' fontWeight={400}>{loggedInUser?.isAdmin?"There are no reviews currently":"Be the one to post review first"}</Typography>
                    )

                }


            </Stack>

            {/* reviews mapping */}
            <Stack rowGap={2}>
                {reviews?.map((review)=>(<ReviewItem key={review._id} id={review._id} userid={review.user._id} comment={review.comment} createdAt={review.createdAt} rating={review.rating} username={review.user.name} />))}
            </Stack>
            
            {/* add review form */}
            {
                !loggedInUser?.isAdmin &&

                <Stack rowGap={3} component={'form'} noValidate onSubmit={handleSubmit(handleAddReview)}>
                    <TextField {...register("comment",{required:true})} sx={{mt:4,width:"40rem"}}  multiline rows={6} fullWidth placeholder='Write a review...'/>
                    
                    <Stack>
                        <Typography variant='body2'>How much did you like the product?</Typography>
                        <Rating size='large' value={value} onChange={(e) => setValue(e.target.value)}/>
                    </Stack>
                    
                    <LoadingButton loading={reviewStatus==='pending'} type='submit' variant='contained'>Add review</LoadingButton>
                </Stack>
            }
        </Stack>
  )
}
