import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync, selectProductTotalResults, selectProducts } from '../ProductSlice'
import { ProductCard } from './ProductCard'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { selectBrands } from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { selectCategories } from '../../categories/CategoriesSlice'
import Pagination from '@mui/material/Pagination';
import { ITEMS_PER_PAGE } from '../../../constants'

export const ProductList = () => {
    const [filters,setFilters]=useState({})
    const [page,setPage]=useState(1)

    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const products=useSelector(selectProducts)
    const totalResults=useSelector(selectProductTotalResults)
    const dispatch=useDispatch()

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

    useEffect(()=>{
        setPage(1)
    },[totalResults])

    useEffect(()=>{
        const finalFilters={...filters}
        finalFilters['pagination']={page:page,limit:ITEMS_PER_PAGE}
        console.log(finalFilters);
        dispatch(fetchProductsAsync(finalFilters))
    },[filters,page])


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
        <Stack flex={1} rowGap={4}>

            <Grid gap={2} container >
                {
                    products.map((product)=>(
                        <ProductCard key={product._id} id={product._id} title={product.title} thumbnail={product.thumbnail} brand={product.brand.name} price={product.price}/>
                    ))
                }
            </Grid>

            <Stack alignSelf={'flex-end'} mr={5} rowGap={2}>
                <Pagination size='large' page={page}  onChange={(e,page)=>setPage(page)} count={Math.ceil(totalResults/ITEMS_PER_PAGE)} variant="outlined" shape="rounded" />
                <Typography textAlign={'center'}>Showing {(page-1)*ITEMS_PER_PAGE+1} to {page*ITEMS_PER_PAGE>totalResults?totalResults:page*ITEMS_PER_PAGE} of {totalResults} results</Typography>
            </Stack>    
        
        </Stack>

    </Stack>
  )
}
