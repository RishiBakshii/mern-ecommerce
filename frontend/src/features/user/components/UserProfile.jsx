import { Avatar, Button, Paper, Stack, Typography, useTheme ,TextField} from '@mui/material'
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
    const addressErrors=useSelector(selectAddressErrors)
    const theme=useTheme()
    const [addAddress,setAddAddress]=useState(false)

    
    const addressAddStatus=useSelector(selectAddressAddStatus)
    const addressUpdateStatus=useSelector(selectAddressUpdateStatus)
    const addressDeleteStatus=useSelector(selectAddressDeleteStatus)


    useEffect(()=>{
        if(addressAddStatus==='fulfilled'){
            toast.success("Address added")
        }
        else if(addressAddStatus==='rejected'){
            toast.error("Error adding address, please try again later")
        }

        return ()=>{
            dispatch(resetAddressAddStatus())
        }
    },[addressAddStatus])

    useEffect(()=>{

        if(addressUpdateStatus==='fulfilled'){
            toast.success("Address updated")
        }
        else if(addressUpdateStatus==='rejected'){
            toast.error("Error updating address, please try again later")
        }

        return ()=>{
            dispatch(resetAddressUpdateStatus())
        }

    },[addressUpdateStatus])

    useEffect(()=>{

        if(addressDeleteStatus==='fulfilled'){
            toast.success("Address deleted")
        }
        else if(addressDeleteStatus==='rejected'){
            toast.error("Error deleting address, please try again later")
        }

        return ()=>{
            dispatch(resetAddressDeleteStatus())
        }

    },[addressDeleteStatus])

    const handleAddAddress=(data)=>{
        const address={...data,user:userInfo._id}
        dispatch(addAddressAsync(address))
        setAddAddress(false)
    }

  return (
    <Stack height={'calc(100vh - 4rem)'} justifyContent={'flex-start'} alignItems={'center'}>

            <Stack component={Paper} elevation={1} width={'50rem'} p={2} mt={5}>

                    {/* user details - [name ,email ] */}
                    <Stack bgcolor={theme.palette.primary.dark} p={1} rowGap={1} borderRadius={'.6rem'} color={'whitesmoke'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar src='none' alt={userInfo?.name} sx={{width:70,height:70}}></Avatar>
                        <Typography>{userInfo?.name}</Typography>
                        <Typography>{userInfo?.email}</Typography>
                    </Stack>


                    {/* address section */}
                    <Stack mt={5} justifyContent={'center'} alignItems={'center'}>


                        {/* heading and add button */}
                        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={1}>
                            <Typography variant='h6' fontWeight={400}>Manage addresses</Typography>
                            <Button onClick={()=>setAddAddress(true)} variant='contained'>Add</Button>
                        </Stack>
                        
                        {/* add address form - state dependent*/}
                        {
                            addAddress?(
                                <Stack m={'2rem 0rem'} width={'100%'} component={'form'} noValidate onSubmit={handleSubmit(handleAddAddress)} rowGap={2}>
                    
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

                                        <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={2}>
                                            <LoadingButton loading={status==='pending'} type='submit' variant='contained'>add</LoadingButton>
                                            <Button color='error' onClick={()=>setAddAddress(false)} >cancel</Button>
                                        </Stack>
                                </Stack>
                            ):('')
                        }

                        {/* mapping on addresses here  */}
                        <Stack width={'100%'} rowGap={2} mt={2}>
                            {
                                addresses.length>0?(
                                    addresses.map((address)=>(
                                        <Address key={address._id} id={address._id} city={address.city} country={address.country} phoneNumber={address.phoneNumber} postalCode={address.postalCode} state={address.state} street={address.street} type={address.type}/>
                                    ))
                                ):(
                                    <Typography textAlign={'center'} mt={2} variant='body2'>You have no address added</Typography>
                                )
                            }      
                        </Stack>

                    </Stack>


            </Stack>



    </Stack>
  )
}
