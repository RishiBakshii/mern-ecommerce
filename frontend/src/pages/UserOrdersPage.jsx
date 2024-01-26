import React from 'react'
import { UserOrders } from '../features/order/components/UserOrders'
import {Navbar} from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'

export const UserOrdersPage = () => {
  return (
    <>
    <Navbar/>
    <UserOrders/>
    <Footer/>
    </>
  )
}
