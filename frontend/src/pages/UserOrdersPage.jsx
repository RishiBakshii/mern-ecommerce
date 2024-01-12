import React from 'react'
import { UserOrders } from '../features/order/components/UserOrders'
import {Navbar} from '../features/navigation/components/Navbar'

export const UserOrdersPage = () => {
  return (
    <>
    <Navbar/>
    <UserOrders/>
    </>
  )
}
