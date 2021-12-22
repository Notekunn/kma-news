import React from 'react'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/index'
import { Outlet } from 'react-router-dom'
import Container from '@/components/Container'

export const BasicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
