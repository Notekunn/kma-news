import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BasicLayout } from '@/layouts/BasicLayout'
import Home from '@/features/HomePage/pages/HomePage'
import Topic from '@/features/Topic/pages/Topic'
import ReadingPage from '@/features/Post/pages/ReadingPage'
import { HotTopicPage } from '@/features/Post/pages/HotTopicPage'
import { UserPage } from '@/features/Post/pages/UserPage'
import { PersonalPage } from '@/features/Personal/pages/PersonalPage'
import { SuggestPage } from '@/features/Personal/pages/SuggestPage'
import { HistoryPage } from '@/features/Personal/pages/HistoryPage'
import { SubscriptionPage } from '@/features/Personal/pages/SubscriptionPage'

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
          <Route path="ca-nhan" element={<PersonalPage />}>
            <Route path="de-xuat" element={<SuggestPage />} />
            <Route path="doc-gan-day" element={<HistoryPage />} />
            <Route path="muc-da-luu" element={<SubscriptionPage />} />
            <Route path="muc-cua-ban" element={<SubscriptionPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}
