import { Button, Grid, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { selectBrands } from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { selectCategories } from '../../categories/CategoriesSlice'
import { ProductCard } from '../../products/components/ProductCard'
import { deleteProductByIdAsync, fetchProductsAsync, selectProductIsFilterOpen, selectProducts, toggleFilters, undeleteProductByIdAsync } from '../../products/ProductSlice';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import ClearIcon from '@mui/icons-material/Clear';

export const AdminDashBoard = () => {

    const [filters,setFilters]=useState({})
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const products=useSelector(selectProducts)
    const dispatch=useDispatch()
    const theme=useTheme()
    const is500=useMediaQuery(theme.breakpoints.down(500))
    const isProductFilterOpen=useSelector(selectProductIsFilterOpen)
    

    useEffect(()=>{
        dispatch(fetchProductsAsync(filters))
    },[filters])

    const handleBrandFilters=(e)=>{

        const filterSet=new Set(filters.brand)

        if(e.target.checked){filterSet.add(e.target.value)}
        else{filterSet.delete(e.target.value)}

        const filterArray = Array.from(filterSet);
        setFilters({...filters,brand:filterArray})
    }

    const handleCategoryFilters=(e)=>{
        const filterSet=new Set(filters.category)

        if(e.target.checked){filterSet.add(e.target.value)}
        else{filterSet.delete(e.target.value)}

        const filterArray = Array.from(filterSet);
        setFilters({...filters,category:filterArray})
    }


    const handleProductDelete=(productId)=>{
        dispatch(deleteProductByIdAsync(productId))
    }

    const handleProductUnDelete=(productId)=>{
        dispatch(undeleteProductByIdAsync(productId))
    }

    const handleFilterClose=()=>{
        dispatch(toggleFilters())
    }

  return (
    <>

    <motion.div style={{position:"fixed",backgroundColor:"white",height:"100vh",padding:'1rem',overflowY:"scroll",width:is500?"100vw":"30rem",zIndex:500}}  variants={{show:{left:0},hide:{left:-500}}} initial={'hide'} transition={{ease:"easeInOut",duration:.7,type:"spring"}} animate={isProductFilterOpen===true?"show":"hide"}>

        {/* fitlers section */}
        <Stack mb={'5rem'}  sx={{scrollBehavior:"smooth",overflowY:"scroll"}}>

        
            <Typography variant='h4'>New Arrivals</Typography>


                <IconButton onClick={handleFilterClose} style={{position:"absolute",top:15,right:15}}>
                    <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                        <ClearIcon fontSize='medium'/>
                    </motion.div>
                </IconButton>


        <Stack rowGap={2} mt={4} >
            <Typography sx={{cursor:"pointer"}} variant='body2'>Totes</Typography>
            <Typography sx={{cursor:"pointer"}} variant='body2'>Backpacks</Typography>
            <Typography sx={{cursor:"pointer"}} variant='body2'>Travel Bags</Typography>
            <Typography sx={{cursor:"pointer"}} variant='body2'>Hip Bags</Typography>
            <Typography sx={{cursor:"pointer"}} variant='body2'>Laptop Sleeves</Typography>
        </Stack>

        {/* brand filters */}
        <Stack mt={2}>
            <Accordion>
                <AccordionSummary expandIcon={<AddIcon />}  aria-controls="brand-filters" id="brand-filters" >
                        <Typography>Brands</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{p:0}}>
                    <FormGroup onChange={handleBrandFilters}>
                        {
                            brands?.map((brand)=>(
                                <motion.div style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                                    <FormControlLabel sx={{ml:1}} control={<Checkbox whileHover={{scale:1.1}} />} label={brand.name} value={brand._id} />
                                </motion.div>
                            ))
                        }
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </Stack>

        {/* category filters */}
        <Stack mt={2}>
            <Accordion>
                <AccordionSummary expandIcon={<AddIcon />}  aria-controls="brand-filters" id="brand-filters" >
                        <Typography>Category</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{p:0}}>
                    <FormGroup onChange={handleCategoryFilters}>
                        {
                            categories?.map((category)=>(
                                <motion.div style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                                    <FormControlLabel sx={{ml:1}} control={<Checkbox whileHover={{scale:1.1}} />} label={category.name} value={category._id} />
                                </motion.div>
                            ))
                        }
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </Stack>
</Stack>

    </motion.div>

    <Stack flexDirection={'row'} p={4} columnGap={2}>
        <Grid gap={2} container flex={1} justifyContent={'center'} alignContent={"center"}>
            {
                products.map((product)=>(
                    <Stack>
                        <Stack sx={{opacity:product.isDeleted?.7:1}}>
                            <ProductCard key={product._id} id={product._id} title={product.title} thumbnail={product.thumbnail} brand={product.brand.name} price={product.price} isAdminCard={true}/>
                        </Stack>
                        <Stack mt={2} flexDirection={'row'} justifySelf={'flex-end'} alignSelf={'flex-end'} columnGap={2}>
                            <Button component={Link} to={`/admin/product-update/${product._id}`} variant='contained'>Update</Button>
                            {
                                product.isDeleted===true?(
                                    <Button onClick={()=>handleProductUnDelete(product._id)} color='error' variant='outlined'>Un-delete</Button>
                                ):(
                                    <Button onClick={()=>handleProductDelete(product._id)} color='error' variant='outlined'>Delete</Button>
                                )
                            }
                        </Stack>
                    </Stack>
                ))
            }
        </Grid>
    </Stack>
    </>
  )
}
