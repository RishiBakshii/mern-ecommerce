import React from 'react'
import { AdminOrders } from '../features/admin/components/AdminOrders'
import {Navbar} from '../features/navigation/components/Navbar'

export const AdminOrdersPage = () => {
  return (
    <>
    <Navbar/>
    <AdminOrders/>
    </>
  )
}
