import { Grid, Stack } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../ProductSlice'
import { ProductCard } from './ProductCard'

export const ProductList = () => {

    const products=useSelector(selectProducts)


  return (
    <Stack width={'100vw'} height={'calc(100vh - 4rem)'} sx={{overflowY:"scroll"}} flexDirection={'row'}>


        {/* fitlers section */}
        <Stack flex={2}>
            
        </Stack>

        {/* products */}
        <Grid gap={2} container flex={4}>
            {
                products.map((product)=>(
                    <ProductCard key={product._id} title={product.title} thumbnail={product.thumbnail} brand={product.brand.name} price={product.price}/>
                ))
            }
        </Grid>

    </Stack>
  )
}
