import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersAsync, resetOrderUpdateStatus, selectOrderUpdateStatus, selectOrders, updateOrderByIdAsync } from '../../order/OrderSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import {noOrdersAnimation} from '../../../assets/index'
import Lottie from 'lottie-react'


export const AdminOrders = () => {

  const dispatch=useDispatch()
  const orders=useSelector(selectOrders)
  const [editIndex,setEditIndex]=useState(-1)
  const orderUpdateStatus=useSelector(selectOrderUpdateStatus)
  const theme=useTheme()
  const is1620=useMediaQuery(theme.breakpoints.down(1620))
  const is1200=useMediaQuery(theme.breakpoints.down(1200))
  const is820=useMediaQuery(theme.breakpoints.down(820))
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const {register,handleSubmit,formState: { errors },} = useForm()

  useEffect(()=>{
    dispatch(getAllOrdersAsync())
  },[dispatch])


  useEffect(()=>{
    if(orderUpdateStatus==='fulfilled'){
      toast.success("Status udpated")
    }
    else if(orderUpdateStatus==='rejected'){
      toast.error("Error updating order status")
    }
  },[orderUpdateStatus])

  useEffect(()=>{
    return ()=>{
      dispatch(resetOrderUpdateStatus())
    }
  },[])


  const handleUpdateOrder=(data)=>{
    const update={...data,_id:orders[editIndex]._id}
    setEditIndex(-1)
    dispatch(updateOrderByIdAsync(update))
  }


  const editOptions=['Pending','Dispatched','Out for delivery','Delivered','Cancelled']

  const getStatusColor=(status)=>{
    if(status==='Pending'){
      return {bgcolor:'#dfc9f7',color:'#7c59a4'}
    }
    else if(status==='Dispatched'){
      return {bgcolor:'#feed80',color:'#927b1e'}
    }
    else if(status==='Out for delivery'){
      return {bgcolor:'#AACCFF',color:'#4793AA'}
    }
    else if(status==='Delivered'){
      return {bgcolor:"#b3f5ca",color:"#548c6a"}
    }
    else if(status==='Cancelled'){
      return {bgcolor:"#fac0c0",color:'#cc6d72'}
    }
  }


  return (

    <Stack justifyContent={'center'} alignItems={'center'}>

      <Stack mt={5} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateOrder)}>

        {
          orders.length?
          <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Item</TableCell>
                  <TableCell align="right">Total Amount</TableCell>
                  <TableCell align="right">Shipping Address</TableCell>
                  <TableCell align="right">Payment Method</TableCell>
                  <TableCell align="right">Order Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {
                orders.length && orders.map((order,index) => (

                  <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell component="th" scope="row">{index}</TableCell>
                    <TableCell align="right">{order._id}</TableCell>
                    <TableCell align="right">
                      {
                        order.item.map((product)=>(
                          <Stack mt={2} flexDirection={'row'} alignItems={'center'} columnGap={2}>
                            <Avatar src={product.product.thumbnail}></Avatar>
                            <Typography>{product.product.title}</Typography>
                          </Stack>
                        ))
                      }
                    </TableCell>
                    <TableCell align="right">{order.total}</TableCell>
                    <TableCell align="right">
                      <Stack>
                        <Typography>{order.address[0].street}</Typography>
                        <Typography>{order.address[0].city}</Typography>
                        <Typography>{order.address[0].state}</Typography>
                        <Typography>{order.address[0].postalCode}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{order.paymentMode}</TableCell>
                    <TableCell align="right">{new Date(order.createdAt).toDateString()}</TableCell>

                    {/* order status */}
                    <TableCell align="right">

                        {
                          editIndex===index?(

                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Update status</InputLabel>
                          <Select
                            defaultValue={order.status}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Update status"
                            {...register('status',{required:'Status is required'})}
                            >
                            
                            {
                              editOptions.map((option)=>(
                                <MenuItem value={option}>{option}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                        ):<Chip label={order.status} sx={getStatusColor(order.status)}/>
                        }
                      
                    </TableCell>

                    {/* actions */}
                    <TableCell align="right">

                      {
                        editIndex===index?(
                          <Button>

                            <IconButton type='submit'><CheckCircleOutlinedIcon/></IconButton>
                          </Button>
                        )
                        :
                        <IconButton onClick={()=>setEditIndex(index)}><EditOutlinedIcon/></IconButton>
                      }

                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
          :
          <Stack width={is480?"auto":'30rem'} justifyContent={'center'}>

            <Stack rowGap={'1rem'}>
                <Lottie animationData={noOrdersAnimation}/>
                <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no orders currently</Typography>
            </Stack>
              

          </Stack>  
        }
    
    </Stack>
    
    </Stack>
  )
}
