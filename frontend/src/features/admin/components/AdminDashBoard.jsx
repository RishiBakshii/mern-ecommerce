import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Pagination, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
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
import { deleteProductByIdAsync, fetchProductsAsync, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters, undeleteProductByIdAsync } from '../../products/ProductSlice';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import ClearIcon from '@mui/icons-material/Clear';
import { ITEMS_PER_PAGE } from '../../../constants';

const sortOptions=[
    {name:"Price: low to high",sort:"price",order:"asc"},
    {name:"Price: high to low",sort:"price",order:"desc"},
]

export const AdminDashBoard = () => {

    const [filters,setFilters]=useState({})
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const [sort,setSort]=useState(null)
    const [page,setPage]=useState(1)
    const products=useSelector(selectProducts)
    const dispatch=useDispatch()
    const theme=useTheme()
    const is500=useMediaQuery(theme.breakpoints.down(500))
    const isProductFilterOpen=useSelector(selectProductIsFilterOpen)
    const totalResults=useSelector(selectProductTotalResults)
    
    const is1200=useMediaQuery(theme.breakpoints.down(1200))
    const is800=useMediaQuery(theme.breakpoints.down(800))
    const is700=useMediaQuery(theme.breakpoints.down(700))
    const is600=useMediaQuery(theme.breakpoints.down(600))
    const is488=useMediaQuery(theme.breakpoints.down(488))

    useEffect(()=>{
        setPage(1)
    },[totalResults])

    useEffect(()=>{
        const finalFilters={...filters}

        finalFilters['pagination']={page:page,limit:ITEMS_PER_PAGE}
        finalFilters['sort']=sort

        dispatch(fetchProductsAsync(finalFilters))
        
    },[filters,sort,page])

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

    <Stack rowGap={5} mt={is600?2:5} mb={'3rem'}>

        {/* sort options */}
        <Stack flexDirection={'row'} mr={'2rem'} justifyContent={'flex-end'} alignItems={'center'} columnGap={5}>

            <Stack alignSelf={'flex-end'} width={'12rem'}>
                <FormControl fullWidth>
                        <InputLabel id="sort-dropdown">Sort</InputLabel>
                        <Select
                            variant='standard'
                            labelId="sort-dropdown"
                            label="Sort"
                            onChange={(e)=>setSort(e.target.value)}
                            value={sort}
                        >
                            <MenuItem bgcolor='text.secondary' value={null}>Reset</MenuItem>
                            {
                                sortOptions.map((option)=>(
                                    <MenuItem key={option} value={option}>{option.name}</MenuItem>
                                ))
                            }
                        </Select>
                </FormControl>
            </Stack>

        </Stack>
     
        <Grid gap={2} container flex={1} justifyContent={'center'} alignContent={"center"}>
            {
                products.map((product)=>(
                    <Stack>
                        <Stack sx={{opacity:product.isDeleted?.7:1}}>
                            <ProductCard key={product._id} id={product._id} title={product.title} thumbnail={product.thumbnail} brand={product.brand.name} price={product.price} isAdminCard={true}/>
                        </Stack>
                        <Stack paddingLeft={2} paddingRight={2} flexDirection={'row'} justifySelf={'flex-end'} alignSelf={'flex-end'} columnGap={is488?1:2}>
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

        <Stack alignSelf={is488?'center':'flex-end'} mr={is488?0:5} rowGap={2} p={is488?1:0}>
            <Pagination size={is488?'medium':'large'} page={page}  onChange={(e,page)=>setPage(page)} count={Math.ceil(totalResults/ITEMS_PER_PAGE)} variant="outlined" shape="rounded" />
            <Typography textAlign={'center'}>Showing {(page-1)*ITEMS_PER_PAGE+1} to {page*ITEMS_PER_PAGE>totalResults?totalResults:page*ITEMS_PER_PAGE} of {totalResults} results</Typography>
        </Stack>    
    
    </Stack> 
    </>
  )
}
