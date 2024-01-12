import { Button, Grid, Stack, Typography } from '@mui/material'
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
import { deleteProductByIdAsync, fetchProductsAsync, selectProducts, undeleteProductByIdAsync } from '../../products/ProductSlice';

export const AdminDashBoard = () => {

    const [filters,setFilters]=useState({})
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const products=useSelector(selectProducts)
    const dispatch=useDispatch()

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


  return (
    <Stack flexDirection={'row'} p={4} columnGap={2}>


    {/* fitlers section */}
    <Stack flex={.24} justifySelf={"flex-start"} >
        
        <Stack position={'fixed'} height={'100%'} sx={{overflowY:"scroll",scrollBehavior:"smooth"}}>

                <Typography variant='h4'>New Arrivals</Typography>

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
                                        <FormControlLabel control={<Checkbox />} label={brand.name} value={brand._id} />
                                    ))
                                }
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                </Stack>

                {/* category filters */}
                <Stack mt={2}>
                    <Accordion>
                        <AccordionSummary expandIcon={<AddIcon />}  aria-controls="category-filters" id="category-filters" >
                                <Typography>Category</Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{p:0}}>
                            <FormGroup onChange={handleCategoryFilters}>
                                {
                                    categories?.map((category)=>(
                                        <FormControlLabel control={<Checkbox />} key={category._id} label={category.name} value={category._id} />
                                    ))
                                }
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
        </Stack>
    </Stack>

    {/* products */}
    <Grid gap={2} container flex={1}>
        {
            products.map((product)=>(
                <Stack>
                    <Stack sx={{opacity:product.isDeleted?.7:1}}>

                        <ProductCard key={product._id} id={product._id} title={product.title} thumbnail={product.thumbnail} brand={product.brand.name} price={product.price}/>
                    </Stack>
                    <Stack mt={2} flexDirection={'row'} justifySelf={'flex-end'} alignSelf={'flex-end'} columnGap={2}>
                        <Button variant='contained'>Update</Button>
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
  )
}
