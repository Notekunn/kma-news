import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BasicLayout } from '@/layouts/BasicLayout'
import Home from '@/features/HomePage/pages/HomePage'
import Topic from '@/features/Topic/pages/Topic'
import ReadingPage from '@/features/Post/pages/ReadingPage'
import { HotTopicPage } from '@/features/Post/pages/HotTopicPage'
import { PersonalPage } from '@/features/Personal/pages/PersonalPage'
import { SuggestPage } from '@/features/Personal/pages/SuggestPage'
import { HistoryPage } from '@/features/Personal/pages/HistoryPage'
import { SubscriptionPage } from '@/features/Personal/pages/SubscriptionPage'
import { CategoryPage } from '@/features/Personal/pages/CategoryPage'
import { FavoritePage } from '@/features/Personal/pages/FavoritePage'

export const RootRouter = () => {
  return (
    <div>
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
      </Routes>
    </div>
  )
}
