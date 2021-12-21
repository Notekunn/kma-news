import React from 'react'
import Topic from '@/features/Topic/pages/Topic'
import { Route, Routes } from 'react-router-dom'
import Home from '@/features/HomePage/pages/HomePage'
import { BasicLayout } from '@/layouts/BasicLayout'
export const RootRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="/tin-moi.epi" element={<Home />} />
          <Route path="/chu-de" element={<Topic />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/admin" element={<BasicLayout />}></Route>
      </Routes>
    </div>
  )
}
