import { FormHelperText, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ProductCard = ({id,title,price,thumbnail,brand,stockQuantity}) => {
    const navigate=useNavigate()
  return (
    <Stack component={Paper} elevation={1} p={2} width={'340px'}  sx={{cursor:"pointer"}} onClick={()=>navigate(`/product-details/${id}`)}>

        {/* image display */}
        <Stack flex={4} justifyContent={'center'} alignItems={'center'}>
            <img style={{height:"100%",width:"100%",objectFit:"contain"}} src={thumbnail} alt={`${title} photo unavailable`} />
        </Stack>

        {/* lower section */}
        <Stack flex={2} justifyContent={'flex-end'} spacing={1}>

            <Stack>
                <Typography variant='h6' fontWeight={400}>{title}</Typography>
                <Typography color={"text.secondary"}>{brand}</Typography>
            </Stack>

            <Typography>${price}</Typography>
            {
                stockQuantity<=10 && (
                    <FormHelperText sx={{fontSize:".9rem"}} error>{stockQuantity===1?"Only 1 stock is left":"Only few are left"}</FormHelperText>
                )
            }
        </Stack>
    </Stack>
  )
}
