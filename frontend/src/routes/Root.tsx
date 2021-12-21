import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BasicLayout } from '@/layouts/BasicLayout'
import Home from '@/features/HomePage/pages/HomePage'
import Topic from '@/features/Topic/pages/Topic'
import ReadingPage from '@/features/New/pages/ReadingPage'
export const RootRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="/tin-moi.epi" element={<Home />} />
          <Route path="/chu-de" element={<Topic />} />
          <Route path="bai-bao/:slug" element={<ReadingPage />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/admin" element={<BasicLayout />}></Route>
      </Routes>
    </div>
  )
}
