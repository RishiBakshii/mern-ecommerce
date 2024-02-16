import { Avatar, Button, Paper, Stack, Typography, useTheme ,TextField, useMediaQuery} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../UserSlice'
import { addAddressAsync, resetAddressAddStatus, resetAddressDeleteStatus, resetAddressUpdateStatus, selectAddressAddStatus, selectAddressDeleteStatus, selectAddressErrors, selectAddressStatus, selectAddressUpdateStatus, selectAddresses } from '../../address/AddressSlice'
import { Address } from '../../address/components/Address'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import {toast} from 'react-toastify'

export const UserProfile = () => {

    const dispatch=useDispatch()
    const {register,handleSubmit,watch,reset,formState: { errors }} = useForm()
    const status=useSelector(selectAddressStatus)
    const userInfo=useSelector(selectUserInfo)
    const addresses=useSelector(selectAddresses)
    const theme=useTheme()
    const [addAddress,setAddAddress]=useState(false)

    
    const addressAddStatus=useSelector(selectAddressAddStatus)
    const addressUpdateStatus=useSelector(selectAddressUpdateStatus)
    const addressDeleteStatus=useSelector(selectAddressDeleteStatus)

    const is900=useMediaQuery(theme.breakpoints.down(900))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])


    useEffect(()=>{
        if(addressAddStatus==='fulfilled'){
            toast.success("Address added")
        }
        else if(addressAddStatus==='rejected'){
            toast.error("Error adding address, please try again later")
        }
    },[addressAddStatus])

    useEffect(()=>{

        if(addressUpdateStatus==='fulfilled'){
            toast.success("Address updated")
        }
        else if(addressUpdateStatus==='rejected'){
            toast.error("Error updating address, please try again later")
        }
    },[addressUpdateStatus])

    useEffect(()=>{

        if(addressDeleteStatus==='fulfilled'){
            toast.success("Address deleted")
        }
        else if(addressDeleteStatus==='rejected'){
            toast.error("Error deleting address, please try again later")
        }
    },[addressDeleteStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetAddressAddStatus())
            dispatch(resetAddressUpdateStatus())
            dispatch(resetAddressDeleteStatus())
        }
    },[])

    const handleAddAddress=(data)=>{
        const address={...data,user:userInfo._id}
        dispatch(addAddressAsync(address))
        setAddAddress(false)
        reset()
    }

  return (
    <Stack height={'calc(100vh - 4rem)'} justifyContent={'flex-start'} alignItems={'center'}>

            <Stack component={is480?'':Paper} elevation={1} width={is900?'100%':"50rem"} p={2} mt={is480?0:5} rowGap={2}>

                    {/* user details - [name ,email ] */}
                    <Stack bgcolor={theme.palette.primary.light} color={theme.palette.primary.main} p={2} rowGap={1} borderRadius={'.6rem'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar src='none' alt={userInfo?.name} sx={{width:70,height:70}}></Avatar>
                        <Typography>{userInfo?.name}</Typography>
                        <Typography>{userInfo?.email}</Typography>
                    </Stack>


                    {/* address section */}
                    <Stack justifyContent={'center'} alignItems={'center'} rowGap={3}>


                        {/* heading and add button */}
                        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={1}>
                            <Typography variant='h6' fontWeight={400}>Manage addresses</Typography>
                            <Button onClick={()=>setAddAddress(true)} size={is480?'small':""} variant='contained'>Add</Button>
                        </Stack>
                        
                        {/* add address form - state dependent*/}
                        {
                            addAddress?(
                                <Stack width={'100%'} component={'form'} noValidate onSubmit={handleSubmit(handleAddAddress)} rowGap={2}>
                    
                                        <Stack>
                                            <Typography  gutterBottom>Type</Typography>
                                            <TextField placeholder='Eg. Home, Buisness' {...register("type",{required:true})}/>
                                        </Stack>
                    
                    
                                        <Stack>
                                            <Typography gutterBottom>Street</Typography>
                                            <TextField {...register("street",{required:true})}/>
                                        </Stack>
                    
                                        <Stack>
                                            <Typography gutterBottom>Postal Code</Typography>
                                            <TextField type='number' {...register("postalCode",{required:true})}/>
                                        </Stack>
                    
                                        <Stack>
                                            <Typography gutterBottom>Country</Typography>
                                            <TextField {...register("country",{required:true})}/>
                                        </Stack>
                    
                                        <Stack>
                                            <Typography  gutterBottom>Phone Number</Typography>
                                            <TextField type='number' {...register("phoneNumber",{required:true})}/>
                                        </Stack>
                    
                                        <Stack>
                                            <Typography gutterBottom>State</Typography>
                                            <TextField {...register("state",{required:true})}/>
                                        </Stack>
                    
                                        <Stack>
                                            <Typography gutterBottom>City</Typography>
                                            <TextField {...register("city",{required:true})}/>
                                        </Stack>

                                        <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2}>
                                            <LoadingButton loading={status==='pending'} type='submit' size={is480?"small":""} variant='contained'>add</LoadingButton>
                                            <Button color='error' onClick={()=>setAddAddress(false)} variant={is480?"outlined":"text"} size={is480?"small":""} >cancel</Button>
                                        </Stack>
                                </Stack>
                            ):('')
                        }

                        {/* mapping on addresses here  */}
                        <Stack width={'100%'} rowGap={2}>
                            {
                                addresses.length>0?(
                                    addresses.map((address)=>(
                                        <Address key={address._id} id={address._id} city={address.city} country={address.country} phoneNumber={address.phoneNumber} postalCode={address.postalCode} state={address.state} street={address.street} type={address.type}/>
                                    ))
                                ):(
                                    <Typography textAlign={'center'} mt={2} variant='body2'>You have no added addresses</Typography>
                                )
                            }      
                        </Stack>

                    </Stack>


            </Stack>



    </Stack>
  )
}
