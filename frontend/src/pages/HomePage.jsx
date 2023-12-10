import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { ProductList } from '../features/products/components/ProductList'

export const HomePage = () => {
  return (
    <>
    <Navbar/>
    <ProductList/>
    </>
  )
}
