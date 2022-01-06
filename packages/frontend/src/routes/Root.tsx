import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BasicLayout } from '@/layouts/BasicLayout'
import Home from '@/features/HomePage/pages/HomePage'
import Topic from '@/features/Topic/pages/Topic'
import ReadingPage from '@/features/Post/pages/ReadingPage'
import { HotTopicPage } from '@/features/Post/pages/HotTopicPage'
import { BlankLayout } from '@/layouts/BlankLayout'
const PersonalPage = React.lazy(() => import('@/features/Personal/pages/PersonalPage'))
const HistoryPage = React.lazy(() => import('@/features/Personal/pages/HistoryPage'))
const SuggestPage = React.lazy(() => import('@/features/Personal/pages/SuggestPage'))
const FavoritePage = React.lazy(() => import('@/features/Personal/pages/FavoritePage'))
const CategoryPage = React.lazy(() => import('@/features/Personal/pages/CategoryPage'))
const SubscriptionPage = React.lazy(() => import('@/features/Personal/pages/SubscriptionPage'))
const ZaloLoginPage = React.lazy(() => import('@/features/Auth/pages/ZaloLoginPage'))

export const RootRouter = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Home />} />
            <Route path="tin-moi.epi" element={<Home />} />
            <Route path="chu-de" element={<Topic />} />
            <Route path="bai-bao/:slug" element={<ReadingPage />} />
            <Route path="phong-chong-dich-covid-19" element={<HotTopicPage />} />
            <Route path="ca-nhan" element={<PersonalPage />}>
              <Route path="de-xuat" element={<SuggestPage />} />
              <Route path="doc-gan-day" element={<HistoryPage />} />
              <Route path="muc-da-luu" element={<FavoritePage />} />
              <Route path="muc-cua-ban" element={<CategoryPage />} />
              <Route path="theo-doi" element={<SubscriptionPage />} />
              <Route path="*" element={<></>} />
            </Route>
          </Route>
          <Route path="auth/login" element={<BlankLayout />}>
            <Route path="zalo" element={<ZaloLoginPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}
