import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
// import { addProductAsync, resetProductAddStatus, selectProductAddStatus,updateProductByIdAsync } from '../../products/ProductSlice'
import { addQueryAsync, selectQueryIsAddressed, selectQueryDescMessage } from "../../contact/QuerySlice"
import { Grid, Button, Paper, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
import {ProductCard} from '../../products/components/ProductCard'
// import { selectBrands } from '../../brands/BrandSlice'
// import { selectCategories } from '../../categories/CategoriesSlice'
// import { toast } from 'react-toastify'
// import { Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

export const Contact = () => {

    const {register,handleSubmit,reset,formState: { errors }} = useForm()

    const dispatch=useDispatch()
    // const queries=useSelector(selectQueryIsAddressed)
    // const categories=useSelector(selectCategories)
    // const productAddStatus=useSelector(selectProductAddStatus)
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is480=useMediaQuery(theme.breakpoints.down(480))


    const handleAddQuery=(descMessage)=>{
        const newQuery={...descMessage}
        dispatch(addQueryAsync(newQuery))
        
    }



  return (
    
    <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >
        {/* <Grid container gap={1} justifyContent={'center'} alignContent={'center'}>
            {
            queries.map((item,index)=>(
                <Stack component={is480?"":Paper} elevation={1} >


                <Stack paddingLeft={2} paddingRight={2} paddingBottom={2}>

                    
                    
                    
                </Stack>
                </Stack>
            ))
            }
        </Grid> */}

        <Stack width={is1100?"100%":"60rem"} rowGap={4} mt={is480?4:6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddQuery)}> 
            
            {/* field area */}
            <Stack rowGap={3}>
                <Stack>
                    <Typography variant='h6' fontWeight={400}  gutterBottom>Need to contact admin for help?</Typography>
                    <TextField multiline rows={8} {...register("description",{required:"Description is required"})}/>
                </Stack>

            </Stack>

            {/* action area */}
            <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2}>
                <Button size={is480?'medium':'large'} variant='contained' type='submit'>Submit</Button>
                <Button size={is480?'medium':'large'} variant='outlined' color='error' component={Link} to={'/home'}>Cancel</Button>
            </Stack>

        </Stack>

    </Stack>
  )
}
