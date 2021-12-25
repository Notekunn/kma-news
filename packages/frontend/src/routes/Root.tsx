import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BasicLayout } from '@/layouts/BasicLayout'
import Home from '@/features/HomePage/pages/HomePage'
import Topic from '@/features/Topic/pages/Topic'
import ReadingPage from '@/features/New/pages/ReadingPage'
import { HotTopicPage } from '@/features/New/pages/HotTopicPage'
import { AdminRoutes } from './Admin'
import { UserPage } from '@/features/New/pages/UserPage'
export const RootRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="tin-moi.epi" element={<Home />} />
          <Route path="chu-de" element={<Topic />} />
          <Route path="bai-bao/:slug" element={<ReadingPage />} />
          <Route path="" element={<Home />} />
          <Route path="phong-chong-dich-covid-19" element={<HotTopicPage />} />
          <Route path="de-xuat" element={<UserPage />} />
        </Route>
      </Routes>
      <AdminRoutes />
    </div>
  )
}
